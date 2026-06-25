---
title: "01 - Introduction to Terraform"
description: "What Terraform is, its core benefits, and how it approaches infrastructure provisioning."
tags:
  - terraform
  - iac
  - fundamentals
---

# Introduction to Terraform

Terraform is an **Infrastructure as Code (IaC)** tool that uses a **declarative approach** — you describe the desired state of your infrastructure and Terraform figures out how to get there. Infrastructure is defined using **HCL (HashiCorp Configuration Language)**, which acts as the blueprint for everything you want to provision.

## What is Terraform

- Infrastructure is defined in **code files** that can be versioned, reviewed, and shared across teams
- Workflows are **standardised** — everyone on the team deploys and manages infrastructure the same way
- It is **platform agnostic** — not tied to a specific cloud provider or data center

## Benefits

### Version Control & Auditability

- Every infrastructure change is versioned, making it clear **what** changed, **when**, and **by whom**
- Rolling back an undesired change is as simple as reverting the code
- Ideal for compliance and auditing — reviewers have full visibility into the history of changes

### Automation & Efficiency

- Provisioning is fully automated, reducing manual steps and accelerating deployment cycles

### Scalability & Flexibility

- Scaling infrastructure or adapting to new requirements is handled in code, without manual intervention

### Collaboration

- Teams can work in parallel, open pull requests, and conduct code reviews
- Increases transparency and breaks down operational silos

### Consistency & Repeatability

- Infrastructure is always deployed in the same way, minimising human error and preventing **configuration drift**

## Platform Agnostic

Terraform communicates with each cloud provider through **providers** — plugins that translate your HCL configuration into provider-specific API calls. This makes Terraform a universal layer across AWS, Azure, GCP, and beyond.

## Provisioning with Terraform

Instead of clicking through cloud consoles, you write code that describes the infrastructure you need. Terraform handles the rest.

### Reusing Code

Infrastructure code can be reused across multiple resources through **variables** and **modules**. Variables parametrise resource blocks, eliminating duplication and keeping the codebase maintainable, testable, and consistent.
