// Architecture plates for the projects. Kept outside the MDX so project cards and the
// 3D view can reuse each project's main plate. Coordinates are in viewBox units;
// node x/y is the icon centre.
import type { Diagram } from "../components/visual/types";

/** Backup disk: a single Magento server, its cron backups and the bucket in the wrong account. */
export const backupDisk: Diagram = {
  width: 790,
  height: 470,
  groups: [
    { id: "account", label: "Shop's AWS account", x: 150, y: 24, w: 410, h: 420, kind: "cloud" },
    { id: "provider", label: "Old provider's account", x: 590, y: 150, w: 180, h: 180, kind: "external" },
  ],
  nodes: [
    { id: "users", label: "Shoppers", icon: "client", x: 70, y: 240 },
    {
      id: "ec2",
      label: "Magento on EC2",
      icon: "ec2",
      x: 280,
      y: 240,
      note: "A c6i.2xlarge running Ubuntu, Apache and Magento 2. CPU peaked around 20%, even at Christmas.",
    },
    { id: "cron", label: "Cron backups", glyph: "cron", x: 280, y: 100, note: "Daily, weekly and monthly dumps of the database and site files." },
    { id: "disk", label: "Root volume, 78 GB", glyph: "disk", x: 280, y: 380, note: "Full every Monday: the cleanup script had a typo, so old dumps never left." },
    { id: "iam", label: "IAM role", icon: "iam", x: 470, y: 100, note: "Lets the instance put objects in the shop's bucket, and nothing else." },
    { id: "s3", label: "Shop's S3 bucket", icon: "s3", x: 470, y: 240, note: "New backup target: weekly on Sundays, monthly on the 1st." },
    { id: "optimizer", label: "Compute Optimizer", icon: "optimizer", x: 470, y: 380, note: "Recommended an r6i.large; I kept the 16 GB of memory for the stock-sync code." },
    { id: "oldS3", label: "Provider's bucket", icon: "s3", x: 680, y: 250, note: "Where the backups had been going: an account the shop didn't own." },
  ],
  edges: [
    { from: "users", to: "ec2", label: "HTTPS" },
    { from: "cron", to: "ec2", label: "runs on" },
    { from: "ec2", to: "disk", label: "dumps" },
    { from: "ec2", to: "oldS3", label: "old sync", dashed: true, via: [[380, 240], [380, 178], [680, 178]] },
    { from: "ec2", to: "s3", label: "sync" },
    { from: "iam", to: "ec2" },
    { from: "optimizer", to: "ec2", dashed: true },
  ],
};

/** Three tiers, before: one server taking the scan traffic. */
export const singleServer: Diagram = {
  width: 660,
  height: 360,
  groups: [{ id: "aws", label: "AWS", x: 170, y: 24, w: 470, h: 312, kind: "cloud" }],
  nodes: [
    { id: "scanner", label: "Scanner traffic", glyph: "!", x: 70, y: 110, note: "Port scans and subdomain fuzzing from a single origin." },
    { id: "users", label: "App users", icon: "client", x: 70, y: 260 },
    { id: "ec2", label: "Nginx + Laravel", icon: "ec2", x: 320, y: 185, note: "The whole app on one instance, websockets included. Every scan landed here." },
    { id: "cw", label: "CloudWatch alarm", icon: "cloudwatch", x: 530, y: 110, note: "Fires on sustained high CPU on the instance." },
    { id: "sns", label: "SNS to the team", icon: "sns", x: 530, y: 260 },
  ],
  edges: [
    { from: "scanner", to: "ec2", label: "scans" },
    { from: "users", to: "ec2", label: "API + websockets" },
    { from: "ec2", to: "cw", label: "CPU" },
    { from: "cw", to: "sns", label: "alarm" },
  ],
};

