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

## Functional Requirements

### FR-1: Authentication System

#### FR-1.1: User Registration
The system SHALL allow new users to register with email and password.

**Requirements:**
- FR-1.1.1: Email must be unique in the system
- FR-1.1.2: Password must be minimum 8 characters
- FR-1.1.3: Password must contain at least one number
- FR-1.1.4: Confirmation email must be sent within 2 minutes
- FR-1.1.5: Account is pending until email confirmed

#### FR-1.2: OAuth Authentication
The system SHALL support Google OAuth 2.0 for registration and login.

**Requirements:**
- FR-1.2.1: OAuth consent screen displays appropriate scopes
- FR-1.2.2: Google account email becomes user email
- FR-1.2.3: Profile picture imported from Google
- FR-1.2.4: Existing email accounts are linked to OAuth

#### FR-1.3: Session Management
The system SHALL maintain user sessions securely.

**Requirements:**
- FR-1.3.1: Sessions expire after 30 days of inactivity
- FR-1.3.2: Sessions use HTTP-only secure cookies
- FR-1.3.3: Users can log out from all devices
- FR-1.3.4: Session tokens are cryptographically random

---

### FR-2: Client Management

#### FR-2.1: Client CRUD Operations
The system SHALL support create, read, update, delete operations for clients.

**Requirements:**
- FR-2.1.1: Client company name is required (max 200 chars)
- FR-2.1.2: Contact name is optional (max 100 chars)
- FR-2.1.3: Contact email is optional but validated if provided
- FR-2.1.4: Industry selection from predefined list
- FR-2.1.5: Notes field supports up to 10,000 characters
- FR-2.1.6: Soft delete preserves historical data

#### FR-2.2: Client Risk Scoring
The system SHALL calculate and display risk scores for each client.

**Requirements:**
- FR-2.2.1: Risk score is integer 1-10
- FR-2.2.2: Score calculated from multiple factors
- FR-2.2.3: Score updates on new payment data
- FR-2.2.4: Factors and weights are configurable (admin)
- FR-2.2.5: Score explanation available to users

---

### FR-3: Invoice Management

#### FR-3.1: Invoice CRUD Operations
The system SHALL support create, read, update, delete operations for invoices.

**Requirements:**
- FR-3.1.1: Invoice requires client, amount, due date
- FR-3.1.2: Amount is positive decimal (max 2 decimal places)
- FR-3.1.3: Amount supports currencies (MVP: USD only)
- FR-3.1.4: Due date cannot be in the past for new invoices
- FR-3.1.5: Invoice number is optional (auto-generated if blank)

#### FR-3.2: Invoice Status Management
The system SHALL track invoice status through lifecycle.

**Requirements:**
- FR-3.2.1: Status options: Draft, Sent, Overdue, Paid
- FR-3.2.2: Status transitions: Draft → Sent → Overdue → Paid
- FR-3.2.3: Status automatically changes to Overdue on due date
- FR-3.2.4: Status changes to Paid when marked paid
- FR-3.2.5: Status changes are logged

#### FR-3.3: Payment Recording
The system SHALL allow users to record payments received.

**Requirements:**
- FR-3.3.1: Payment date is required
- FR-3.3.2: Payment date cannot be future
- FR-3.3.3: Days late calculated automatically
- FR-3.3.4: Client statistics update on payment
- FR-3.3.5: Partial payments not supported (MVP)

---

### FR-4: Prediction System

#### FR-4.1: Risk Score Calculation
The system SHALL calculate client risk scores using defined algorithm.

**Requirements:**
- FR-4.1.1: Industry factor (default risk by industry)
- FR-4.1.2: Historical factor (past payment behavior)
- FR-4.1.3: Recency factor (recent behavior weighted higher)
- FR-4.1.4: Volume factor (more data = higher confidence)
- FR-4.1.5: Score normalized to 1-10 scale

#### FR-4.2: Risk Factor Weights
The system SHALL apply weights to risk factors.

**Default Weights (MVP):**
| Factor | Weight |
|--------|--------|
| Industry Average | 20% |
| Payment History | 50% |
| Recent Payments (90 days) | 20% |
| Invoice Size | 10% |

**Requirements:**
- FR-4.2.1: Weights configurable by admin
- FR-4.2.2: Weights sum to 100%
- FR-4.2.3: Default weights apply to new installations

#### FR-4.3: Industry Risk Database
The system SHALL maintain industry risk benchmarks.

