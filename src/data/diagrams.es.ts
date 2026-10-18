// Spanish labels for the plates in src/data/diagrams.ts, keyed by element id.
import type { DiagramI18n } from "../components/visual/types";

export const backupDiskEs: DiagramI18n = {
  account: { label: "Cuenta de AWS de la tienda" },
  provider: { label: "Cuenta del proveedor anterior" },
  users: { label: "Compradores" },
  ec2: {
    label: "Magento en EC2",
    note: "Una c6i.2xlarge con Ubuntu, Apache y Magento 2. La CPU tocaba techo en un 20 %, incluso en Navidad.",
  },
  cron: { label: "Backups con cron", note: "Copias diarias, semanales y mensuales de la base de datos y del sitio." },
  disk: { label: "Volumen raíz, 78 GB", note: "Lleno cada lunes: el script de limpieza tenía un error, así que los dumps viejos nunca se borraban." },
  iam: { label: "Rol de IAM", note: "Permite a la instancia subir objetos al bucket de la tienda, y nada más." },
  s3: { label: "Bucket S3 de la tienda", note: "Nuevo destino de los backups: semanal los domingos, mensual el día 1." },
  optimizer: { label: "Compute Optimizer", note: "Recomendó una r6i.large; mantuve los 16 GB de memoria por el código que sincroniza el stock." },
  oldS3: { label: "Bucket del proveedor", note: "A donde iban los backups: una cuenta que no era de la tienda." },
  "cron-ec2": { label: "corre en" },
  "ec2-disk": { label: "dumps" },
  "ec2-oldS3": { label: "sync viejo" },
};

export const singleServerEs: DiagramI18n = {
  scanner: { label: "Tráfico de escaneo", note: "Escaneo de puertos y fuzzing de subdominios desde un único origen." },
  users: { label: "Usuarios de la app" },
  ec2: { label: "Nginx + Laravel", note: "Toda la app en una instancia, websockets incluidos. Cada escaneo caía aquí." },
  cw: { label: "Alarma de CloudWatch", note: "Salta con CPU alta sostenida en la instancia." },
  sns: { label: "SNS al equipo" },
  "scanner-ec2": { label: "escaneos" },
  "users-ec2": { label: "API + websockets" },
  "cw-sns": { label: "alarma" },
};

export const threeTierEs: DiagramI18n = {
  aws: { label: "AWS, construido con Terraform" },
  public: { label: "Subredes públicas" },
  app: { label: "Subredes privadas de app" },
  asg: { label: "Grupo de Auto Scaling" },
  data: { label: "Subredes privadas de datos" },
  users: { label: "Usuarios de la app" },
  alb: { label: "Balanceador", note: "El único punto de entrada público. Las instancias ya no tienen IP pública." },
  app1: { label: "Instancia de app" },
  app2: { label: "Instancia de app", note: "Lanzada desde una AMI sin estado; el refresh progresivo mantiene al menos la mitad sana." },
  rds: { label: "RDS MySQL", note: "Cifrada con KMS, monitoreo mejorado y backups automáticos de 30 días." },
  s3: { label: "Archivos estáticos en S3", note: "Imágenes de usuarios y recursos públicos fuera de las instancias." },
  ami: { label: "AMI base", note: "Construida desde staging. Una AMI nueva implica una nueva versión del launch template y luego un instance refresh." },
  "app2-s3": { label: "subidas" },
  "rds-cw": { label: "logs" },
};

export const ecsBeforeEs: DiagramI18n = {
  host: { label: "Una instancia EC2, Docker Compose" },
  users: { label: "Usuarios" },
  traefik: { label: "Gateway Traefik", note: "Descubría los servicios por etiquetas de Docker, enrutaba cada subdominio y renovaba los certificados." },
  apps: { label: "Contenedores de la app" },
  mysql: { label: "Contenedor MySQL", note: "Las bases de datos corrían junto a las apps, en la misma máquina." },
  volume: { label: "Archivos en el disco", note: "Los contenedores escribían en el disco de la instancia, y eso los ataba a ella." },
  "le-traefik": { label: "certificados" },
  "traefik-apps": { label: "etiquetas" },
  "apps-volume": { label: "archivos" },
};

