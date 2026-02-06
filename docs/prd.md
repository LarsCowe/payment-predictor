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

---

## User Stories

### Epic 1: User Account Management

#### US-1.1: User Registration [MVP]
**As a** new user  
**I want to** create an account with my email and password  
**So that** I can start tracking my invoices and clients

**Acceptance Criteria:**
- User can enter email and password to register
- Password must be at least 8 characters with 1 number
- User receives confirmation email
- User is logged in after registration
- Error messages display for invalid inputs

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-1.2: Google OAuth Registration [MVP]
**As a** new user  
**I want to** sign up using my Google account  
**So that** I can register quickly without another password

**Acceptance Criteria:**
- "Sign up with Google" button is visible
- Google OAuth flow completes successfully
- User account is created with Google email
- Profile picture is imported from Google
- User is logged in after completion

**Priority:** Must-Have  
**Story Points:** 5

---

#### US-1.3: User Login [MVP]
**As a** registered user  
**I want to** log in with my email and password  
**So that** I can access my account

**Acceptance Criteria:**
- User can enter email and password to log in
- User sees error message for invalid credentials
- "Forgot password" link is available
- User is redirected to dashboard after login
- Session persists until logout or expiry (30 days)

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-1.4: Password Reset [MVP]
**As a** user who forgot their password  
**I want to** reset my password via email  
**So that** I can regain access to my account

**Acceptance Criteria:**
- User can request password reset with email
- Reset email is sent within 2 minutes
- Reset link expires after 24 hours
- User can set new password with valid link
- User is logged in after password reset

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-1.5: Profile Settings [MVP]
**As a** logged-in user  
**I want to** update my profile information  
**So that** my account reflects accurate details

**Acceptance Criteria:**
- User can update name and profile picture
- User can change email with verification
- User can change password (requires current password)
- Changes save successfully with confirmation
- Profile picture supports upload (PNG, JPG, max 5MB)

**Priority:** Should-Have  
**Story Points:** 3

---

#### US-1.6: Notification Preferences [MVP]
**As a** user  
**I want to** configure my notification preferences  
**So that** I receive relevant updates without spam

**Acceptance Criteria:**
- User can toggle email notifications on/off
- Notification types: payment received, invoice overdue, weekly digest
- Changes save immediately
- Preferences persist across sessions
- Default: all notifications on

**Priority:** Should-Have  
**Story Points:** 2

---

#### US-1.7: Account Deletion [MVP]
**As a** user  
**I want to** delete my account and all data  
**So that** I can remove my information from the platform

**Acceptance Criteria:**
- User can request account deletion from settings
- Confirmation required (type "DELETE")
- All user data is removed within 30 days
- User receives confirmation email
- Deletion is irreversible

**Priority:** Must-Have (GDPR compliance)  
**Story Points:** 3

---

### Epic 2: Client Management

#### US-2.1: Add New Client [MVP]
**As a** freelancer  
**I want to** add a new client to my account  
**So that** I can track their invoices and payment behavior

**Acceptance Criteria:**
- User can enter client company name (required)
- User can enter contact name (optional)
- User can enter contact email (optional)
- User can select industry from dropdown
- User can add notes
- Client is saved and appears in client list

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-2.2: View Client List [MVP]
**As a** freelancer  
**I want to** view all my clients in a list  
**So that** I can manage them efficiently

**Acceptance Criteria:**
- List displays all clients with name, industry, risk score
- List is sortable by name, risk score, last invoice
- List is searchable by client name
- Pagination for more than 20 clients
- Click on client opens client detail page

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-2.3: Edit Client Details [MVP]
**As a** freelancer  
**I want to** edit an existing client's information  
**So that** I can keep records accurate

**Acceptance Criteria:**
- User can edit all client fields
- Changes save successfully
- Edit history is preserved (audit log)
- Confirmation displayed on save
- Validation rules match add client

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-2.4: Delete Client [MVP]
**As a** freelancer  
**I want to** delete a client I no longer work with  
**So that** my client list stays clean

