---
title: "No mandes todo tu tráfico por un solo firewall"
description: "Lo que me llevé de una sesión de AWS Experience Iberia sobre firewalls: protección por capas, modelos de inspección y automatización."
date: 2025-01-20
tags: ["AWS", "Seguridad", "WAF"]
cover: ../../../assets/stories/aws-firewall.jpg
translationKey: aws-firewall
---

"Deja de mandar todo tu tráfico por un solo firewall."

Esa frase, de una sesión virtual de AWS Experience Iberia del mes pasado, fue el argumento central de la charla: repartir la protección en varias capas en lugar de concentrarla en un solo punto de inspección.

La sesión, *Firewalls en AWS: cuándo y cómo proteger tu infraestructura*, cubrió patrones de protección de red y cómo escalan. Mis notas:

- **La responsabilidad compartida es la base.** AWS protege la nube; nosotros protegemos lo que ponemos en ella.
- **Protección por capas.** AWS WAF, Shield, Network Firewall y Firewall Manager juntos cubren de la capa 3 a la 7.
- **Inspección centralizada y distribuida.** Cada modelo equilibra de forma distinta costo, rendimiento y radio de impacto.
- **Automatización y observabilidad.** Security Hub, GuardDuty, Inspector y Systems Manager automatizan la detección y la remediación, para que menos problemas esperen a que alguien los note.

El material de la sesión:

- [Material de la sesión, parte 1](https://lnkd.in/dGHJcKgY)
- [Material de la sesión, parte 2](https://lnkd.in/dx2_K35G)
- [Material de la sesión, parte 3](https://lnkd.in/dGxbwdg9)
