---
title: "Agents are already here"
description: "Notes from an AWS session on building AI agents with serverless, Strands Agents and MCP."
date: 2025-12-20
tags: ["AWS", "AI", "Serverless"]
cover: ../../../assets/stories/aws-strand-agents.png
translationKey: strands-agents
---

"AI agents are not the future. They're already reshaping how we build in the cloud."

That was my main takeaway from the AWS Experience Iberia session *Building AI agents with serverless, Strands and MCP* last month. We've moved from experimenting with prompts to running agentic systems in production that reason, plan and take action, securely and at scale.

The AWS team showed how serverless architectures, Amazon Bedrock and the Strands Agents SDK fit together to make agents both capable and cheap to operate. What resonated:

- **Agents are modular.** They reason, use tools and talk to other systems through the Model Context Protocol, and Strands Agents makes that straightforward to implement.
- **Serverless removes the undifferentiated work.** Deploying agents on Lambda, ECS or EKS means focusing on logic, not servers.
- **Observability and governance still matter.** CloudWatch, X-Ray, GuardDuty and IAM belong in the design from day one.
- **Context is everything.** Great context leads to great answers.

If you're exploring agentic workflows, the [Strands Agents material](https://lnkd.in/dF2rgAxA) is a good place to start.
