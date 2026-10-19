---
title: "Why CNAPPs exist"
description: "Why the CNAPP category exists: findings from several clouds and security tools that no longer fit in one view, and what these platforms try to unify."
date: 2026-06-05
tags: ["Security", "CNAPP", "Multicloud"]
cover: ../../../assets/stories/cnapp-00.jpeg
translationKey: cnapp-00
---

Security tools built for one cloud at a time get hard to operate once an organization runs on several.

Lately I've been evaluating two vendors in the CNAPP (Cloud-Native Application Protection Platform) space. Before sharing what I'm finding, it's worth explaining why the category exists, because it's easy to dismiss as "yet another platform" until you've felt the problem.

Cloud environments rarely grow at a steady pace: slowly at first, then quickly. Once scaling becomes real, containers, orchestrators, VMs and serverless functions appear fast. DevOps teams create and destroy resources easily, and security configuration isn't always the priority when shipping speed is the goal. That's not a criticism; it's how modern platforms work.

The problem lands on security teams.

Say you start on AWS and turn on Security Hub to track misconfigurations. Then the product team runs something on Azure, so you enable Microsoft Defender for Cloud. Then someone creates a GCP project, and Google SecOps joins the list.

Now there are three sources of findings, three severity formats and three dashboards. Despite each provider's real effort to interoperate, there's a lot of custom plumbing before you can see everything in one place. And that's only CSPM: misconfigurations and compliance.

Add CWPP (protecting the containers and VMs), CIEM (who has access to what, and why) and DSPM (where sensitive data lives, and whether it's exposed), and each one brings its own findings, formats and tooling to operate.

That's the gap CNAPPs aim to close: one onboarding per data source, one asset inventory, one detection pipeline producing alerts across every capability and every cloud.

Whether that promise holds in practice, and at what cost, is what I'm in the middle of finding out. More soon.