**Requirements:**
- FR-4.3.1: At least 20 industry categories
- FR-4.3.2: Each industry has default risk score
- FR-4.3.3: Industry data sourced from research
- FR-4.3.4: Industry data updated periodically

---

### FR-5: Follow-up System

#### FR-5.1: Automated Email Sequences
The system SHALL send automated follow-up emails based on schedule.

**Requirements:**
- FR-5.1.1: Default sequence is 5 emails
- FR-5.1.2: Timing relative to due date
- FR-5.1.3: Sequence pauses when invoice paid
- FR-5.1.4: User can disable per invoice
- FR-5.1.5: User can customize timing

#### FR-5.2: Email Template System
The system SHALL support customizable email templates.

**Requirements:**
- FR-5.2.1: Templates support variables
- FR-5.2.2: Variables include: client_name, amount, due_date, invoice_number, days_overdue
- FR-5.2.3: Templates stored per user
- FR-5.2.4: Default templates provided
- FR-5.2.5: Preview functionality available

#### FR-5.3: Email Sending
The system SHALL send emails via integrated email provider.

**Requirements:**
- FR-5.3.1: Emails sent via Resend API
- FR-5.3.2: From address is configurable
- FR-5.3.3: Delivery status tracked
- FR-5.3.4: Failed sends retried (3 attempts)
- FR-5.3.5: Failures logged and user notified

---

### FR-6: Dashboard & Reporting

#### FR-6.1: Dashboard Data
The system SHALL display aggregated dashboard data.

**Requirements:**
- FR-6.1.1: Total outstanding amount calculated
- FR-6.1.2: Invoice count by status
- FR-6.1.3: Overdue invoices listed
- FR-6.1.4: Upcoming due dates shown
- FR-6.1.5: Recent activity displayed

#### FR-6.2: Reporting
The system SHALL generate standard reports.

**Requirements:**
- FR-6.2.1: Payments received report (by period)
- FR-6.2.2: Client performance report
- FR-6.2.3: Outstanding invoices report
- FR-6.2.4: Reports exportable to CSV
- FR-6.2.5: Date range filtering supported

---

## Non-Functional Requirements

### NFR-1: Performance

#### NFR-1.1: Page Load Time
The system SHALL load pages within acceptable time limits.

**Requirements:**
- NFR-1.1.1: Dashboard loads in <2 seconds (P95)
- NFR-1.1.2: Invoice list loads in <1.5 seconds (P95)
- NFR-1.1.3: Client list loads in <1.5 seconds (P95)
- NFR-1.1.4: API responses complete in <500ms (P95)
- NFR-1.1.5: Time to Interactive <3 seconds

#### NFR-1.2: Database Performance
The system SHALL maintain efficient database operations.

**Requirements:**
- NFR-1.2.1: Queries complete in <100ms (P95)
- NFR-1.2.2: Bulk operations paginated
- NFR-1.2.3: Indexes on frequently queried columns
- NFR-1.2.4: Connection pooling implemented
- NFR-1.2.5: Query optimization reviewed quarterly

#### NFR-1.3: Scalability
The system SHALL scale to support growth.

**Requirements:**
- NFR-1.3.1: Support 10,000 concurrent users
- NFR-1.3.2: Support 100,000 total users
- NFR-1.3.3: Support 1,000,000 invoices
- NFR-1.3.4: Horizontal scaling capability
- NFR-1.3.5: No single points of failure

---

### NFR-2: Security

#### NFR-2.1: Authentication Security
The system SHALL implement secure authentication.

**Requirements:**
- NFR-2.1.1: Passwords hashed with bcrypt (cost 12)
- NFR-2.1.2: Session tokens 256-bit random
- NFR-2.1.3: HTTPS required for all traffic
- NFR-2.1.4: Rate limiting on auth endpoints
- NFR-2.1.5: Account lockout after 5 failed attempts

#### NFR-2.2: Data Protection
The system SHALL protect user data.

**Requirements:**
- NFR-2.2.1: Data encrypted at rest (AES-256)
- NFR-2.2.2: Data encrypted in transit (TLS 1.3)
- NFR-2.2.3: PII access logged
- NFR-2.2.4: Database backups encrypted
- NFR-2.2.5: API keys stored in environment variables

#### NFR-2.3: Authorization
The system SHALL enforce proper authorization.

