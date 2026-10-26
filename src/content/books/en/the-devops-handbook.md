---
# Translation of the Spanish notes (src/content/books/es/the-devops-handbook.md).
title: "Notes on The DevOps Handbook"
date: 2024-11-10
draft: false
book:
  title: "The DevOps Handbook"
  author: "Gene Kim, Jez Humble, Patrick Debois & John Willis"
  year: 2016
  pages: 421
category: tech
status: queued
spine: "#f3b13c"
relatedProjects:
  - en/odoo-data-pipeline
translationKey: the-devops-handbook
---

DevOps encourages a culture guided by hypotheses and experimentation instead of fear of change. People are rewarded for taking calculated risks.

Everyone is responsible for the quality of their own work, which leads naturally to automation.

Highly productive companies empower many small, high-performing teams; the more developers there are, the more effective deployments they make. In low-performing teams the opposite happens.

---

## The First Way: principles of flow

The first step is to increase the speed between the stages of the value stream by doing the following:

- Make work visible
- Reduce the amount of work and the batch size (limit WIP and use small batches)
- Manage the constraints of the system (Theory of Constraints)

### Make work visible

The first phase of the DevOps flow is making work visible. In technology environments it is often hard to see the work in progress (WIP).

One way to do this is to use **Kanban**: its stages make it easy to see where delays or backlogs build up at each work center.

Once work is visible, every stakeholder can see the flow and prioritize tasks against the overall goals.

### Limit WIP (work in progress)

Limiting the number of tasks at a work center helps them get finished sooner. Multitasking reduces efficiency; this has been shown scientifically.

Controlling WIP makes it clear where the bottlenecks are.

### Small batches

Batch size should be kept to a minimum so errors are caught earlier, instead of being passed on to the next work centers or, in the worst case, reaching production.

Small batches = shorter feedback loops = lower cost of correction.

### Theory of Constraints

1. Identify the system's constraint
2. Decide how to exploit the system's constraint
3. Subordinate everything else to the decisions above
4. Elevate the system's constraint
5. If the constraint has been broken, go back to the first step so inertia doesn't create a new constraint

**Common constraints:**

- **Environment creation:** teams have to wait for test and staging environments to be created before they can start projects. Because there can be "drift" between development and production, IT teams often take longer to prepare them.
- **Code deployment:** when a deployment takes many hours and many people, work in progress (WIP) rises to levels that are unhealthy for the business. To fix this, deployments should be automated as much as possible.
- **Test setup and execution:** every deployment needs test environments, so this step has to be automated too.
- **Tightly coupled architecture:** an architecture with a lot of coupling means deployments require coordinating many teams from different areas.

### Flow metrics

Some indirect metrics, such as the number of lines of code that reach production, give an incomplete view of the value stream. Flow metrics are better:

- **Flow velocity:** the number of items completed in a given period; it speeds up the delivery of value.
- **Flow efficiency:** the share of time items spend actively moving forward in the process.
- **Flow time:** the total time an item takes to go from start to finish.
- **Flow load:** the number of items active or waiting in the value stream.
- **Flow distribution:** the types of work that dominate the flow.

### Lead time

Lead time is one of the most widely used metrics in the industry for measuring a system's efficiency. It starts when a ticket or customer request is created and ends when it is completed.

Companies with very long lead times often have problems in production because errors can't be traced: by the time a problem reaches the developers, they may no longer remember the code where it started.

### Complete and accurate

Another metric that gives visibility into the technology flow is the "complete and accurate" percentage. It shows how often, as a percentage of the time, the people who receive the work further along the value stream can continue without having to ask for changes or additional information.

A simple way to get this metric is to ask the receivers in the value stream whether the information or artifact they receive is complete, and what percentage of their time they spend asking for additional information.

---

## The Second Way: principles of feedback

The Second Way focuses on creating fast, amplified feedback loops that flow from right to left in the value stream.

Complex systems must take the following principles into account:

- Complex work is managed in a way that exposes design and operational problems.
- Problems
