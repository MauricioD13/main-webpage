---
title: "Por qué existen los CNAPP"
description: "Tu cadena de herramientas de seguridad no se rompió. Simplemente no pudo seguirle el ritmo a la nube."
date: 2026-06-05
tags: ["Seguridad", "CNAPP", "Multicloud"]
cover: ../../../assets/stories/cnapp-00.jpeg
translationKey: cnapp-00
---

Tu cadena de herramientas de seguridad no se rompió. Simplemente no pudo seguirle el ritmo a la nube.

Últimamente he estado concentrado evaluando a dos de los grandes del espacio CNAPP (Cloud-Native Application Protection Platform). Antes de contar lo que estoy encontrando, vale la pena explicar por qué existe esta categoría, porque es fácil descartarla como "otra plataforma más" hasta que has sufrido el problema.

Los entornos en la nube no crecen de forma lineal. Crecen como crece la complejidad: despacio y luego de golpe. Cuando escalar se vuelve real, aparecen rápido contenedores, orquestadores, máquinas virtuales y funciones serverless. Los equipos DevOps crean y destruyen recursos con facilidad, y la configuración de seguridad no siempre es la prioridad cuando la meta es publicar rápido. No es una crítica; así funcionan las plataformas modernas.

El problema cae sobre los equipos de seguridad.

Digamos que empiezas en AWS y activas Security Hub para seguir las configuraciones incorrectas. Bien. Luego el equipo de producto monta algo en Azure, así que activas Microsoft Defender for Cloud. Luego alguien crea un proyecto en GCP y Google SecOps se suma a la lista.

Ahora hay tres fuentes de hallazgos, tres formatos de severidad y tres dashboards. Pese al esfuerzo real de cada proveedor por interoperar, hay mucha fontanería a medida antes de poder verlo todo en un solo lugar. Y eso es solo CSPM: configuraciones incorrectas y cumplimiento.

Suma CWPP (proteger los contenedores y las máquinas virtuales), CIEM (quién tiene acceso a qué y por qué) y DSPM (dónde viven los datos sensibles y si están expuestos), y la complejidad operativa no se suma. Se multiplica.

Ese es el hueco que los CNAPP intentan cerrar: una sola integración por fuente de datos, un solo inventario de activos y un solo pipeline de detección que genera alertas en todas las capacidades y en todas las nubes.

Si esa promesa se cumple en la práctica, y a qué costo, es justo lo que estoy averiguando ahora. Pronto, más.