**Requirements:**
- NFR-2.3.1: Users can only access own data
- NFR-2.3.2: Team access requires explicit permission
- NFR-2.3.3: API requires authentication token
- NFR-2.3.4: Admin functions restricted
- NFR-2.3.5: Authorization checked server-side

---

### NFR-3: Reliability

#### NFR-3.1: Availability
The system SHALL maintain high availability.

**Requirements:**
- NFR-3.1.1: 99.9% uptime SLA
- NFR-3.1.2: Planned maintenance windows <4 hours/month
- NFR-3.1.3: Status page for outage communication
- NFR-3.1.4: Automatic failover for database
- NFR-3.1.5: Multi-region deployment (post-MVP)

#### NFR-3.2: Data Durability
The system SHALL protect against data loss.

**Requirements:**
- NFR-3.2.1: Database backups every 6 hours
- NFR-3.2.2: Point-in-time recovery for 7 days
- NFR-3.2.3: Backups stored in separate region
- NFR-3.2.4: Backup restoration tested monthly
- NFR-3.2.5: Transaction logging enabled

#### NFR-3.3: Error Handling
The system SHALL handle errors gracefully.

**Requirements:**
- NFR-3.3.1: All errors logged with context
- NFR-3.3.2: User-facing errors are friendly
- NFR-3.3.3: Critical errors alert dev team
- NFR-3.3.4: Error rates monitored
- NFR-3.3.5: Automatic retry for transient failures

---

### NFR-4: Usability

#### NFR-4.1: Accessibility
The system SHALL be accessible to users with disabilities.

**Requirements:**
- NFR-4.1.1: WCAG 2.1 Level AA compliance
- NFR-4.1.2: Screen reader compatibility
- NFR-4.1.3: Keyboard navigation support
- NFR-4.1.4: Sufficient color contrast
- NFR-4.1.5: Focus indicators visible

#### NFR-4.2: Responsiveness
The system SHALL work on various devices.

**Requirements:**
- NFR-4.2.1: Desktop optimized (1024px+)
- NFR-4.2.2: Tablet usable (768px+)
- NFR-4.2.3: Mobile usable (320px+)
- NFR-4.2.4: Touch targets minimum 44px
- NFR-4.2.5: No horizontal scrolling

#### NFR-4.3: Browser Support
The system SHALL support modern browsers.

**Requirements:**
- NFR-4.3.1: Chrome (last 2 versions)
- NFR-4.3.2: Firefox (last 2 versions)
- NFR-4.3.3: Safari (last 2 versions)
- NFR-4.3.4: Edge (last 2 versions)
- NFR-4.3.5: No IE11 support

---

### NFR-5: Maintainability

#### NFR-5.1: Code Quality
The codebase SHALL maintain high quality standards.

**Requirements:**
- NFR-5.1.1: TypeScript strict mode enabled
- NFR-5.1.2: ESLint rules enforced
- NFR-5.1.3: Unit test coverage >80%
- NFR-5.1.4: Code review required for merge
- NFR-5.1.5: Documentation for public APIs

#### NFR-5.2: Deployment
The system SHALL support reliable deployment.

**Requirements:**
- NFR-5.2.1: Automated CI/CD pipeline
- NFR-5.2.2: Zero-downtime deployments
- NFR-5.2.3: Rollback capability
- NFR-5.2.4: Feature flags for gradual rollout
- NFR-5.2.5: Staging environment mirrors production

---

## API Specifications

### API Overview

PaymentPredictor provides a RESTful API for all operations. The API is versioned and follows REST conventions.

**Base URL:** `https://api.paymentpredictor.com/v1`

**Authentication:** Bearer token in Authorization header

**Content-Type:** `application/json`

### API Endpoints

#### Authentication Endpoints

##### POST /auth/register
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2026-02-06T10:00:00Z"
}
```

**Errors:**
- 400: Invalid input
- 409: Email already exists

---

##### POST /auth/login
Authenticate and receive access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 2592000,
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 429: Too many attempts

---

##### POST /auth/forgot-password
Request password reset email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If this email exists, a reset link has been sent."
}
```

---

#### Client Endpoints

##### GET /clients
List all clients for authenticated user.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 20, max: 100)
- `sort` (string): Sort field (name, riskScore, createdAt)
- `order` (string): Sort order (asc, desc)
- `search` (string): Search by name

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "cli_abc123",
      "companyName": "Acme Corp",
      "contactName": "Jane Smith",
      "contactEmail": "jane@acme.com",
      "industry": "technology",
      "riskScore": 3,
      "totalInvoices": 12,
      "paidOnTime": 10,
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

