---
title: "Los agentes ya están aquí"
description: "Notas de una sesión de AWS sobre cómo construir agentes de IA con serverless, Strands Agents y MCP."
date: 2025-12-20
tags: ["AWS", "IA", "Serverless"]
cover: ../../../assets/stories/aws-strand-agents.png
translationKey: strands-agents
---

"Los agentes de IA no son el futuro. Ya están cambiando cómo construimos en la nube."

Así abrió la sesión de AWS Experience Iberia *Building AI agents with serverless, Strands and MCP* el mes pasado. La sesión trató sobre agentes en producción: sistemas que llaman a herramientas y a otros servicios, no solo prompts.

El equipo de AWS mostró cómo encajan las arquitecturas serverless, Amazon Bedrock y el SDK de Strands Agents para ejecutar agentes. Mis notas:

- **Los agentes son modulares.** Razonan, usan herramientas y hablan con otros sistemas a través del Model Context Protocol, y Strands Agents ofrece las piezas para hacerlo.
- **Serverless reduce el trabajo de infraestructura.** Ejecutar agentes en Lambda, ECS o EKS deja menos servidores que gestionar.
- **La observabilidad y la gobernanza siguen importando.** CloudWatch, X-Ray, GuardDuty e IAM van en el diseño desde el primer día.
- **El contexto define las respuestas.** Lo que recibe el agente importa tanto como el modelo.

El [material de Strands Agents](https://lnkd.in/dF2rgAxA) de la sesión.