**Acceptance Criteria:**
- User can delete client from detail page
- Confirmation dialog warns about data loss
- Associated invoices are kept (marked as archived)
- Client is removed from list
- Deletion is logged

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-2.5: View Client Risk Score [MVP]
**As a** freelancer  
**I want to** see a risk score for each client  
**So that** I know which clients are likely to pay late

**Acceptance Criteria:**
- Risk score (1-10) displayed on client card/detail
- Score color-coded (green 1-3, yellow 4-6, red 7-10)
- Factors contributing to score are visible
- Score updates when new payment data is added
- Score explanation available on hover/click

**Priority:** Must-Have  
**Story Points:** 5

---

#### US-2.6: Client Payment History [MVP]
**As a** freelancer  
**I want to** see a client's payment history  
**So that** I understand their payment behavior over time

**Acceptance Criteria:**
- History shows all invoices for client
- Each invoice shows: amount, due date, paid date, days late
- Average days to payment calculated
- On-time payment percentage shown
- History is chronological (newest first)

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-2.7: Client Notes [MVP]
**As a** freelancer  
**I want to** add notes to a client record  
**So that** I can remember important details

**Acceptance Criteria:**
- Notes field supports rich text (bold, italic, links)
- Notes are saved automatically
- Last modified timestamp shown
- Notes are searchable
- Notes support @mentions (future: team feature)

**Priority:** Should-Have  
**Story Points:** 2

---

#### US-2.8: Client Tags [Post-MVP]
**As a** freelancer  
**I want to** tag clients with custom labels  
**So that** I can organize and filter them

**Acceptance Criteria:**
- User can create custom tags
- Multiple tags can be applied per client
- Tags are color-coded
- Client list can be filtered by tags
- Tags can be renamed or deleted

**Priority:** Could-Have  
**Story Points:** 3

---

### Epic 3: Invoice Management

#### US-3.1: Add Invoice Manually [MVP]
**As a** freelancer  
**I want to** add an invoice manually  
**So that** I can track payments not in my invoicing system

**Acceptance Criteria:**
- User selects client from dropdown
- User enters invoice number (optional)
- User enters amount (required)
- User enters due date (required)
- User enters description (optional)
- Invoice status defaults to "Pending"

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-3.2: View Invoice List [MVP]
**As a** freelancer  
**I want to** see all my invoices in a list  
**So that** I can track their status

**Acceptance Criteria:**
- List shows client, amount, due date, status
- List is sortable by any column
- List is filterable by status (pending, overdue, paid)
- Overdue invoices highlighted in red
- Total outstanding amount shown

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-3.3: Edit Invoice [MVP]
**As a** freelancer  
**I want to** edit invoice details  
**So that** I can correct mistakes

**Acceptance Criteria:**
- User can edit amount, due date, description
- User cannot change client after creation
- Changes are logged in audit trail
- Validation prevents invalid data
- Paid invoices cannot be edited

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-3.4: Mark Invoice as Paid [MVP]
**As a** freelancer  
**I want to** mark an invoice as paid  
**So that** it's no longer tracked as outstanding

**Acceptance Criteria:**
- User can click "Mark as Paid" button
- User enters payment date
- Invoice status changes to "Paid"
- Days to payment calculated automatically
- Client payment history updates

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-3.5: Delete Invoice [MVP]
**As a** freelancer  
**I want to** delete an invoice entered by mistake  
**So that** my records stay accurate

**Acceptance Criteria:**
- User can delete from invoice detail page
- Confirmation dialog required
- Paid invoices warn about historical data impact
- Invoice removed from list
- Deletion logged

**Priority:** Must-Have  
**Story Points:** 2

---

#### US-3.6: Invoice Status Tracking [MVP]
**As a** freelancer  
**I want to** see the current status of each invoice  
**So that** I know which need attention

**Acceptance Criteria:**
- Statuses: Draft, Sent, Overdue, Paid
- Status changes automatically (Sent → Overdue on due date)
- Status badge visible in list and detail
- Dashboard shows count by status
- Status filter on invoice list

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-3.7: Invoice CSV Import [MVP]
**As a** freelancer  
**I want to** import invoices from a CSV file  
**So that** I can bulk-add historical data