/** Three tiers, after: stateless instances behind a load balancer. */
export const threeTier: Diagram = {
  width: 780,
  height: 530,
  groups: [
    { id: "aws", label: "AWS, built with Terraform", x: 130, y: 20, w: 630, h: 494, kind: "cloud" },
    { id: "vpc", label: "VPC", x: 150, y: 52, w: 440, h: 440, kind: "vpc" },
    { id: "public", label: "Public subnets", x: 168, y: 84, w: 404, h: 100, kind: "subnet" },
    { id: "app", label: "Private app subnets", x: 168, y: 198, w: 404, h: 160, kind: "subnet" },
    { id: "asg", label: "Auto Scaling group", x: 214, y: 226, w: 312, h: 124, kind: "zone", labelAt: "bottom" },
    { id: "data", label: "Private data subnets", x: 168, y: 372, w: 404, h: 100, kind: "subnet" },
  ],
  nodes: [
    { id: "users", label: "App users", icon: "client", x: 60, y: 140 },
    { id: "alb", label: "Load balancer", icon: "alb", x: 370, y: 140, note: "The only public entry point. Instances no longer have public IPs." },
    { id: "app1", label: "App instance", icon: "ec2", x: 290, y: 270, size: 44 },
    { id: "app2", label: "App instance", icon: "ec2", x: 450, y: 270, size: 44, note: "Launched from a stateless AMI; rolling refresh keeps at least half healthy." },
    { id: "rds", label: "RDS MySQL", icon: "rds", x: 370, y: 428, note: "Encrypted with KMS, enhanced monitoring, 30-day automated backups." },
    { id: "s3", label: "S3 static files", icon: "s3", x: 680, y: 270, note: "User images and public assets moved off the instances." },
    { id: "cw", label: "CloudWatch", icon: "cloudwatch", x: 680, y: 428 },
    { id: "ami", label: "Golden AMI", glyph: "AMI", x: 680, y: 140, note: "Built from staging. A new AMI means a new launch template version, then an instance refresh." },
  ],
  edges: [
    { from: "users", to: "alb", label: "HTTPS" },
    { from: "alb", to: "app1", via: [[370, 206], [290, 206]] },
    { from: "alb", to: "app2", via: [[370, 206], [450, 206]] },
    { from: "app1", to: "rds", via: [[290, 364], [370, 364]] },
    { from: "app2", to: "rds", via: [[450, 364], [370, 364]] },
    { from: "app2", to: "s3", label: "uploads" },
    { from: "rds", to: "cw", label: "logs" },
  ],
};

/** ECS migration, before: every container on one EC2 host, Traefik in front. */
export const ecsBefore: Diagram = {
  width: 790,
  height: 400,
  groups: [
    { id: "aws", label: "AWS", x: 236, y: 24, w: 534, h: 352, kind: "cloud" },
    { id: "host", label: "One EC2 instance, Docker Compose", x: 256, y: 56, w: 494, h: 296, kind: "zone" },
  ],
  nodes: [
    { id: "users", label: "Users", icon: "client", x: 70, y: 150 },
    { id: "le", label: "Let's Encrypt", glyph: "LE", x: 70, y: 300 },
    {
      id: "traefik",
      label: "Traefik gateway",
      glyph: "TR",
      x: 340,
      y: 150,
      note: "Found services through Docker labels, routed each subdomain and renewed the certificates.",
    },
    { id: "apps", label: "App containers", glyph: "app", x: 510, y: 150 },
    { id: "mysql", label: "MySQL container", glyph: "SQL", x: 670, y: 150, note: "The databases ran next to the apps, on the same machine." },
    { id: "volume", label: "Files on the host disk", glyph: "disk", x: 510, y: 290, note: "Containers wrote to the instance's own disk, which tied them to it." },
  ],
  edges: [
    { from: "users", to: "traefik", label: "HTTPS" },
    { from: "le", to: "traefik", label: "certs", dashed: true },
    { from: "traefik", to: "apps", label: "labels" },
    { from: "apps", to: "mysql" },
    { from: "apps", to: "volume", label: "files" },
  ],
};

