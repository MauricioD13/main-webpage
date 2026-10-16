---
title: "Los agentes ya están aquí"
description: "Notas de una sesión de AWS sobre cómo construir agentes de IA con serverless, Strands Agents y MCP."
date: 2025-12-20
tags: ["AWS", "IA", "Serverless"]
cover: ../../../assets/stories/aws-strand-agents.png
translationKey: strands-agents
---

"Los agentes de IA no son el futuro. Ya están cambiando cómo construimos en la nube."

Esa fue mi principal conclusión de la sesión de AWS Experience Iberia *Building AI agents with serverless, Strands and MCP* el mes pasado. Pasamos de experimentar con prompts a operar en producción sistemas agénticos que razonan, planifican y actúan, de forma segura y a escala.

El equipo de AWS mostró cómo encajan las arquitecturas serverless, Amazon Bedrock y el SDK de Strands Agents para que los agentes sean capaces y baratos de operar. Lo que más me resonó:

- **Los agentes son modulares.** Razonan, usan herramientas y hablan con otros sistemas a través del Model Context Protocol, y Strands Agents lo hace sencillo de implementar.
- **Serverless quita el trabajo que no aporta.** Desplegar agentes en Lambda, ECS o EKS es enfocarse en la lógica, no en los servidores.
- **La observabilidad y la gobernanza siguen importando.** CloudWatch, X-Ray, GuardDuty e IAM van en el diseño desde el primer día.
- **El contexto lo es todo.** Un buen contexto lleva a buenas respuestas.

Si estás explorando flujos agénticos, el [material de Strands Agents](https://lnkd.in/dF2rgAxA) es un buen punto de partida.
