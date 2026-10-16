---
title: "Notes on AWS cost optimization"
description: "What stuck with me from an AWS cost optimization event at AWS HQ in Madrid: dashboards, storage, and the Frugal Architect mindset."
date: 2025-03-04
tags: ["AWS", "FinOps"]
cover: ../../../assets/stories/aws-cost-optimization.png
translationKey: aws-cost-optimization
---

Over the past few months I've been digging deeper into AWS cost optimization, starting from an event I attended at AWS HQ in Madrid. Three ideas stuck.

## Cloud Intelligence Dashboards

They give granular insight into cost and usage, so you can track KPIs, spot optimization opportunities and align FinOps practices. The Cost Intelligence Dashboard, CUDOS and the Compute Optimizer Dashboard make it easy to see cost per environment, track Savings Plans and catch anomalies.

My favorite feature: tracking Graviton opportunities and right-sizing recommendations as they appear.

## Storage

- **Amazon EBS:** right-size volumes, move from io1/io2 to gp3, and use Elastic Volumes.
- **Amazon S3:** use S3 Storage Lens and lifecycle policies to move data to the cheapest class that still fits, such as Glacier Instant Retrieval. That can cut costs by up to 70%.

Regularly delete unattached EBS volumes and obsolete snapshots. They cost money and do nothing.

## The Cost Optimization pillar

The Frugal Architect mindset: design, measure, optimize. In practice:

- Practice Cloud Financial Management so finance and engineering work from the same numbers.
- Choose cost-effective resources, such as Graviton and Spot Instances.
- Keep optimizing: automate decommissioning and review workloads regularly.

## The big picture

Cost optimization isn't just cutting costs. It's getting the most value while keeping performance and scalability. Cloud Intelligence Dashboards, Compute Optimizer and Trusted Advisor let you make those calls with data.