##### POST /clients
Create a new client.

**Request:**
```json
{
  "companyName": "Acme Corp",
  "contactName": "Jane Smith",
  "contactEmail": "jane@acme.com",
  "industry": "technology",
  "notes": "Great client, always responsive."
}
```

**Response (201 Created):**
```json
{
  "id": "cli_abc123",
  "companyName": "Acme Corp",
  "contactName": "Jane Smith",
  "contactEmail": "jane@acme.com",
  "industry": "technology",
  "riskScore": 5,
  "notes": "Great client, always responsive.",
  "createdAt": "2026-02-06T10:00:00Z"
}
```

---

##### GET /clients/:id
Get a single client.

**Response (200 OK):**
```json
{
  "id": "cli_abc123",
  "companyName": "Acme Corp",
  "contactName": "Jane Smith",
  "contactEmail": "jane@acme.com",
  "industry": "technology",
  "riskScore": 3,
  "riskFactors": [
    { "factor": "industry", "score": 4, "weight": 0.2 },
    { "factor": "history", "score": 2, "weight": 0.5 },
    { "factor": "recency", "score": 3, "weight": 0.2 },
    { "factor": "size", "score": 5, "weight": 0.1 }
  ],
  "statistics": {
    "totalInvoices": 12,
    "paidOnTime": 10,
    "averageDaysToPayment": 28,
    "onTimeRate": 0.83
  },
  "notes": "Great client, always responsive.",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": "2026-02-01T14:30:00Z"
}
```

---

##### PATCH /clients/:id
Update a client.

**Request:**
```json
{
  "contactName": "John Smith",
  "notes": "Updated contact info"
}
```

**Response (200 OK):**
```json
{
  "id": "cli_abc123",
  "companyName": "Acme Corp",
  "contactName": "John Smith",
  "updatedAt": "2026-02-06T11:00:00Z"
}
```

---

##### DELETE /clients/:id
Delete a client (soft delete).

**Response (204 No Content)**

---

#### Invoice Endpoints

##### GET /invoices
List all invoices.

**Query Parameters:**
- `page`, `limit`: Pagination
- `status`: Filter by status (pending, overdue, paid)
- `clientId`: Filter by client
- `startDate`, `endDate`: Date range filter

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "inv_abc123",
      "invoiceNumber": "INV-2026-001",
      "clientId": "cli_abc123",
      "clientName": "Acme Corp",
      "amount": 2500.00,
      "currency": "USD",
      "dueDate": "2026-02-15",
      "status": "pending",
      "daysUntilDue": 9,
      "createdAt": "2026-02-01T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "summary": {
    "totalOutstanding": 45000.00,
    "totalOverdue": 12500.00,
    "countByStatus": {
      "pending": 25,
      "overdue": 8,
      "paid": 117
    }
  }
}
```

---

##### POST /invoices
Create a new invoice.

**Request:**
```json
{
  "clientId": "cli_abc123",
  "invoiceNumber": "INV-2026-001",
  "amount": 2500.00,
  "currency": "USD",
  "dueDate": "2026-02-15",
  "description": "Website development - Phase 1"
}
```

**Response (201 Created):**
```json
{
  "id": "inv_abc123",
  "invoiceNumber": "INV-2026-001",
  "clientId": "cli_abc123",
  "amount": 2500.00,
  "currency": "USD",
  "dueDate": "2026-02-15",
  "status": "pending",
  "description": "Website development - Phase 1",
  "createdAt": "2026-02-06T10:00:00Z"
}
```

---

##### GET /invoices/:id
Get single invoice with full details.

**Response (200 OK):**
```json
{
  "id": "inv_abc123",
  "invoiceNumber": "INV-2026-001",
  "client": {
    "id": "cli_abc123",
    "companyName": "Acme Corp",
    "riskScore": 3
  },
  "amount": 2500.00,
  "currency": "USD",
  "dueDate": "2026-02-15",
  "status": "pending",
  "description": "Website development - Phase 1",
  "followUps": [
    {
      "id": "fu_abc123",
      "scheduledAt": "2026-02-12T09:00:00Z",
      "status": "scheduled",
      "template": "reminder_before"
    }
  ],
  "history": [
    {
      "action": "created",
      "timestamp": "2026-02-01T10:00:00Z"
    },
    {
      "action": "status_changed",
      "from": "draft",
      "to": "pending",
      "timestamp": "2026-02-01T10:05:00Z"
    }
  ],
  "createdAt": "2026-02-01T10:00:00Z",
  "updatedAt": "2026-02-01T10:05:00Z"
}
```

---

##### PATCH /invoices/:id
Update an invoice.

**Request:**
```json
{
  "amount": 2750.00,
  "dueDate": "2026-02-20"
}
```

---

##### POST /invoices/:id/mark-paid
Mark invoice as paid.

**Request:**
```json
{
  "paidDate": "2026-02-10",
  "paymentMethod": "bank_transfer",
  "notes": "Received via ACH"
}
```

**Response (200 OK):**
```json
{
  "id": "inv_abc123",
  "status": "paid",
  "paidDate": "2026-02-10",
  "daysToPayment": 10,
  "daysLate": 0
}
```

---

##### DELETE /invoices/:id
Delete an invoice.

**Response (204 No Content)**

---

#### Follow-up Endpoints

##### GET /follow-ups
List scheduled and sent follow-ups.

**Query Parameters:**
- `invoiceId`: Filter by invoice
- `status`: scheduled, sent, failed
- `startDate`, `endDate`: Date range

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "fu_abc123",
      "invoiceId": "inv_abc123",
      "clientEmail": "jane@acme.com",
      "subject": "Reminder: Invoice INV-2026-001",
      "scheduledAt": "2026-02-12T09:00:00Z",
      "sentAt": null,
      "status": "scheduled",
      "template": "reminder_before"
    }
  ]
}
```

