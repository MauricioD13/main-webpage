---
title: "Notas sobre optimización de costos en AWS"
description: "Lo que me quedó de un evento sobre optimización de costos en las oficinas de AWS en Madrid: dashboards, almacenamiento y la mentalidad del Frugal Architect."
date: 2025-03-04
tags: ["AWS", "FinOps"]
cover: ../../../assets/stories/aws-cost-optimization.png
translationKey: aws-cost-optimization
---

En los últimos meses he profundizado en la optimización de costos en AWS, empezando por un evento al que asistí en las oficinas de AWS en Madrid. Tres ideas se me quedaron.

## Cloud Intelligence Dashboards

Dan una visión detallada del costo y el uso, para seguir KPIs, detectar oportunidades de optimización y alinear las prácticas de FinOps. El Cost Intelligence Dashboard, CUDOS y el Compute Optimizer Dashboard facilitan ver el costo por entorno, seguir los Savings Plans y detectar anomalías.

Mi función favorita: ver las oportunidades de Graviton y las recomendaciones de ajuste de tamaño a medida que aparecen.

## Almacenamiento

- **Amazon EBS:** ajustar el tamaño de los volúmenes, pasar de io1/io2 a gp3 y usar Elastic Volumes.
- **Amazon S3:** usar S3 Storage Lens y políticas de ciclo de vida para mover los datos a la clase más barata que siga encajando, como Glacier Instant Retrieval. Eso puede reducir los costos hasta un 70 %.

Borra con regularidad los volúmenes EBS sin adjuntar y los snapshots obsoletos. Cuestan dinero y no hacen nada.

## El pilar de optimización de costos

La mentalidad del Frugal Architect: diseñar, medir, optimizar. En la práctica:

- Practicar la gestión financiera en la nube (Cloud Financial Management) para que finanzas e ingeniería trabajen con los mismos números.
- Elegir recursos eficientes en costo, como Graviton e instancias Spot.
- Seguir optimizando: automatizar el desmantelamiento de recursos y revisar las cargas con regularidad.

## El panorama general

Optimizar costos no es solo recortar. Es sacar el máximo valor manteniendo el rendimiento y la escalabilidad. Los Cloud Intelligence Dashboards, Compute Optimizer y Trusted Advisor permiten tomar esas decisiones con datos.
