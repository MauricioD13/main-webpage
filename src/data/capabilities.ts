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
      en: "WAF at the edge, least-privilege security groups and IAM, and a calm response when something is already on fire.",
      es: "WAF en el borde, security groups e IAM de mínimo privilegio, y calma cuando algo ya está ardiendo.",
    },
    tools: ["AWS WAF", "Security groups", "IAM", "CloudWatch"],
    proof: ["edge-security", "under-attack-three-tiers"],
  },
  {
    id: "architecture",
    title: { en: "AWS architecture", es: "Arquitectura en AWS" },
    body: {
      en: "Three-tier, serverless and container designs that survive traffic spikes and attacks, without paying for idle capacity.",
      es: "Diseños de tres capas, serverless y con contenedores que aguantan picos de tráfico y ataques, sin pagar capacidad ociosa.",
    },
    tools: ["VPC", "ALB", "Auto Scaling", "RDS", "S3"],
    proof: ["under-attack-three-tiers", "odoo-data-pipeline"],
  },
  {
    id: "iac",
    title: { en: "Infrastructure as code", es: "Infraestructura como código" },
    body: {
      en: "Terraform with remote state and reusable modules, scanned with Checkov before anything reaches the account.",
      es: "Terraform con estado remoto y módulos reutilizables, escaneado con Checkov antes de que nada llegue a la cuenta.",
    },
    tools: ["Terraform", "Checkov", "S3 backend"],
    proof: ["under-attack-three-tiers", "odoo-data-pipeline"],
  },
  {
    id: "delivery",
    title: { en: "Containers and delivery", es: "Contenedores y entrega" },
    body: {
      en: "Applications moved onto ECS with pipelines that build, test and roll out on merge, with no downtime.",
      es: "Aplicaciones llevadas a ECS con pipelines que construyen, prueban y despliegan al hacer merge, sin caídas.",
    },
    tools: ["Docker", "ECS", "ECR", "CI/CD"],
    proof: ["ecs-delivery", "fintech-platform"],
  },
  {
    id: "data",
    title: { en: "Data pipelines", es: "Pipelines de datos" },
    body: {
      en: "Serverless extraction to S3, SQL with Athena and self-service dashboards, so reports stop depending on one person.",
      es: "Extracción serverless a S3, SQL con Athena y dashboards de autoservicio, para que los reportes dejen de depender de una persona.",
    },
    tools: ["Lambda", "EventBridge", "Athena", "Metabase"],
    proof: ["odoo-data-pipeline"],
  },
  {
    id: "cost",
    title: { en: "Cost optimization", es: "Optimización de costos" },
    body: {
      en: "Right-sizing with Compute Optimizer, fixing what quietly wastes money, and keeping the savings.",
      es: "Ajuste de tamaño con Compute Optimizer, arreglar lo que desperdicia dinero en silencio y mantener el ahorro.",
    },
    tools: ["Compute Optimizer", "Cost Explorer"],
    proof: ["backup-that-filled-the-disk"],
    figure: { value: "64%", label: { en: "lower AWS bill", es: "menos en la factura de AWS" } },
  },
];