---

##### POST /follow-ups/:id/send
Manually trigger a follow-up.

**Response (200 OK):**
```json
{
  "id": "fu_abc123",
  "status": "sent",
  "sentAt": "2026-02-06T11:30:00Z"
}
```

---

##### DELETE /follow-ups/:id
Cancel a scheduled follow-up.

**Response (204 No Content)**

---

#### Dashboard Endpoints

##### GET /dashboard
Get dashboard summary data.

**Response (200 OK):**
```json
{
  "outstanding": {
    "total": 45000.00,
    "count": 25,
    "currency": "USD"
  },
  "overdue": {
    "total": 12500.00,
    "count": 8,
    "oldestDays": 45
  },
  "atRisk": {
    "count": 5,
    "total": 8500.00
  },
  "recentPayments": [
    {
      "invoiceId": "inv_xyz789",
      "clientName": "Beta Inc",
      "amount": 3000.00,
      "paidDate": "2026-02-05"
    }
  ],
  "upcomingDueDates": [
    {
      "invoiceId": "inv_abc123",
      "clientName": "Acme Corp",
      "amount": 2500.00,
      "dueDate": "2026-02-15",
      "daysUntilDue": 9
    }
  ]
}
```

---

#### Settings Endpoints

##### GET /settings
Get user settings.

**Response (200 OK):**
```json
{
  "notifications": {
    "emailEnabled": true,
    "weeklyDigest": true,
    "paymentReceived": true,
    "invoiceOverdue": true
  },
  "followUpDefaults": {
    "schedule": [-3, 0, 3, 7, 14],
    "enabled": true
  },
  "templates": {
    "reminderBefore": {
      "subject": "Upcoming payment: {invoice_number}",
      "body": "..."
    }
  }
}
```

---

##### PATCH /settings
Update user settings.

**Request:**
```json
{
  "notifications": {
    "weeklyDigest": false
  }
}
```

---

## Data Models

### Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │────<│   Client    │────<│   Invoice   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Settings   │     │   Notes     │     │  FollowUp   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### User Model

```typescript
interface User {
  id: string;                    // Primary key (uuid)
  email: string;                 // Unique, required
  passwordHash: string | null;   // Null for OAuth users
  name: string;                  // Required
  profilePicture: string | null; // URL
  
  // OAuth
  googleId: string | null;       // Google OAuth ID
  
  // Subscription
  plan: 'free' | 'pro' | 'business';
  planExpiresAt: Date | null;
  stripeCustomerId: string | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  emailVerifiedAt: Date | null;
  deletedAt: Date | null;        // Soft delete
}
```

### Client Model

