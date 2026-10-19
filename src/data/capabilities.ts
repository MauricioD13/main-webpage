// What the home page says Mauricio is good at. Every claim points at the projects
// (by translationKey) where it can be seen; keep it that way when editing.
import type { Lang } from "../i18n/ui";

export interface Capability {
  id: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  tools: string[];
  proof: string[];
  /** Only real, sourced figures. */
  figure?: { value: string; label: Record<Lang, string> };
}

export const capabilities: Capability[] = [
  {
    id: "security",
    title: { en: "Security hardening", es: "Hardening de seguridad" },
    body: {
      en: "Network rules limited to what each service needs, AWS WAF in front of public applications, and incident response when an instance is under attack.",
      es: "Reglas de red limitadas a lo que cada servicio necesita, AWS WAF delante de las aplicaciones públicas y respuesta a incidentes cuando una instancia está bajo ataque.",
    },
    tools: ["AWS WAF", "Security groups", "IAM", "CloudWatch"],
    proof: ["edge-security", "under-attack-three-tiers"],
  },
  {
    id: "architecture",
    title: { en: "AWS architecture", es: "Arquitectura en AWS" },
    body: {
      en: "AWS environments built on three-tier, serverless or container patterns, chosen according to each workload's demand and budget.",
      es: "Entornos en AWS con patrones de tres capas, serverless o contenedores, elegidos según la demanda y el presupuesto de cada sistema.",
    },
    tools: ["VPC", "ALB", "Auto Scaling", "RDS", "S3"],
    proof: ["under-attack-three-tiers", "odoo-data-pipeline"],
  },
  {
    id: "iac",
    title: { en: "Infrastructure as code", es: "Infraestructura como código" },
    body: {
      en: "Terraform with remote state in S3 and reusable modules. Plans are checked with Checkov before they are applied.",
      es: "Terraform con estado remoto en S3 y módulos reutilizables. Los planes se revisan con Checkov antes de aplicarse.",
    },
    tools: ["Terraform", "Checkov", "S3 backend"],
    proof: ["under-attack-three-tiers", "odoo-data-pipeline"],
  },
  {
    id: "delivery",
    title: { en: "Containers and delivery", es: "Contenedores y entrega" },
    body: {
      en: "Containerized applications on Amazon ECS, deployed by pipelines that build, test and roll out updates progressively.",
      es: "Aplicaciones en contenedores sobre Amazon ECS, desplegadas con pipelines que construyen, prueban y actualizan de forma progresiva.",
    },
    tools: ["Docker", "ECS", "ECR", "CI/CD"],
    proof: ["ecs-delivery", "fintech-platform"],
  },
  {
    id: "data",
    title: { en: "Data pipelines", es: "Pipelines de datos" },
    body: {
      en: "Scheduled extraction with Lambda into S3, queried with Athena and presented in Metabase dashboards.",
      es: "Extracción programada con Lambda hacia S3, consultas con Athena y dashboards en Metabase.",
    },
    tools: ["Lambda", "EventBridge", "Athena", "Metabase"],
    proof: ["odoo-data-pipeline"],
  },
  {
    id: "cost",
    title: { en: "Cost optimization", es: "Optimización de costos" },
    body: {
      en: "Instance sizing reviewed with Compute Optimizer, and recurring costs removed when they no longer serve a purpose.",
      es: "Revisión del tamaño de las instancias con Compute Optimizer y eliminación de costos recurrentes que ya no cumplen una función.",
    },
    tools: ["Compute Optimizer", "Cost Explorer"],
    proof: ["backup-that-filled-the-disk"],
    figure: { value: "64%", label: { en: "lower AWS bill", es: "menos en la factura de AWS" } },
  },
];
