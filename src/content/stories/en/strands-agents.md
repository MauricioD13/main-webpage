---
title: "Agents are already here"
description: "Notes from an AWS session on building AI agents with serverless, Strands Agents and MCP."
date: 2025-12-20
tags: ["AWS", "AI", "Serverless"]
cover: ../../../assets/stories/aws-strand-agents.png
translationKey: strands-agents
---

"AI agents are not the future. They're already reshaping how we build in the cloud."

That was how the AWS Experience Iberia session *Building AI agents with serverless, Strands and MCP* opened last month. The session was about agents in production: systems that call tools and other services, not only prompts.

The AWS team showed how serverless architectures, Amazon Bedrock and the Strands Agents SDK fit together to run agents. My notes:

- **Agents are modular.** They reason, use tools and talk to other systems through the Model Context Protocol, and Strands Agents provides the building blocks for it.
- **Serverless reduces the infrastructure work.** Running agents on Lambda, ECS or EKS leaves less server management.
- **Observability and governance still matter.** CloudWatch, X-Ray, GuardDuty and IAM belong in the design from day one.
- **Context shapes the answers.** What the agent receives matters as much as the model.

The session's [Strands Agents material](https://lnkd.in/dF2rgAxA).
