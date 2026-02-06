# PaymentPredictor — Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** 2026-02-06  
**Author:** Product Team  
**Status:** Draft

---

## Table of Contents

1. [Introduction](#introduction)
2. [User Personas](#user-personas)
3. [User Stories](#user-stories)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [API Specifications](#api-specifications)
7. [Data Models](#data-models)
8. [Integration Requirements](#integration-requirements)
9. [Security Requirements](#security-requirements)
10. [Appendix](#appendix)

---

## Introduction

### Purpose

This Product Requirements Document (PRD) defines the detailed requirements for PaymentPredictor, a SaaS platform that helps freelancers predict and prevent late payments. This document serves as the authoritative reference for all product development decisions.

### Scope

This PRD covers the MVP release and first post-launch sprint. Features marked as [MVP] are in-scope for initial launch. Features marked as [Post-MVP] are planned for subsequent releases.

### Definitions

| Term | Definition |
|------|------------|
| Client | A business or individual who pays the freelancer for work |
| Invoice | A request for payment for completed work |
| Risk Score | A 1-10 rating predicting likelihood of late payment |
| Follow-up Sequence | A series of automated reminder emails |
| Due Date | The date by which payment is expected |
| Overdue | An invoice past its due date without payment |

### Document Conventions

- **SHALL:** Mandatory requirement
- **SHOULD:** Highly recommended
- **MAY:** Optional
- **[MVP]:** Included in minimum viable product
- **[Post-MVP]:** Planned for future releases

---

## User Personas

### Persona 1: Sarah — The Freelance Writer

**Demographics:**
| Attribute | Value |
|-----------|-------|
| Age | 32 |
| Location | Austin, Texas |
| Education | BA in English |
| Experience | 5 years freelancing |
| Annual Income | $65,000 |

**Background:**

Sarah is a freelance content writer who works with marketing agencies, startups, and established businesses. She writes blog posts, whitepapers, case studies, and website copy. After leaving her corporate marketing job 5 years ago, she built a successful freelance business through networking and referrals.

**Work Patterns:**
- Works with 10-15 active clients at any time
- Sends 20-30 invoices per month
- Average invoice: $500-$2,000
- Payment terms: Usually Net-30
- Uses FreshBooks for invoicing
- Tracks everything in spreadsheets

**Goals:**
1. Build a stable, predictable income stream
2. Work with quality clients who respect her work
3. Spend more time writing, less time on admin
4. Eventually hire a virtual assistant
5. Achieve $100,000 annual income

**Frustrations:**
1. "I spend hours every month chasing payments. It's embarrassing."
2. "Some clients always pay late. I wish I could identify them earlier."
3. "My cash flow is a nightmare. I never know what's actually coming in."
4. "I feel awkward sending payment reminders. Like I'm begging."
5. "I've lost thousands to clients who just never paid."

**Quote:**
> "Last month I had three clients pay 30+ days late. I was stressed about making rent. There has to be a better way."

**Technology Profile:**
- Primary device: MacBook Pro
- Uses: FreshBooks, Google Workspace, Notion, Slack
- Tech comfort: High
- Willing to pay for tools: Yes, if ROI is clear
- Mobile usage: Checks email/Slack on iPhone

**PaymentPredictor Usage:**
- Would import invoices from FreshBooks
- Would check client risk before accepting new projects
- Wants automated follow-ups that feel professional
- Would pay $19/month without hesitation if it saves time

---

### Persona 2: Marcus — The Web Developer

**Demographics:**
| Attribute | Value |
|-----------|-------|
| Age | 28 |
| Location | Remote (based in Denver) |
| Education | Self-taught |
| Experience | 4 years freelancing |
| Annual Income | $95,000 |

**Background:**

Marcus is a self-taught web developer specializing in React and Node.js projects. He works primarily with small to medium businesses building custom web applications, e-commerce sites, and SaaS products. He found freelancing through Upwork but has transitioned to mostly direct clients.

**Work Patterns:**
- Works with 3-5 clients at any time
- Larger projects ($5,000-$50,000)
- Milestone-based payments common
- Payment terms: 50% upfront, 50% on completion
- Uses Stripe for payments, Wave for accounting
- Contracts written himself

**Goals:**
1. Build a portfolio of impressive projects
2. Increase average project value to $30,000+
3. Reduce project duration (scope creep is an issue)
4. Get paid promptly for completed work
5. Eventually start a small agency

**Frustrations:**
1. "Non-technical clients don't understand when the work is done."
2. "I've had clients use my code for months while 'reviewing' my final invoice."
3. "Milestone payments get delayed because of endless revision requests."
4. "I hate that awkward period between sending final invoice and getting paid."
5. "I've learned to never release final code until paid, but it feels adversarial."

**Quote:**
> "I finished a $15,000 project two months ago. The client is 'waiting on accounting' to pay my final $7,500. Meanwhile, the site is live and making them money."

**Technology Profile:**
- Primary device: Custom Linux desktop, MacBook for travel
- Uses: VS Code, GitHub, Stripe, Wave, Notion, Linear
- Tech comfort: Expert
- Willing to pay: Yes, for dev-quality tools
- API interest: Would love to integrate with existing tools

**PaymentPredictor Usage:**
- Would integrate with Stripe to track invoice payments
- Interested in client risk data before quoting
- Wants firm, professional follow-up sequences
- Would consider Business tier for API access

---

### Persona 3: Emily — The Graphic Designer

**Demographics:**
| Attribute | Value |
|-----------|-------|
| Age | 35 |
| Location | Brooklyn, New York |
| Education | BFA in Graphic Design |
| Experience | 8 years freelancing |
| Annual Income | $85,000 |

**Background:**

Emily is a brand identity designer working with startups and small businesses. She creates logos, brand guidelines, marketing materials, and packaging design. She built her reputation through Instagram and referrals, and has a waitlist for new projects.

**Work Patterns:**
- Works with 4-8 clients at any time
- Project-based work ($2,500-$15,000)
- 2-3 revision rounds typical
- Payment terms: 50% upfront, 50% on approval
- Uses Bonsai for contracts and invoices
- Keeps client notes in Apple Notes

**Goals:**
1. Increase rates to $150+/hour effective
2. Work with higher-profile brands
3. Reduce revision rounds through better process
4. Maintain work-life balance
5. Teach design through courses eventually

**Frustrations:**
1. "Clients approve designs then take forever to pay the final invoice."
2. "I've started watermarking everything until paid in full."
3. "Some clients are wonderful. Others always pay 45 days late. I can't tell before."
4. "Following up on payments feels unprofessional. I'm an artist, not a debt collector."
5. "My income varies wildly month to month."

**Quote:**
> "I have one client who's used me for three years. Every single invoice is paid at least 3 weeks late. I wish I'd known that before working with them."

**Technology Profile:**
- Primary device: iMac Pro, iPad Pro for sketching
- Uses: Adobe Creative Suite, Figma, Bonsai, Instagram, Slack
- Tech comfort: Medium-high
- Willing to pay: For quality tools, yes
- Visual preference: Beautiful, well-designed interfaces

**PaymentPredictor Usage:**
- Would integrate with Bonsai (or import CSV)
- Wants to see client payment history at a glance
- Prefers friendly, professional reminder templates
- Attracted to visual dashboards and cash flow charts

---

### Persona 4: James — The Management Consultant

**Demographics:**
| Attribute | Value |
|-----------|-------|
| Age | 45 |
| Location | Chicago, Illinois |
| Education | MBA |
| Experience | 10 years consulting (5 freelance) |
| Annual Income | $180,000 |

**Background:**

James is an independent management consultant specializing in operations optimization for manufacturing companies. He left a Big 4 consulting firm to go solo and works with enterprise clients on engagements ranging from $50,000 to $200,000.

**Work Patterns:**
- Works with 2-3 clients at any time
- Large engagements ($50,000-$200,000)
- Monthly retainer or project-based
- Payment terms: Net-60 or Net-90 (corporate clients)
- Uses QuickBooks for accounting
- Detailed SOWs and contracts

**Goals:**
1. Maintain high-value client relationships
2. Achieve predictable six-figure income
3. Reduce time on business admin
4. Build thought leadership in industry
5. Work 40 hours/week, not 60+

**Frustrations:**
1. "Corporate payment cycles are brutal. Net-60 is a suggestion, not a rule."
2. "My invoices go through 3-4 approvers. Any of them can slow things down."
3. "I can't really chase aggressively—these are relationships I need to maintain."
4. "Cash flow planning is a nightmare with $50K invoices pending."
5. "I've had to get lines of credit to bridge payment gaps."

**Quote:**
> "I have $120,000 in outstanding invoices right now. Two are over 90 days. Both clients claim it's 'in the system.' Meanwhile, I'm paying credit card interest."

**Technology Profile:**
- Primary device: ThinkPad X1 Carbon
- Uses: QuickBooks, Microsoft 365, LinkedIn, Salesforce
- Tech comfort: Medium
- Willing to pay: Premium price for premium tools
- Enterprise considerations: Data security important

**PaymentPredictor Usage:**
- Would integrate with QuickBooks
- Needs tactful, professional follow-up sequences
- Very interested in cash flow forecasting
- Would pay $39/month for Business tier easily

---

### Persona 5: Alex — The Small Agency Owner

**Demographics:**
| Attribute | Value |
|-----------|-------|
| Age | 38 |
| Location | Portland, Oregon |
| Education | BA in Communications |
| Experience | 12 years marketing (5 with agency) |
| Annual Income (Agency): $450,000 |

**Background:**

Alex founded a boutique digital marketing agency 5 years ago. The agency has 4 full-time employees and several contractors. They serve B2B SaaS companies with content marketing, SEO, and paid advertising services.

**Work Patterns:**
- Manages 15-20 client accounts
- Retainer model ($5,000-$25,000/month per client)
- Payment terms: Net-30
- Uses QuickBooks, HubSpot, various marketing tools
- Has a part-time bookkeeper

**Goals:**
1. Grow agency to $1M annual revenue
2. Reduce client churn
3. Hire two more team members
4. Improve cash flow to fund growth
5. Eventually exit or sell agency

**Frustrations:**
1. "When a client pays late, I still have to pay my team on time."
2. "I've taken on personal debt to cover payroll during slow payment periods."
3. "Some clients are consistently late. It's built into their culture."
4. "Our bookkeeper spends days each month on payment follow-up."
5. "I need to forecast cash flow to plan hiring."

**Quote:**
> "Last quarter, one client was 60 days late on a $15,000 invoice. I had to float $25,000 in payroll from my personal savings."

**Technology Profile:**
- Primary device: MacBook Pro
- Uses: QuickBooks, HubSpot, Slack, Notion, Asana
- Tech comfort: High
- Willing to pay: Invests heavily in tools
- Team needs: Needs multi-user access

**PaymentPredictor Usage:**
- QuickBooks integration essential
- Multi-user access for team
- Automated follow-up to save bookkeeper time
- Cash flow forecasting for planning
- Would pay $39/month Business tier, potentially more for team

