---
# EXAMPLE ENTRY: replace the notes with your own, then set draft: false to publish.
title: "Notes on The DevOps HandBook"
date: 2024-11-10
draft: true
book:
  title: "The DevOps HandBook"
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

DevOps fosters a culture driven by hypotheses and experimentation, rather than a fear of change. Individuals are rewarded for taking calculated risks.

Everyone takes ownership of the quality of their work, which naturally leads to automation.

Highly productive companies empower numerous small, high-performing teams; the more developers there are, the more effective deployments occur. The opposite is true for low-performing teams.

---

## The First Way: Principles of Flow

The first step is to increase the speed between stages in the value stream by doing the following:

- Making work visible
- Reducing work quantities and batch sizes (limiting WIP and using small batch sizes)
- Managing system constraints (Theory of Constraints)

### Making Work Visible

The first phase of the DevOps flow is making work visible. In technology environments, it is often difficult to see work in progress (WIP).

One way to achieve this is by using **Kanban**—its stages make it easy to visualize where delays or backlogs are occurring at any given workstation.

Once work is visible, all stakeholders can see the flow and prioritize tasks based on overarching goals.

### Limiting WIP (Work in Progress)

Limiting the number of tasks at a workstation helps ensure they are completed more quickly. Multitasking reduces efficiency—this is scientifically proven.

Controlling WIP makes it clear where bottlenecks exist.

### Small Batch Sizes

Batch sizes should be minimized to detect errors sooner, rather than passing them on to subsequent workstations—or, in the worst-case scenario, allowing them to reach production.

Small batches = shorter feedback cycles = lower cost of correction. ### Theory of Constraints

1. Identify the system's constraint
2. Decide how to exploit the system's constraint
3. Subordinate everything else to the previous decisions
4. Elevate the system's constraint
5. If the constraint has been broken, return to the first step to prevent inertia from creating a new constraint

**Common constraints:**

- **Environment creation:** Teams must wait for test and staging environments to be created before they can begin projects. Because "drift" can occur between development and production, IT teams often take longer to set these up.
- **Code deployment:** When a deployment requires many hours and significant personnel, work-in-progress (WIP) rises to levels that are unhealthy for the business. To address this, deployments should be automated as much as possible.
- **Test configuration and execution:** Test environments are required for every deployment, making it necessary to automate this step.
- **Highly coupled architecture:** An architecture with high coupling means that deployments require coordination among many teams from different areas.

### Flow Metrics

Some proxy metrics—such as the number of lines of code pushed to production—provide an incomplete view of the value stream. It is better to use flow metrics:

- **Flow velocity:** The number of items completed within a given timeframe—accelerating the delivery of value.
- **Flow efficiency:** The proportion of time items spend actively moving through the process.
- **Flow time:** The total time it takes for an item to move from start to finish.
- **Flow load:** The number of items currently active or waiting within the value stream.
- **Flow distribution:** The types of work that dominate the flow. ### Lead Time

Lead time is one of the most widely used metrics in the industry for measuring system efficiency. It begins when a customer ticket or request is created and ends when it is completed.

Companies with excessively long lead times often face production issues due to a lack of error traceability: by the time a problem reaches the developers, they may no longer recall the code where the issue originated.

### Complete and Accurate

Another metric that provides visibility into the technology flow is the "complete and accurate" percentage. This indicates how often—as a percentage of the time—downstream recipients within the value stream can proceed with their work without needing to request modifications or additional information.

An easy way to obtain this metric is by asking the recipients in the value stream whether the information or artifact they receive is complete, and what percentage of the time they spend requesting additional information.

---

## The Second Way: Principles of Feedback

The Second Way focuses on creating fast, amplified feedback loops that flow from right to left within the value stream.

Complex systems must take the following principles into account:

- Complex work is managed in a way that allows for the exposure of problems in design and operations.
- Problems