**Acceptance Criteria:**
- User downloads template CSV
- User uploads completed CSV
- System validates and previews import
- User confirms before import
- Errors reported with line numbers
- Successful imports create invoices

**Priority:** Should-Have  
**Story Points:** 5

---

#### US-3.8: Recurring Invoice [Post-MVP]
**As a** freelancer with retainer clients  
**I want to** set up recurring invoice tracking  
**So that** monthly invoices are auto-created

**Acceptance Criteria:**
- User marks invoice as recurring
- User sets frequency (weekly, monthly)
- System creates new invoice on schedule
- User notified of new invoice creation
- Recurrence can be paused or stopped

**Priority:** Could-Have  
**Story Points:** 5

---

### Epic 4: Payment Prediction

#### US-4.1: View Client Risk Score [MVP]
**As a** freelancer  
**I want to** see a prediction of how likely a client is to pay late  
**So that** I can make informed decisions

**Acceptance Criteria:**
- Risk score (1-10) displayed for each client
- Score based on algorithm factors
- Score updates with new data
- Visual indicator (color, icon)
- Explanation accessible

**Priority:** Must-Have  
**Story Points:** 5

---

#### US-4.2: Risk Score Explanation [MVP]
**As a** freelancer  
**I want to** understand why a client has a certain risk score  
**So that** I can contextualize the prediction

**Acceptance Criteria:**
- Factors shown with weighted contribution
- Factors include: industry, history, size, terms
- User can see which factors are positive/negative
- Explanation available via modal or detail page
- Plain language, not technical jargon

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-4.3: Industry Risk Defaults [MVP]
**As a** freelancer  
**I want to** see industry-typical risk levels  
**So that** new clients have baseline predictions

**Acceptance Criteria:**
- Each industry has default risk range
- New clients inherit industry default
- Defaults based on research data
- User can see industry context
- Industry list covers major sectors

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-4.4: Cash Flow Prediction [Post-MVP]
**As a** freelancer  
**I want to** see predicted income based on payment patterns  
**So that** I can plan my finances

**Acceptance Criteria:**
- Calendar view shows expected payments
- Predictions based on historical behavior
- Visual chart of predicted income
- Exportable to CSV
- Updates as invoices are paid

**Priority:** Should-Have  
**Story Points:** 8

---

#### US-4.5: Pre-Project Risk Check [Post-MVP]
**As a** freelancer  
**I want to** check a prospective client's risk before accepting  
**So that** I avoid problematic clients

**Acceptance Criteria:**
- User can input company name/details
- System checks against aggregate data
- Risk estimate provided
- Industry benchmark shown
- Red flags highlighted

**Priority:** Could-Have  
**Story Points:** 8

---

### Epic 5: Automated Follow-ups

#### US-5.1: Default Follow-up Sequence [MVP]
**As a** freelancer  
**I want to** have automatic reminders sent to late-paying clients  
**So that** I don't have to chase payments manually

**Acceptance Criteria:**
- Default sequence: 3 days before, day of, 3 days after, 7 days after, 14 days after
- Emails sent automatically at each stage
- Emails are professional and appropriate
- User can opt out per invoice
- Sequence pauses when payment received

**Priority:** Must-Have  
**Story Points:** 8

---

#### US-5.2: Custom Follow-up Templates [MVP]
**As a** freelancer  
**I want to** customize the follow-up email content  
**So that** it matches my brand and tone

**Acceptance Criteria:**
- User can edit each template (subject, body)
- Variables supported: {client_name}, {amount}, {due_date}, etc.
- Preview before saving
- Reset to default option
- HTML formatting supported

**Priority:** Should-Have  
**Story Points:** 5

---

#### US-5.3: Follow-up Timing Customization [MVP]
**As a** freelancer  
**I want to** adjust when follow-up emails are sent  
**So that** I can match my typical payment cycles

