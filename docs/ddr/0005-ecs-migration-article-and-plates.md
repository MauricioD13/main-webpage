---
status: accepted
date: 2026-10-18
decision-makers: Mauricio Cuello
---

# ECS migration article: structure and before/after plates

## Context and Problem Statement

The owner rewrote the ECS delivery project in Spanish inside the English entry (`projects/en/ecs-delivery.mdx`): the move from a single EC2 host running Docker Compose behind Traefik to Amazon ECS on Fargate, how ECS models workloads, and what went wrong. The English page mixed both languages, the new material had no visual, and the only plate showed the delivery pipeline, so the reader couldn't see what changed in the architecture.

## Decision Outcome

* The English entry is translated in the same plain, first-person tone and organized as: Context, Why ECS, How ECS describes a workload (task definitions, services), The migration, What went wrong, From merge to running service. The Spanish entry uses the owner's original text with the same structure.
* Two new plates in `src/data/diagrams.ts`, shown as `before`/`after` panels of one `Scrolly` (the pattern from the three-tier project):
  * `ecsBefore`: one EC2 instance with Traefik (Docker labels, Let's Encrypt), the app containers, a MySQL container and files on the host disk.
  * `ecsAfter`: ALB with an ACM wildcard certificate routing by subdomain to ECS services, Fargate tasks, ECR, CloudWatch, and the state moved to RDS and EFS. Steps reveal it in migration order: data, then routing and certificates, then the cluster.
* Spanish labels in `ecsBeforeEs` / `ecsAfterEs`; icons `efs`, `acm` and `fargate` added to the registry in `icons.ts`.
* The delivery pipeline plate stays as Fig. 3.3 and remains the project card's plate.
