---
# EXAMPLE ENTRY: replace the notes with your own, then set draft: false to publish.
title: "Notes on The Phoenix Project"
date: 2026-09-01
draft: true
book:
  title: "The Phoenix Project"
  author: "Gene Kim, Kevin Behr, George Spafford"
  year: 2013
  pages: 432
category: business
status: finished
rating: 4
spine: "#009FE3"
takeaways:
  - "Unplanned work is the silent killer of every plan."
  - "Work in progress is invisible until you make it visible."
  - "The constraint decides the throughput of the whole system."
quotes:
  - "Improving daily work is even more important than doing daily work."
relatedProjects:
  - en/ecs-delivery
translationKey: the-phoenix-project
---

# The Phoenix Project - Notes

A business novel that follows Bill Palmer, newly promoted to VP of IT Operations at Parts Unlimited—a company on the brink of collapse. He has 90 days to save "The Phoenix Project"—a critical initiative that is behind schedule and over budget—or the entire IT department will be eliminated.

Note: Those who have read the book *The Goal* by Eliyahu Goldratt will notice similarities to the world of logistics.

The central premise: chaos in IT is a problem for the entire business, not just a technology issue. Conflicts between Development, Operations, Security, and the business destroy value—until they are aligned through DevOps, Kanban, and the Theory of Constraints.

The ideas presented in the book are explored in greater depth in the [[DevOps Handbook - Consolidated Notes]].

---

## The 4 Types of Work

All IT work falls into one of four categories. Making this distinction visible helps explain why an organization fails to deliver on time:

- **Business Projects**: New products or features requested by the business that are directly linked to its objectives.
- **Internal IT Projects**: Infrastructure and process improvements (e.g., setting up environments, automating deployments). These are invisible to the business, often proceed without oversight, and consume resources that would otherwise go toward business projects.
- **Changes**: The daily operational work of logging, planning, testing, and deploying modifications to systems.
- **Unplanned Work**: The worst type of work—also known as "firefighting" (e.g., putting out fires, recovering from system outages). It has the power to bring everything else to a standstill.

> Unplanned work is recovery work, which almost always pulls you away from achieving your goals.

The conclusion: Unplanned work—driven by changes to poorly understood or unstable systems—prevents the timely delivery of any project. That is why the results of any changes must be as predictable as possible: this requires development environments that mirror production, and ensuring that the cost of failure is kept as low as possible.

---

## Theory of Constraints: IT as a Manufacturing Plant

Erik, Bill’s mentor, teaches him that IT operations function like a manufacturing plant: work flows through various stations, and the throughput of the entire system is determined by the bottleneck.

At Parts Unlimited, the bottleneck has a name: **Brent**—the star engineer who is the only person capable of solving the toughest problems. Everything goes through him; everyone interrupts him, leaving him no time for proactive work. Protecting and optimizing his time is the only way to improve the system.

> Any improvement made anywhere other than at the bottleneck is an illusion.

Improving stations that are not the bottleneck does not increase throughput; it merely causes more work to pile up, waiting at the constraint, which drives Work-in-Progress (WIP) to toxic levels.

---

## Change Control

A large portion of unplanned work stems from uncontrolled changes:

- The security team (led by John) deploys changes without going through approval processes, triggering SEV1 (critical) outages—which cannot be tested beforehand because no testing environment exists.
- No one documents changes or attends Change Advisory Board (CAB) meetings.

Bill implements a functional CAB: every change is logged, evaluated, and tested. This drastically reduces unplanned disruptions.

---

## The Three Ways

The principles that structure the transformation (later expanded upon in *The DevOps Handbook*):

### The First Way: Flow

Work must flow from left to right—from Development to Operations, and finally to the customer—without moving backward. Work that returns upstream due to defects or ambiguity is, quite literally, waste.

Key practices include: making work visible using Kanban, limiting WIP, reducing batch sizes, and ensuring that known defects are not passed on to the next work center. ### Second Way: Feedback

Create rapid, constant feedback loops to detect and correct issues early. Build quality in at the source to avoid rework: the ideal workflow moves in only one direction—forward.

### Third Way: Continuous Learning

A culture of deliberate experimentation: viewing failures as learning opportunities, conducting blameless post-mortems, and engaging in repetition and practice. Embracing risk and error as part of the learning process.

---

## Improving Daily Work

> Improving daily work is even more important than doing the daily work.

> You cannot improve what you cannot measure.

The results of the transformation at Parts Unlimited speak for themselves: SEV1 incidents dropped by two-thirds, incident recovery time was cut in half, and a standardized environment-creation process was established, keeping Development and Operations in sync.

---

## Leadership and Final Lessons

- Effective leadership is not about dictating solutions, but rather empowering teams to find and implement their own answers.
- Breaking down the