**Acceptance Criteria:**
- User can set days for each follow-up stage
- User can enable/disable individual stages
- Default timing can be restored
- Changes apply to future invoices
- Per-client override option

**Priority:** Should-Have  
**Story Points:** 3

---

#### US-5.4: Manual Follow-up Trigger [MVP]
**As a** freelancer  
**I want to** manually send a follow-up email  
**So that** I can intervene when needed

**Acceptance Criteria:**
- User can trigger email from invoice detail
- User selects template or writes custom
- Preview before sending
- Email logged in follow-up history
- Confirmation displayed after send

**Priority:** Should-Have  
**Story Points:** 3

---

#### US-5.5: Follow-up Activity Log [MVP]
**As a** freelancer  
**I want to** see a history of all follow-up emails sent  
**So that** I know what communication has occurred

**Acceptance Criteria:**
- Log shows date, recipient, subject, status
- Status: sent, delivered, opened (if trackable)
- Filterable by client or invoice
- Export to CSV
- Links to full email content

**Priority:** Should-Have  
**Story Points:** 3

---

#### US-5.6: Escalation Path [Post-MVP]
**As a** freelancer  
**I want to** automatically escalate follow-ups if not paid  
**So that** communication becomes progressively firmer

**Acceptance Criteria:**
- Escalation levels: friendly, reminder, firm, final notice
- Each level has different tone/content
- User can configure escalation timeline
- Legal notice template available
- Manual override at any point

**Priority:** Could-Have  
**Story Points:** 5

---

### Epic 6: Dashboard & Reporting

#### US-6.1: Main Dashboard [MVP]
**As a** freelancer  
**I want to** see an overview of my payment situation  
**So that** I can quickly understand my status

**Acceptance Criteria:**
- Shows total outstanding amount
- Shows count of overdue invoices
- Shows upcoming due dates (next 7 days)
- Shows recent payments received
- At-risk invoices highlighted

**Priority:** Must-Have  
**Story Points:** 5

---

#### US-6.2: Outstanding Invoices Widget [MVP]
**As a** freelancer  
**I want to** see a list of unpaid invoices on my dashboard  
**So that** I can prioritize follow-ups

**Acceptance Criteria:**
- Shows top 10 unpaid invoices
- Sorted by most overdue first
- Shows client, amount, days overdue
- Quick action: send reminder
- Link to full invoice list

**Priority:** Must-Have  
**Story Points:** 3

---

#### US-6.3: At-Risk Invoices Alert [MVP]
**As a** freelancer  
**I want to** see invoices at high risk of being late  
**So that** I can take proactive action

**Acceptance Criteria:**
- Shows invoices with high-risk clients nearing due date
- Risk threshold configurable (default: 7+)
- Explains why invoice is at-risk
- Suggests action (send early reminder)
- Updates dynamically

**Priority:** Should-Have  
**Story Points:** 3

---

#### US-6.4: Payments Received Report [MVP]
**As a** freelancer  
**I want to** see a report of payments received over time  
**So that** I can track my income

**Acceptance Criteria:**
- Shows payments by month/quarter
- Chart and table views
- Filterable by date range
- Shows average days to payment
- Exportable to CSV

**Priority:** Should-Have  
**Story Points:** 5

---

#### US-6.5: Client Performance Report [MVP]
**As a** freelancer  
**I want to** see which clients pay on time vs late  
**So that** I can evaluate relationships

**Acceptance Criteria:**
- Ranks clients by on-time payment rate
- Shows average days to payment per client
- Highlights worst offenders
- Suggests action for chronic late payers
- Exportable to CSV

**Priority:** Should-Have  
**Story Points:** 5

---

#### US-6.6: Weekly Digest Email [MVP]
**As a** freelancer  
**I want to** receive a weekly summary email  
**So that** I stay informed without logging in

**Acceptance Criteria:**
- Sent every Monday morning
- Summarizes: outstanding, overdue, at-risk, received last week
- Links to platform for details
- Unsubscribe option available
- Plain text and HTML versions

**Priority:** Should-Have  
**Story Points:** 3

---