/** ECS migration, after: ALB + ACM in front, services on Fargate, state in RDS and EFS. */
export const ecsAfter: Diagram = {
  width: 820,
  height: 520,
  groups: [
    { id: "aws", label: "AWS", x: 214, y: 20, w: 586, h: 480, kind: "cloud" },
    { id: "cluster", label: "ECS cluster on Fargate", x: 440, y: 60, w: 160, h: 290, kind: "zone" },
  ],
  nodes: [
    { id: "users", label: "Users", icon: "client", x: 70, y: 130 },
    { id: "alb", label: "Load balancer", icon: "alb", x: 320, y: 130, note: "HTTPS listener rules send each subdomain to its service's target group." },
    { id: "acm", label: "ACM wildcard cert", icon: "acm", x: 320, y: 270, note: "One certificate for every subdomain, renewed by AWS." },
    { id: "ecs", label: "ECS services", icon: "ecs", x: 520, y: 130, note: "Keep the desired number of tasks running and register them in their target group." },
    { id: "tasks", label: "Fargate tasks", icon: "fargate", x: 520, y: 270, note: "Started from versioned task definitions; AWS manages the servers underneath." },
    { id: "ecr", label: "ECR images", icon: "ecr", x: 720, y: 130 },
    { id: "cw", label: "CloudWatch logs", icon: "cloudwatch", x: 720, y: 270 },
    { id: "rds", label: "RDS MySQL", icon: "rds", x: 430, y: 440, note: "Loaded from a mysqldump of the old container's databases." },
    { id: "efs", label: "EFS files", icon: "efs", x: 610, y: 440, note: "Mounted over NFS (port 2049); the access point enforces a POSIX user and group." },
  ],
  edges: [
    { from: "users", to: "alb", label: "HTTPS" },
    { from: "acm", to: "alb", label: "TLS", dashed: true },
    { from: "alb", to: "ecs", label: "by subdomain" },
    { from: "ecr", to: "ecs", label: "image" },
    { from: "ecs", to: "tasks", label: "runs" },
    { from: "tasks", to: "cw", label: "logs" },
    { from: "tasks", to: "rds", via: [[520, 378], [430, 378]] },
    { from: "tasks", to: "efs", via: [[520, 378], [610, 378]] },
  ],
};

/** ECS delivery: from commit to a running container. */
export const ecsDelivery: Diagram = {
  width: 760,
  height: 330,
  groups: [{ id: "aws", label: "AWS", x: 250, y: 24, w: 490, h: 290, kind: "cloud" }],
  nodes: [
    { id: "dev", label: "Merge to main", glyph: "git", x: 70, y: 110 },
    { id: "ci", label: "CI pipeline", glyph: "CI", x: 170, y: 220, note: "Builds the image and runs the tests on every merge." },
    { id: "ecr", label: "Container registry", icon: "ecr", x: 350, y: 220 },
    { id: "ecs", label: "ECS service", icon: "ecs", x: 530, y: 220, note: "Rolling deployments: new tasks pass health checks before old ones stop." },
    { id: "alb", label: "Load balancer", icon: "alb", x: 530, y: 90 },
    { id: "users", label: "Users", icon: "client", x: 680, y: 90 },
    { id: "cw", label: "CloudWatch", icon: "cloudwatch", x: 680, y: 220 },
  ],
  edges: [
    { from: "dev", to: "ci", label: "trigger" },
    { from: "ci", to: "ecr", label: "image" },
    { from: "ecr", to: "ecs", label: "deploy" },
    { from: "users", to: "alb" },
    { from: "alb", to: "ecs" },
    { from: "ecs", to: "cw", label: "logs" },
  ],
};

