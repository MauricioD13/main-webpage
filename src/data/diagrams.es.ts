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