export const ecsAfterEs: DiagramI18n = {
  cluster: { label: "Clúster ECS en Fargate" },
  users: { label: "Usuarios" },
  alb: { label: "Balanceador", note: "Las reglas del listener HTTPS envían cada subdominio al target group de su servicio." },
  acm: { label: "Certificado wildcard en ACM", note: "Un certificado para todos los subdominios, renovado por AWS." },
  ecs: { label: "Servicios ECS", note: "Mantienen el número deseado de tareas en marcha y las registran en su target group." },
  tasks: { label: "Tareas en Fargate", note: "Arrancan desde task definitions versionadas; AWS gestiona los servidores de debajo." },
  ecr: { label: "Imágenes en ECR" },
  cw: { label: "Logs en CloudWatch" },
  rds: { label: "RDS MySQL", note: "Cargada con un mysqldump de las bases de datos del contenedor anterior." },
  efs: { label: "Archivos en EFS", note: "Montado por NFS (puerto 2049); el access point fuerza un usuario y grupo POSIX." },
  "alb-ecs": { label: "por subdominio" },
  "ecr-ecs": { label: "imagen" },
  "ecs-tasks": { label: "ejecuta" },
  "tasks-cw": { label: "logs" },
};

export const ecsDeliveryEs: DiagramI18n = {
  dev: { label: "Merge a main" },
  ci: { label: "Pipeline de CI", note: "Construye la imagen y ejecuta las pruebas en cada merge." },
  ecr: { label: "Registro de contenedores" },
  ecs: { label: "Servicio ECS", note: "Despliegues progresivos: las tareas nuevas pasan los health checks antes de parar las viejas." },
  alb: { label: "Balanceador" },
  users: { label: "Usuarios" },
  "dev-ci": { label: "dispara" },
  "ci-ecr": { label: "imagen" },
  "ecr-ecs": { label: "despliegue" },
  "ecs-cw": { label: "logs" },
};

export const dataPipelineEs: DiagramI18n = {
  aws: { label: "Cuenta de AWS" },
  odoo: { label: "Odoo ERP", note: "Un ERP sólido con analítica débil. Su API JSON es la puerta de entrada." },
  schedule: { label: "EventBridge Scheduler" },
  lambda: { label: "Lambdas de extracción", note: "Una función por cada tabla de Odoo que vale la pena reportar, todas desde el mismo módulo de Terraform." },
  ssm: { label: "Parameter Store", note: "Guarda la API key de Odoo." },
  sns: { label: "Reportes por SNS" },
  s3: { label: "S3 por fecha", note: "Filas procesadas y recortadas, particionadas por fecha." },
  ci: { label: "GitHub Actions", note: "Un pipeline por función, que solo se dispara con cambios en su propio directorio." },
  athena: { label: "Athena", note: "SQL serverless directamente sobre los datos en S3." },
  metabase: { label: "Metabase en ECS", note: "Autoalojado, en el clúster de ECS del proyecto de entrega con ECS." },
  rds: { label: "Metadatos de Metabase" },
  team: { label: "Equipo de ventas" },
  "odoo-lambda": { label: "API JSON" },
  "schedule-lambda": { label: "cron" },
  "ssm-lambda": { label: "API key" },
  "sns-team": { label: "correos" },
  "lambda-s3": { label: "filas" },
  "athena-metabase": { label: "SQL" },
  "metabase-team": { label: "dashboards" },
  "ci-lambda": { label: "despliegue" },
};

export const edgeSecurityEs: DiagramI18n = {
  sg: { label: "Security groups, por servicio" },
  users: { label: "Visitantes" },
  bots: { label: "Bots y escáneres" },
  waf: { label: "AWS WAF", note: "Grupos de reglas gestionadas por AWS más reglas propias para el tráfico de esta app." },
  alb: { label: "Balanceador" },
  app: { label: "Servicios", note: "Entrada solo desde el security group del balanceador." },
  db: { label: "Base de datos", note: "Entrada solo desde los servicios que la necesitan." },
  "bots-waf": { label: "bloqueado" },
  "waf-alb": { label: "permitido" },
};

/** Spanish labels for each project's main plate (used on project cards), keyed by translationKey. */
export const projectPlatesEs: Record<string, DiagramI18n> = {
  "backup-that-filled-the-disk": backupDiskEs,
  "under-attack-three-tiers": threeTierEs,
  "ecs-delivery": ecsDeliveryEs,
  "odoo-data-pipeline": dataPipelineEs,
  "edge-security": edgeSecurityEs,
};