```typescript
interface Client {
  id: string;                    // Primary key (uuid)
  userId: string;                // Foreign key to User
  
  // Basic Info
  companyName: string;           // Required, max 200
  contactName: string | null;    // Optional, max 100
  contactEmail: string | null;   // Optional, validated
  phone: string | null;          // Optional
  website: string | null;        // Optional, validated URL
  
  // Classification
  industry: Industry;            // Enum
  companySize: CompanySize | null;
  
  // Notes
  notes: string | null;          // Max 10,000 chars
  
  // Computed (cached)
  riskScore: number;             // 1-10
  totalInvoices: number;
  paidOnTime: number;
  averageDaysToPayment: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;        // Soft delete
}

enum Industry {
  technology = 'technology',
  marketing = 'marketing',
  finance = 'finance',
  healthcare = 'healthcare',
  education = 'education',
  retail = 'retail',
  manufacturing = 'manufacturing',
  media = 'media',
  legal = 'legal',
  consulting = 'consulting',
  nonprofit = 'nonprofit',
  government = 'government',
  hospitality = 'hospitality',
  construction = 'construction',
  realestate = 'realestate',
  other = 'other'
}

enum CompanySize {
  solo = 'solo',           // 1 person
  small = 'small',         // 2-10
  medium = 'medium',       // 11-50
  large = 'large',         // 51-200
  enterprise = 'enterprise' // 200+
}
```

### Invoice Model

```typescript
interface Invoice {
  id: string;                    // Primary key (uuid)
  userId: string;                // Foreign key to User
  clientId: string;              // Foreign key to Client
  
  // Invoice Details
  invoiceNumber: string;         // Unique per user
  amount: number;                // Decimal, 2 places
  currency: string;              // ISO 4217 (default: USD)
  description: string | null;    // Optional
  
  // Dates
  issueDate: Date;               // When invoice created/sent
  dueDate: Date;                 // Payment due date
  paidDate: Date | null;         // When payment received
  
  // Status
  status: InvoiceStatus;
  
  // Computed
  daysLate: number | null;       // Calculated on payment
  
  // Follow-up Control
  followUpsEnabled: boolean;     // Default: true
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

enum InvoiceStatus {
  draft = 'draft',
  pending = 'pending',      // Sent, awaiting payment
  overdue = 'overdue',      // Past due date
  paid = 'paid'
}
```

### FollowUp Model

```typescript
interface FollowUp {
  id: string;                    // Primary key (uuid)
  invoiceId: string;             // Foreign key to Invoice
  
  // Email Details
  recipientEmail: string;
  subject: string;
  body: string;                  // HTML content
  
  // Scheduling
  scheduledAt: Date;             // When to send
  sentAt: Date | null;           // When actually sent
  
  // Status
  status: FollowUpStatus;
  errorMessage: string | null;   // If failed
  
  // Template Reference
  templateType: TemplateType;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

enum FollowUpStatus {
  scheduled = 'scheduled',
  sent = 'sent',
  failed = 'failed',
  cancelled = 'cancelled'
}

enum TemplateType {
  reminder_before = 'reminder_before',    // Before due date
  reminder_due = 'reminder_due',          // On due date
  reminder_after_1 = 'reminder_after_1',  // 3 days after
  reminder_after_2 = 'reminder_after_2',  // 7 days after
  final_notice = 'final_notice'           // 14 days after
}
```

### UserSettings Model

```typescript
interface UserSettings {
  id: string;                    // Primary key (uuid)
  userId: string;                // Foreign key to User (unique)
  
  // Notifications
  emailNotifications: boolean;   // Master toggle
  weeklyDigest: boolean;
  paymentReceivedNotify: boolean;
  invoiceOverdueNotify: boolean;
  
  // Follow-up Defaults
  followUpsEnabled: boolean;     // Default for new invoices
  followUpSchedule: number[];    // Days relative to due [-3,0,3,7,14]
  
  // Templates (JSON)
  emailTemplates: Record<TemplateType, EmailTemplate>;
  
  // Preferences
  timezone: string;              // IANA timezone
  currency: string;              // Default currency
  dateFormat: string;            // Date display format
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface EmailTemplate {
  subject: string;
  body: string;
  enabled: boolean;
}
```

### IndustryRisk Model

```typescript
interface IndustryRisk {
  id: string;                    // Primary key
  industry: Industry;            // Unique
  
  // Risk Data
  averageRiskScore: number;      // 1-10
  averageDaysToPayment: number;
  latePaymentRate: number;       // 0-1
  
  // Confidence
  sampleSize: number;            // Number of data points
  lastUpdated: Date;
  
  // Source
  source: string;                // Data source reference
}
```