/** Data pipeline: Odoo → Lambda → S3 → Athena → Metabase. */
export const dataPipeline: Diagram = {
  width: 830,
  height: 490,
  groups: [{ id: "aws", label: "AWS account", x: 150, y: 24, w: 660, h: 446, kind: "cloud" }],
  nodes: [
    { id: "odoo", label: "Odoo ERP", glyph: "Odoo", x: 70, y: 240, note: "Strong ERP, weak analytics. Its JSON API is the way in." },
    { id: "schedule", label: "EventBridge Scheduler", icon: "eventbridge", x: 250, y: 100 },
    { id: "lambda", label: "Lambda extractors", icon: "lambda", x: 250, y: 240, note: "One function per Odoo table worth reporting on, each from the same Terraform module." },
    { id: "ssm", label: "Parameter Store", icon: "ssm", x: 250, y: 385, note: "Holds the Odoo API key." },
    { id: "sns", label: "SNS email reports", icon: "sns", x: 420, y: 100 },
    { id: "s3", label: "S3 by date", icon: "s3", x: 420, y: 240, note: "Parsed, trimmed rows, partitioned by date." },
    { id: "ci", label: "GitHub Actions", glyph: "GH", x: 420, y: 385, note: "One pipeline per function, triggered only by changes in its own directory." },
    { id: "athena", label: "Athena", icon: "athena", x: 580, y: 240, note: "Serverless SQL straight over the S3 data." },
    { id: "metabase", label: "Metabase on ECS", icon: "ecs", x: 735, y: 240, note: "Self-hosted, on the ECS cluster from the ECS delivery project." },
    { id: "rds", label: "Metabase metadata", icon: "rds", x: 735, y: 385 },
    { id: "team", label: "Sales team", icon: "client", x: 735, y: 100 },
  ],
  edges: [
    { from: "odoo", to: "lambda", label: "JSON API" },
    { from: "schedule", to: "lambda", label: "cron" },
    { from: "ssm", to: "lambda", label: "API key" },
    { from: "lambda", to: "sns" },
    { from: "sns", to: "team", label: "emails" },
    { from: "lambda", to: "s3", label: "rows" },
    { from: "s3", to: "athena" },
    { from: "athena", to: "metabase", label: "SQL" },
    { from: "metabase", to: "rds" },
    { from: "metabase", to: "team", label: "dashboards" },
    { from: "ci", to: "lambda", dashed: true, label: "deploy" },
  ],
};

/** Edge security: edge protection and least-privilege network rules. */
export const edgeSecurity: Diagram = {
  width: 760,
  height: 320,
  groups: [
    { id: "aws", label: "AWS", x: 140, y: 24, w: 600, h: 276, kind: "cloud" },
    { id: "sg", label: "Security groups, per service", x: 480, y: 56, w: 240, h: 228, kind: "zone" },
  ],
  nodes: [
    { id: "users", label: "Visitors", icon: "client", x: 60, y: 110 },
    { id: "bots", label: "Bots and scanners", glyph: "bot", x: 60, y: 235 },
    { id: "waf", label: "AWS WAF", icon: "waf", x: 250, y: 170, note: "AWS managed rule groups plus custom rules for this app's traffic." },
    { id: "alb", label: "Load balancer", icon: "alb", x: 390, y: 170 },
    { id: "app", label: "Services", icon: "ec2", x: 600, y: 120, note: "Inbound only from the load balancer's security group." },
    { id: "db", label: "Database", icon: "rds", x: 600, y: 235, note: "Inbound only from the services that need it." },
  ],
  edges: [
    { from: "users", to: "waf" },
    { from: "bots", to: "waf", label: "blocked", dashed: true },
    { from: "waf", to: "alb", label: "allowed" },
    { from: "alb", to: "app", via: [[530, 170], [530, 120]] },
    { from: "app", to: "db" },
  ],
};

export const projectPlates = {
  "backup-that-filled-the-disk": backupDisk,
  "under-attack-three-tiers": threeTier,
  "ecs-delivery": ecsDelivery,
  "odoo-data-pipeline": dataPipeline,
  "edge-security": edgeSecurity,
} satisfies Record<string, Diagram>;
