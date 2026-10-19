---
title: "Stop sending all your traffic through one firewall"
description: "Takeaways from an AWS Experience Iberia session on firewalls: layered protection, inspection models, and automation."
date: 2025-01-20
tags: ["AWS", "Security", "WAF"]
cover: ../../../assets/stories/aws-firewall.jpg
translationKey: aws-firewall
---

"Stop sending all your traffic through a single firewall."

That line, from an AWS Experience Iberia virtual session last month, was the main argument of the talk: spread protection across layers instead of concentrating it in one inspection point.

The session, *Firewalls on AWS: when and how to protect your infrastructure*, covered network protection patterns and how they scale. My notes:

- **Shared responsibility is the foundation.** AWS secures the cloud; we secure what we put in it.
- **Layered protection.** AWS WAF, Shield, Network Firewall and Firewall Manager together cover layers 3 to 7.
- **Centralized and distributed inspection.** Each model trades off cost, performance and blast radius differently.
- **Automation and observability.** Security Hub, GuardDuty, Inspector and Systems Manager automate detection and remediation, so fewer issues wait for someone to notice them.

The session material:

- [Session material, part 1](https://lnkd.in/dGHJcKgY)
- [Session material, part 2](https://lnkd.in/dx2_K35G)
- [Session material, part 3](https://lnkd.in/dGxbwdg9)