### AuditLog Model

```typescript
interface AuditLog {
  id: string;                    // Primary key (uuid)
  userId: string;                // Who performed action
  
  // Event Details
  action: AuditAction;
  entityType: string;            // 'client', 'invoice', etc.
  entityId: string;
  
  // Change Details
  changes: Record<string, { old: any; new: any }>;
  
  // Context
  ipAddress: string | null;
  userAgent: string | null;
  
  // Timestamp
  createdAt: Date;
}

enum AuditAction {
  create = 'create',
  update = 'update',
  delete = 'delete',
  login = 'login',
  logout = 'logout',
  password_change = 'password_change'
}
```

---

## Integration Requirements

### Stripe Integration [Post-MVP]

**Purpose:** Import invoices and payment status from Stripe.

**Requirements:**
- OAuth connection to Stripe account
- Sync invoices from Stripe Invoices API
- Webhook handler for payment events
- Map Stripe invoice status to internal status
- Support for multiple Stripe accounts (Business tier)

**Data Mapping:**
| Stripe Field | Our Field |
|--------------|-----------|
| invoice.id | externalId |
| invoice.customer_email | client.contactEmail |
| invoice.amount_due | amount |
| invoice.due_date | dueDate |
| invoice.status | status (mapped) |

---

### QuickBooks Integration [Post-MVP]

**Purpose:** Import invoices and clients from QuickBooks.

**Requirements:**
- OAuth 2.0 connection to QuickBooks
- Sync customers as clients
- Sync invoices with payment status
- Bi-directional sync (optional)
- Handle QuickBooks-specific invoice fields

---

### Resend Email Integration [MVP]

**Purpose:** Send follow-up emails.

**Requirements:**
- Resend API integration
- Template rendering before send
- Delivery status tracking
- Bounce handling
- Unsubscribe link compliance

**API Usage:**
```typescript
// Example email send
await resend.emails.send({
  from: 'reminders@paymentpredictor.com',
  to: client.contactEmail,
  subject: 'Payment Reminder: Invoice #123',
  html: renderedTemplate
});
```

---

## Security Requirements

### SR-1: Authentication

- SR-1.1: All passwords hashed with bcrypt (cost 12)
- SR-1.2: JWT tokens signed with RS256
- SR-1.3: Refresh tokens stored securely
- SR-1.4: OAuth state parameter validated
- SR-1.5: CSRF protection on all state-changing endpoints

### SR-2: Authorization

- SR-2.1: Row-level security on all user data
- SR-2.2: API routes require valid session
- SR-2.3: Rate limiting: 100 requests/minute/user
- SR-2.4: Admin endpoints require admin role
- SR-2.5: Subscription checks on premium features

### SR-3: Data Protection

- SR-3.1: All data encrypted at rest (database-level)
- SR-3.2: TLS 1.3 for all connections
- SR-3.3: Sensitive fields (email, phone) encrypted application-level
- SR-3.4: API keys rotated annually
- SR-3.5: Secrets stored in environment, never in code

### SR-4: Compliance

- SR-4.1: GDPR: Right to access (data export)
- SR-4.2: GDPR: Right to erasure (account deletion)
- SR-4.3: GDPR: Data portability
- SR-4.4: Cookie consent for analytics
- SR-4.5: Privacy policy and ToS

---

## Appendix

### A. Industry Risk Defaults

| Industry | Default Risk Score | Average Days | Notes |
|----------|-------------------|--------------|-------|
| Technology | 4 | 32 | Generally pays well |
| Marketing | 5 | 38 | Variable |
| Finance | 3 | 25 | Usually prompt |
| Healthcare | 5 | 45 | Insurance delays |
| Education | 6 | 52 | Budget cycles |
| Retail | 6 | 40 | Cash flow variable |
| Manufacturing | 4 | 35 | Established processes |
| Media | 6 | 48 | Notorious for delays |
| Legal | 3 | 28 | Process-driven |
| Consulting | 4 | 32 | Corporate clients |
| Nonprofit | 7 | 55 | Grant timing issues |
| Government | 8 | 75 | Bureaucratic delays |
| Hospitality | 5 | 38 | Seasonal |
| Construction | 6 | 45 | Project-dependent |
| Real Estate | 4 | 30 | Transaction-based |
| Other | 5 | 35 | Default |

### B. Follow-up Email Templates

#### Template: reminder_before (3 days before due)

**Subject:** Upcoming payment: Invoice {invoice_number}

**Body:**
```
Hi {client_name},

This is a friendly reminder that invoice {invoice_number} for {amount} is due on {due_date}.

If you have any questions about this invoice, please let me know.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {amount}
- Due Date: {due_date}
- Description: {description}

Thank you for your business!

Best regards,
{user_name}
```

#### Template: reminder_due (on due date)

**Subject:** Payment due today: Invoice {invoice_number}

**Body:**
```
Hi {client_name},

Just a quick note that invoice {invoice_number} for {amount} is due today.

If you've already sent payment, please disregard this message. Otherwise, I'd appreciate if you could process this at your earliest convenience.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {amount}
- Due Date: {due_date}

Thank you!

Best regards,
{user_name}
```

#### Template: reminder_after_1 (3 days overdue)

**Subject:** Payment overdue: Invoice {invoice_number}

**Body:**
```
Hi {client_name},

I wanted to follow up on invoice {invoice_number} for {amount}, which was due on {due_date}.

If there are any issues with the invoice or payment, please let me know so we can resolve them.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {amount}
- Due Date: {due_date}
- Days Overdue: {days_overdue}

I appreciate your prompt attention to this matter.

Best regards,
{user_name}
```

#### Template: reminder_after_2 (7 days overdue)

**Subject:** Second reminder: Invoice {invoice_number} - {days_overdue} days overdue

**Body:**
```
Hi {client_name},

This is a follow-up regarding invoice {invoice_number} for {amount}, which is now {days_overdue} days overdue.

Please process this payment as soon as possible. If there are any concerns about the invoice, I'm happy to discuss.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {amount}
- Original Due Date: {due_date}
- Days Overdue: {days_overdue}

Thank you for your attention to this matter.

Best regards,
{user_name}
```

#### Template: final_notice (14 days overdue)

**Subject:** Final notice: Invoice {invoice_number} - Immediate attention required

**Body:**
```
Hi {client_name},

Invoice {invoice_number} for {amount} is now {days_overdue} days overdue. This requires your immediate attention.

If I don't receive payment or a response within the next 7 days, I may need to consider additional steps to collect this outstanding amount.

Please process this payment immediately or contact me to discuss the situation.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {amount}
- Original Due Date: {due_date}
- Days Overdue: {days_overdue}

I hope we can resolve this promptly.

Best regards,
{user_name}
```

### C. Risk Score Algorithm (MVP)

```typescript
function calculateRiskScore(client: Client): number {
  let score = 0;
  let totalWeight = 0;

  // Factor 1: Industry Risk (20%)
  const industryRisk = getIndustryRisk(client.industry);
  score += industryRisk.averageRiskScore * 0.2;
  totalWeight += 0.2;

  // Factor 2: Payment History (50%)
  if (client.totalInvoices > 0) {
    const onTimeRate = client.paidOnTime / client.totalInvoices;
    const historyScore = 10 - (onTimeRate * 9); // 10 = always late, 1 = always on time
    score += historyScore * 0.5;
    totalWeight += 0.5;
  } else {
    // No history, use industry default
    score += industryRisk.averageRiskScore * 0.5;
    totalWeight += 0.5;
  }

  // Factor 3: Recent Payment Behavior (20%)
  const recentInvoices = getRecentInvoices(client.id, 90); // Last 90 days
  if (recentInvoices.length > 0) {
    const recentOnTimeRate = recentInvoices.filter(i => i.daysLate <= 0).length / recentInvoices.length;
    const recentScore = 10 - (recentOnTimeRate * 9);
    score += recentScore * 0.2;
    totalWeight += 0.2;
  } else {
    score += 5 * 0.2; // Neutral if no recent data
    totalWeight += 0.2;
  }

  // Factor 4: Average Invoice Size (10%)
  const avgAmount = getAverageInvoiceAmount(client.id);
  // Higher amounts = slightly higher risk (more scrutiny)
  const sizeScore = Math.min(10, avgAmount / 1000); // $10k+ = max risk
  score += sizeScore * 0.1;
  totalWeight += 0.1;

  // Normalize to 1-10
  const normalizedScore = Math.round(score / totalWeight);
  return Math.max(1, Math.min(10, normalizedScore));
}
```

### D. Document Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Team | Initial draft |

---

*End of PRD*

