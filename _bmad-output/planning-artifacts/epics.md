# PaymentPredictor — Epics & Roadmap

**Version:** 1.0  
**Last Updated:** 2026-02-06  
**Author:** Product Team  
**Status:** Draft

---

## Table of Contents

1. [Overview](#overview)
2. [Epic 1: Client Risk Assessment](#epic-1-client-risk-assessment)
3. [Epic 2: Payment Tracking](#epic-2-payment-tracking)
4. [Epic 3: User Dashboard](#epic-3-user-dashboard)
5. [Epic 4: Notifications & Alerts](#epic-4-notifications--alerts)
6. [Epic 5: Settings & Configuration](#epic-5-settings--configuration)
7. [Epic 6: Integrations](#epic-6-integrations)
8. [Roadmap](#roadmap)

---

## Overview

### Epic Structure

Each epic is organized into:
- **Objective:** What we're trying to achieve
- **Success Metrics:** How we measure success
- **User Stories:** Detailed requirements
- **Technical Tasks:** Implementation details
- **Dependencies:** What needs to exist first
- **Risks:** Potential blockers

### Priority Framework

| Priority | Meaning | Timeline |
|----------|---------|----------|
| P0 | MVP Critical | Week 1-4 |
| P1 | MVP Important | Week 5-8 |
| P2 | Post-MVP | Week 9-12 |
| P3 | Future | Post-launch |

### Estimation Scale

| Points | Meaning | Rough Time |
|--------|---------|------------|
| 1 | Trivial | < 2 hours |
| 2 | Small | 2-4 hours |
| 3 | Medium | 1 day |
| 5 | Large | 2-3 days |
| 8 | Very Large | 1 week |
| 13 | Epic-sized | 2+ weeks |

---

## Epic 1: Client Risk Assessment

### Objective

Enable freelancers to understand the payment risk associated with each client, helping them make informed decisions about which projects to accept and how to manage payment expectations.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Users viewing risk scores | 80% of active users | Analytics event |
| Prediction accuracy | 70%+ correct | Historical validation |
| User trust in scores | 4/5 rating | Survey/feedback |
| Risk check before project | 30% of users | New client flow tracking |

### User Stories

#### US-E1-1: View Client Risk Score [P0]
**As a** freelancer  
**I want to** see a risk score for each client  
**So that** I know which clients are likely to pay late

**Acceptance Criteria:**
- Risk score displayed as number (1-10)
- Color-coded indicator (green/yellow/red)
- Score visible on client card and detail page
- Score updates when payment data changes
- Label shows "Low Risk," "Medium Risk," or "High Risk"

**Technical Tasks:**
- [ ] Create risk calculation algorithm
- [ ] Add risk_score column to clients table
- [ ] Create RiskBadge component
- [ ] Add risk score to client queries
- [ ] Implement score recalculation trigger

**Story Points:** 5  
**Sprint:** 1

---

#### US-E1-2: Risk Score Explanation [P0]
**As a** freelancer  
**I want to** understand why a client has a certain risk score  
**So that** I can contextualize the prediction

**Acceptance Criteria:**
- Factors shown with individual scores
- Weight of each factor displayed
- Plain language explanations
- Accessible via click/hover on score
- Shows improvement suggestions

**Technical Tasks:**
- [ ] Create factor calculation logic
- [ ] Store factors in database or compute on-demand
- [ ] Design factor breakdown UI
- [ ] Create explanation copy for each factor
- [ ] Add factor modal/popover component

**Story Points:** 3  
**Sprint:** 1

---

#### US-E1-3: Industry Risk Defaults [P0]
**As a** freelancer adding a new client  
**I want to** see an industry-based risk estimate  
**So that** I have a baseline even without payment history

**Acceptance Criteria:**
- Industry dropdown during client creation
- Risk score assigned based on industry selection
- Industry averages shown for context
- Defaults used until payment history exists
- At least 15 industry categories

**Technical Tasks:**
- [ ] Create industry_risks reference table
- [ ] Seed industry data from research
- [ ] Add industry field to client form
- [ ] Use industry default in score calculation
- [ ] Display industry context in explanation

**Story Points:** 3  
**Sprint:** 1

---

#### US-E1-4: Historical Payment Pattern Analysis [P1]
**As a** freelancer with existing client relationships  
**I want to** see payment patterns over time  
**So that** I can identify trends and changes

**Acceptance Criteria:**
- Payment timeline visualization
- Average days to payment calculated
- On-time vs late breakdown
- Trend indicator (improving/worsening)
- Comparison to initial score

**Technical Tasks:**
- [ ] Create payment history query
- [ ] Calculate trend metrics
- [ ] Design timeline component
- [ ] Add comparison logic
- [ ] Create trend indicator UI

**Story Points:** 5  
**Sprint:** 3

---

#### US-E1-5: Pre-Project Risk Check [P2]
**As a** freelancer evaluating a new opportunity  
**I want to** check a potential client's risk before accepting  
**So that** I can make informed decisions about new work

**Acceptance Criteria:**
- Quick check form for company name/industry
- Shows industry benchmark
- Flags known red flags (if any)
- Option to save as new client
- Works for clients not yet in system

**Technical Tasks:**
- [ ] Create quick check endpoint
- [ ] Build check form component
- [ ] Connect to industry data
- [ ] Design results display
- [ ] Add "Add as Client" flow

**Story Points:** 5  
**Sprint:** 5

---

#### US-E1-6: Risk Score Notifications [P2]
**As a** freelancer  
**I want to** be notified when a client's risk score changes significantly  
**So that** I stay informed about my client relationships

**Acceptance Criteria:**
- Notification when score increases by 2+ points
- Notification when score decreases by 2+ points
- In-app notification center
- Optional email notification
- Weekly summary of risk changes

**Technical Tasks:**
- [ ] Create score change detection
- [ ] Build notification system
- [ ] Design notification UI
- [ ] Create email templates
- [ ] Add notification preferences

**Story Points:** 5  
**Sprint:** 6

---

### Dependencies

- Database schema for clients and invoices
- User authentication system
- Basic UI component library

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Prediction accuracy too low | Medium | High | Start simple, iterate with data |
| Users don't trust scores | Medium | Medium | Explain factors transparently |
| Industry data incomplete | Low | Medium | Default to "other" with neutral score |

---

## Epic 2: Payment Tracking

### Objective

Provide a comprehensive system for tracking invoices through their lifecycle, from creation to payment, enabling users to maintain visibility into their accounts receivable.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Invoices tracked per user | 10+ average | Database count |
| Payment recording rate | 90%+ | Paid vs abandoned |
| Time to add invoice | <60 seconds | User timing |
| CSV import success rate | 95%+ | Import logs |

### User Stories

#### US-E2-1: Create Invoice [P0]
**As a** freelancer  
**I want to** add a new invoice to track  
**So that** I can monitor when payment is due

**Acceptance Criteria:**
- Select existing client from dropdown
- Enter amount (required)
- Select due date (required)
- Optional: invoice number, description
- Automatic invoice number if not provided
- Quick due date buttons (Net-15, Net-30, Net-60)

**Technical Tasks:**
- [ ] Create invoice form component
- [ ] Implement form validation (Zod)
- [ ] Create invoice server action
- [ ] Add invoice to database
- [ ] Generate invoice numbers

**Story Points:** 3  
**Sprint:** 1

---

#### US-E2-2: View Invoice List [P0]
**As a** freelancer  
**I want to** see all my invoices in a list  
**So that** I can track their status at a glance

**Acceptance Criteria:**
- Table with sortable columns
- Columns: Invoice #, Client, Amount, Due Date, Status
- Color-coded status badges
- Search by client or invoice number
- Filter by status (All, Pending, Overdue, Paid)
- Pagination for large lists

**Technical Tasks:**
- [ ] Create InvoiceTable component
- [ ] Implement server-side pagination
- [ ] Add sorting functionality
- [ ] Create status filter
- [ ] Add search functionality

**Story Points:** 5  
**Sprint:** 2

---

#### US-E2-3: Invoice Detail View [P0]
**As a** freelancer  
**I want to** view complete details of an invoice  
**So that** I can see all information and take actions

**Acceptance Criteria:**
- Full invoice information displayed
- Client info with link to client page
- Status timeline showing history
- Follow-up schedule shown
- Actions: Edit, Mark Paid, Delete

**Technical Tasks:**
- [ ] Create invoice detail page
- [ ] Build status timeline component
- [ ] Connect follow-up schedule
- [ ] Add action buttons
- [ ] Create client link

**Story Points:** 3  
**Sprint:** 2

---

#### US-E2-4: Mark Invoice as Paid [P0]
**As a** freelancer  
**I want to** mark an invoice as paid when I receive payment  
**So that** the invoice is no longer tracked as outstanding

**Acceptance Criteria:**
- "Mark as Paid" button on invoice
- Payment date selection (defaults to today)
- Optional payment notes
- Status updates to "Paid"
- Days late calculated automatically
- Celebratory confirmation

**Technical Tasks:**
- [ ] Create payment modal component
- [ ] Implement mark-paid server action
- [ ] Calculate days late
- [ ] Update client statistics
- [ ] Add celebration animation

**Story Points:** 3  
**Sprint:** 2

---

#### US-E2-5: Edit Invoice [P0]
**As a** freelancer  
**I want to** edit invoice details after creation  
**So that** I can correct mistakes

**Acceptance Criteria:**
- Can edit amount, due date, description
- Cannot change client after creation
- Cannot edit paid invoices
- Changes logged in audit trail
- Validation same as creation

**Technical Tasks:**
- [ ] Create edit form (prefilled)
- [ ] Implement update server action
- [ ] Add edit restrictions
- [ ] Create audit log entry
- [ ] Add validation

**Story Points:** 2  
**Sprint:** 2

---

#### US-E2-6: Delete Invoice [P0]
**As a** freelancer  
**I want to** delete an invoice that was created by mistake  
**So that** my records stay accurate

**Acceptance Criteria:**
- Delete button with confirmation
- Warning for paid invoices (affects history)
- Soft delete (recoverable by admin)
- Invoice removed from list
- Logged in audit trail

**Technical Tasks:**
- [ ] Create delete confirmation dialog
- [ ] Implement soft delete
- [ ] Add deletion warning for paid
- [ ] Update list after delete
- [ ] Log deletion

**Story Points:** 2  
**Sprint:** 2

---

#### US-E2-7: Automatic Status Updates [P0]
**As a** freelancer  
**I want to** invoices to automatically become "overdue"  
**So that** I don't have to update status manually

**Acceptance Criteria:**
- Invoice status changes to "Overdue" on due date
- Status updates during daily background job
- Or on page load if past due date
- Follow-up schedule activates automatically

**Technical Tasks:**
- [ ] Create status update job
- [ ] Implement on-load status check
- [ ] Configure scheduled job
- [ ] Trigger follow-up activation

**Story Points:** 3  
**Sprint:** 3

---

#### US-E2-8: CSV Import [P1]
**As a** freelancer with existing invoices  
**I want to** import invoices from a CSV file  
**So that** I can bulk-add historical data

**Acceptance Criteria:**
- Download template CSV
- Upload completed CSV
- Preview before import
- Validation with error details
- Map to existing clients or create new
- Success/failure report

**Technical Tasks:**
- [ ] Create CSV template
- [ ] Build upload interface
- [ ] Implement CSV parser
- [ ] Add validation logic
- [ ] Create preview display
- [ ] Batch insert invoices

**Story Points:** 8  
**Sprint:** 4

---

#### US-E2-9: Recurring Invoice [P3]
**As a** freelancer with retainer clients  
**I want to** set up recurring invoice tracking  
**So that** monthly invoices are auto-created

**Acceptance Criteria:**
- Mark invoice as recurring
- Set frequency (weekly, monthly)
- Auto-create on schedule
- Notification when created
- Easy modification or cancellation

**Technical Tasks:**
- [ ] Add recurring fields to schema
- [ ] Create recurring invoice job
- [ ] Build recurrence settings UI
- [ ] Implement notification
- [ ] Add management interface

**Story Points:** 8  
**Sprint:** 8+

---

### Dependencies

- Client management (Epic 1)
- Database schema
- Authentication

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Users abandon during import | Medium | Medium | Make import optional, manual OK |
| Complex invoice structures | Low | Medium | Keep MVP simple, iterate |

---

## Epic 3: User Dashboard

### Objective

Provide users with an at-a-glance overview of their payment situation, highlighting urgent items and celebrating wins, enabling quick daily check-ins.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily dashboard visits | 50% of active users | Page views |
| Time on dashboard | <30 seconds average | Analytics |
| Actions from dashboard | 30% of visits | Click tracking |
| User satisfaction | 4/5 rating | NPS survey |

### User Stories

#### US-E3-1: Dashboard Layout [P0]
**As a** freelancer  
**I want to** see an organized dashboard when I log in  
**So that** I can quickly understand my situation

**Acceptance Criteria:**
- Clean, organized layout
- Key metrics prominently displayed
- Actionable items clearly visible
- Responsive on all devices
- Loads quickly (<2 seconds)

**Technical Tasks:**
- [ ] Design dashboard layout
- [ ] Create dashboard page
- [ ] Implement responsive grid
- [ ] Add loading states
- [ ] Optimize query performance

**Story Points:** 3  
**Sprint:** 3

---

#### US-E3-2: Outstanding Summary Cards [P0]
**As a** freelancer  
**I want to** see summary cards for outstanding/overdue invoices  
**So that** I know my current financial situation

**Acceptance Criteria:**
- Outstanding total card
- Overdue total card with alert styling
- At-risk count card
- Click to view filtered list
- Real-time updates

**Technical Tasks:**
- [ ] Create MetricCard component
- [ ] Build dashboard data query
- [ ] Add click navigation
- [ ] Implement alert styling
- [ ] Add refresh functionality

**Story Points:** 3  
**Sprint:** 3

---

#### US-E3-3: Upcoming Due Dates [P0]
**As a** freelancer  
**I want to** see invoices due in the next 7 days  
**So that** I can prepare for follow-ups

**Acceptance Criteria:**
- List of upcoming invoices
- Shows client, amount, due date
- Risk indicator for each
- Quick action: Send Reminder
- Sorted by due date

**Technical Tasks:**
- [ ] Create upcoming invoices query
- [ ] Build upcoming list component
- [ ] Add quick actions
- [ ] Include risk indicators
- [ ] Implement sorting

**Story Points:** 3  
**Sprint:** 3

---

#### US-E3-4: At-Risk Invoices Alert [P1]
**As a** freelancer  
**I want to** see invoices with high-risk clients highlighted  
**So that** I can take proactive action

**Acceptance Criteria:**
- Shows invoices where client risk ≥7
- Explains why invoice is at-risk
- Suggests action (early reminder)
- Links to client detail
- Dismissible (per session)

**Technical Tasks:**
- [ ] Create at-risk query logic
- [ ] Build alert component
- [ ] Add explanation text
- [ ] Create action buttons
- [ ] Implement dismiss logic

**Story Points:** 3  
**Sprint:** 4

---

#### US-E3-5: Recent Payments [P1]
**As a** freelancer  
**I want to** see recently received payments  
**So that** I feel positive about my progress

**Acceptance Criteria:**
- List of last 5 payments
- Shows client, amount, date
- On-time indicator
- Links to invoice detail
- Celebratory styling

**Technical Tasks:**
- [ ] Create recent payments query
- [ ] Build payment list component
- [ ] Add celebratory styling
- [ ] Include on-time badge
- [ ] Add invoice links

**Story Points:** 2  
**Sprint:** 4

---

#### US-E3-6: Activity Feed [P2]
**As a** freelancer  
**I want to** see recent activity on my account  
**So that** I know what's happening

**Acceptance Criteria:**
- Shows recent actions (invoices added, reminders sent, payments)
- Timestamps for each
- Links to relevant items
- Scrollable list
- Limited to last 20 items

**Technical Tasks:**
- [ ] Create activity log query
- [ ] Build activity feed component
- [ ] Add activity icons
- [ ] Implement scroll/pagination
- [ ] Create activity links

**Story Points:** 3  
**Sprint:** 5

---

#### US-E3-7: Quick Add Actions [P1]
**As a** freelancer  
**I want to** quickly add invoices or clients from the dashboard  
**So that** I don't have to navigate away

**Acceptance Criteria:**
- "+" button in header
- Dropdown: Add Invoice, Add Client
- Opens modal form
- Returns to dashboard after save
- Keyboard shortcut (optional)

**Technical Tasks:**
- [ ] Create quick add dropdown
- [ ] Build modal forms
- [ ] Implement return-to-dashboard
- [ ] Add keyboard shortcuts
- [ ] Handle form submission

**Story Points:** 3  
**Sprint:** 4

---

### Dependencies

- Invoice tracking (Epic 2)
- Client management (Epic 1)
- UI component library

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Dashboard too cluttered | Medium | Medium | User testing, iterate |
| Slow load times | Low | High | Optimize queries, cache |

---

## Epic 4: Notifications & Alerts

### Objective

Keep users informed about important events through automated follow-up emails to clients and notifications to users, reducing the need for manual check-ins.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Follow-up emails sent | 1,000+/month | Email logs |
| Email delivery rate | 98%+ | Resend analytics |
| User opens weekly digest | 40%+ | Email tracking |
| Reduction in late payments | 30%+ | Before/after analysis |

### User Stories

#### US-E4-1: Automated Follow-up Emails [P0]
**As a** freelancer  
**I want to** automatic payment reminders sent to clients  
**So that** I don't have to chase payments manually

**Acceptance Criteria:**
- Emails sent at configured times
- Professional, customizable templates
- Includes invoice details
- Pauses when payment received
- Logs all sent emails

**Technical Tasks:**
- [ ] Create email templates (React Email)
- [ ] Build follow-up scheduler
- [ ] Implement background job
- [ ] Add email logging
- [ ] Create pause logic

**Story Points:** 8  
**Sprint:** 3-4

---

#### US-E4-2: Default Follow-up Schedule [P0]
**As a** freelancer  
**I want to** a sensible default reminder schedule  
**So that** follow-ups work out of the box

**Acceptance Criteria:**
- Default: -3, 0, +3, +7, +14 days
- Each timing has appropriate template
- Schedule visible when creating invoice
- Can be overridden per invoice
- Defaults can be changed in settings

**Technical Tasks:**
- [ ] Define default schedule constant
- [ ] Create 5 default templates
- [ ] Build schedule display
- [ ] Add per-invoice override
- [ ] Connect to settings

**Story Points:** 3  
**Sprint:** 3

---

#### US-E4-3: Custom Email Templates [P1]
**As a** freelancer  
**I want to** customize reminder email content  
**So that** it matches my brand and tone

**Acceptance Criteria:**
- Edit subject line and body
- Variable placeholders supported
- Preview before saving
- Reset to default option
- Separate template per timing

**Technical Tasks:**
- [ ] Create template editor UI
- [ ] Implement variable system
- [ ] Build preview functionality
- [ ] Add reset button
- [ ] Save to user settings

**Story Points:** 5  
**Sprint:** 4

---

#### US-E4-4: Manual Email Trigger [P1]
**As a** freelancer  
**I want to** manually send a reminder email  
**So that** I can intervene when needed

**Acceptance Criteria:**
- "Send Reminder" button on invoice
- Select template or write custom
- Preview before sending
- Logs to follow-up history
- Confirmation after send

**Technical Tasks:**
- [ ] Create send reminder modal
- [ ] Add template selection
- [ ] Implement preview
- [ ] Send via Resend
- [ ] Log to database

**Story Points:** 3  
**Sprint:** 4

---

#### US-E4-5: Follow-up History [P1]
**As a** freelancer  
**I want to** see all reminder emails sent for an invoice  
**So that** I know what communication has occurred

**Acceptance Criteria:**
- List of all follow-ups for invoice
- Shows date, subject, status
- Status: scheduled, sent, failed
- Can view full email content
- Can cancel scheduled

**Technical Tasks:**
- [ ] Create follow-up list query
- [ ] Build history display
- [ ] Add view content modal
- [ ] Implement cancel action
- [ ] Show status badges

**Story Points:** 3  
**Sprint:** 4

---

#### US-E4-6: Weekly Digest Email [P1]
**As a** freelancer  
**I want to** receive a weekly summary email  
**So that** I stay informed without logging in

**Acceptance Criteria:**
- Sent every Monday at 9am user time
- Summarizes: outstanding, overdue, at-risk, paid
- Links to platform
- Unsubscribe option
- Customizable in settings

**Technical Tasks:**
- [ ] Create digest email template
- [ ] Build weekly job
- [ ] Calculate summary stats
- [ ] Add unsubscribe handling
- [ ] Implement timezone logic

**Story Points:** 5  
**Sprint:** 5

---

#### US-E4-7: Invoice Overdue Alert [P2]
**As a** freelancer  
**I want to** be notified when an invoice becomes overdue  
**So that** I can take immediate action

**Acceptance Criteria:**
- Email sent when invoice passes due date
- Shows invoice details
- Links to invoice in platform
- Optional (configurable)
- Doesn't duplicate if already aware

**Technical Tasks:**
- [ ] Create overdue notification
- [ ] Add to overdue status job
- [ ] Design email template
- [ ] Add settings toggle
- [ ] Implement deduplication

**Story Points:** 3  
**Sprint:** 5

---

#### US-E4-8: Payment Received Notification [P2]
**As a** freelancer  
**I want to** be notified when I mark a payment received  
**So that** I have a confirmation record

**Acceptance Criteria:**
- Email sent on payment recording
- Shows invoice and payment details
- Includes client info
- Optional (configurable)
- Works with integrations too

**Technical Tasks:**
- [ ] Create payment notification
- [ ] Trigger on mark-paid action
- [ ] Design email template
- [ ] Add settings toggle
- [ ] Connect to integrations

**Story Points:** 2  
**Sprint:** 5

---

### Dependencies

- Invoice tracking (Epic 2)
- Background jobs (Inngest)
- Email service (Resend)

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Emails going to spam | Medium | High | Use reputable provider, monitor |
| Over-notification fatigue | Low | Medium | Sensible defaults, easy disable |
| Background job failures | Low | High | Retry logic, monitoring |

---

## Epic 5: Settings & Configuration

### Objective

Enable users to customize their experience, manage their account, and control how the platform behaves according to their preferences.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Settings visits | 20% of users | Page views |
| Settings changes made | 50%+ of visitors | Action tracking |
| Support tickets reduced | 20% | Support metrics |

### User Stories

#### US-E5-1: Profile Settings [P0]
**As a** user  
**I want to** update my profile information  
**So that** my account reflects accurate details

**Acceptance Criteria:**
- Update name
- Update profile picture
- Change email (with verification)
- View current plan
- See account created date

**Technical Tasks:**
- [ ] Create profile settings page
- [ ] Implement profile update
- [ ] Add email change flow
- [ ] Display plan info
- [ ] Handle avatar upload

**Story Points:** 3  
**Sprint:** 4

---

#### US-E5-2: Password Management [P0]
**As a** user  
**I want to** change my password  
**So that** I can maintain account security

**Acceptance Criteria:**
- Requires current password
- New password validation
- Confirmation field
- Success notification
- Sessions maintained

**Technical Tasks:**
- [ ] Create password form
- [ ] Validate current password
- [ ] Hash new password
- [ ] Show success message
- [ ] Log password change

**Story Points:** 2  
**Sprint:** 4

---

#### US-E5-3: Notification Preferences [P0]
**As a** user  
**I want to** control which notifications I receive  
**So that** I'm not overwhelmed with emails

**Acceptance Criteria:**
- Toggle email notifications (master)
- Toggle weekly digest
- Toggle payment received alerts
- Toggle overdue alerts
- Changes take effect immediately

**Technical Tasks:**
- [ ] Create notification settings UI
- [ ] Update user_settings table
- [ ] Connect to email logic
- [ ] Add toggle components
- [ ] Show save confirmation

**Story Points:** 2  
**Sprint:** 4

---

#### US-E5-4: Follow-up Settings [P1]
**As a** freelancer  
**I want to** configure default follow-up behavior  
**So that** new invoices use my preferred schedule

**Acceptance Criteria:**
- Set default schedule (days)
- Enable/disable follow-ups globally
- Configure template for each stage
- Preview schedule
- Apply to new invoices only

**Technical Tasks:**
- [ ] Create follow-up settings page
- [ ] Build schedule editor
- [ ] Connect to template editor
- [ ] Add preview display
- [ ] Save to user_settings

**Story Points:** 5  
**Sprint:** 5

---

#### US-E5-5: Account Deletion [P0]
**As a** user  
**I want to** delete my account and data  
**So that** I can remove my information

**Acceptance Criteria:**
- Delete option in settings
- Requires typing "DELETE" to confirm
- Shows what will be deleted
- 30-day retention period mentioned
- Confirmation email sent

**Technical Tasks:**
- [ ] Create delete account flow
- [ ] Implement confirmation dialog
- [ ] Set up soft delete
- [ ] Schedule hard delete job
- [ ] Send confirmation email

**Story Points:** 3  
**Sprint:** 5

---

#### US-E5-6: Billing & Subscription [P2]
**As a** paying user  
**I want to** manage my subscription  
**So that** I can upgrade, downgrade, or cancel

**Acceptance Criteria:**
- View current plan
- See plan features
- Upgrade/downgrade option
- Cancel subscription option
- View billing history

**Technical Tasks:**
- [ ] Create billing page
- [ ] Integrate Stripe portal
- [ ] Show plan comparison
- [ ] Implement upgrade flow
- [ ] Add invoice history

**Story Points:** 5  
**Sprint:** 6

---

#### US-E5-7: Data Export [P2]
**As a** user  
**I want to** export my data  
**So that** I have a backup or can analyze it

**Acceptance Criteria:**
- Export clients to CSV
- Export invoices to CSV
- Export follow-up history
- Download as ZIP
- Takes reasonable time

**Technical Tasks:**
- [ ] Create export endpoint
- [ ] Build CSV generators
- [ ] Zip file creation
- [ ] Add download trigger
- [ ] Handle large datasets

**Story Points:** 5  
**Sprint:** 6

---

### Dependencies

- User authentication
- Database schema
- Stripe integration (for billing)

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Complex settings UI | Low | Medium | Start simple, iterate |
| GDPR compliance | Low | High | Implement properly from start |

---

## Epic 6: Integrations

### Objective

Connect PaymentPredictor with existing tools to reduce data entry, improve accuracy, and fit into users' existing workflows.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Integration adoption | 30% of users | Connection count |
| Data sync accuracy | 99%+ | Sync logs |
| Time saved | 5+ hours/month | User survey |
| Integration satisfaction | 4/5 | Feedback |

### User Stories

#### US-E6-1: Stripe Connection [P2]
**As a** freelancer using Stripe  
**I want to** import invoices from Stripe  
**So that** I don't have to manually add them

**Acceptance Criteria:**
- OAuth connection to Stripe
- Import existing invoices
- Sync new invoices automatically
- Track payment status
- Disconnect option

**Technical Tasks:**
- [ ] Implement Stripe OAuth
- [ ] Build invoice sync logic
- [ ] Create webhook handlers
- [ ] Add connection UI
- [ ] Implement disconnect

**Story Points:** 13  
**Sprint:** 7-8

---

#### US-E6-2: QuickBooks Connection [P2]
**As a** freelancer using QuickBooks  
**I want to** sync invoices from QuickBooks  
**So that** PaymentPredictor reflects my accounting

**Acceptance Criteria:**
- OAuth connection to QuickBooks
- Import customers as clients
- Import invoices
- Track payment status
- Bi-directional sync (optional)

**Technical Tasks:**
- [ ] Implement QuickBooks OAuth
- [ ] Build customer sync
- [ ] Create invoice sync
- [ ] Add payment webhook
- [ ] Build settings UI

**Story Points:** 13  
**Sprint:** 8-9

---

#### US-E6-3: Zapier Integration [P3]
**As a** power user  
**I want to** connect PaymentPredictor via Zapier  
**So that** I can build custom automations

**Acceptance Criteria:**
- Zapier triggers: Invoice created, Payment received, etc.
- Zapier actions: Create invoice, Mark paid
- API key authentication
- Documentation provided

**Technical Tasks:**
- [ ] Build Zapier app
- [ ] Create trigger endpoints
- [ ] Create action endpoints
- [ ] Write documentation
- [ ] Submit to Zapier

**Story Points:** 8  
**Sprint:** 10+

---

#### US-E6-4: API Access [P3]
**As a** developer user  
**I want to** access my data via API  
**So that** I can build custom tools

**Acceptance Criteria:**
- RESTful API endpoints
- API key authentication
- Rate limiting
- Documentation (OpenAPI)
- Available on Business tier

**Technical Tasks:**
- [ ] Create API key system
- [ ] Build public endpoints
- [ ] Add rate limiting
- [ ] Generate OpenAPI docs
- [ ] Add tier check

**Story Points:** 8  
**Sprint:** 10+

---

### Dependencies

- Core features complete
- Authentication system
- Background jobs

### Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API changes from providers | Medium | Medium | Abstract integration layer |
| OAuth complexity | Medium | Medium | Use established libraries |
| Sync conflicts | Low | Medium | Clear conflict resolution |

---

## Roadmap

### MVP Timeline (Weeks 1-12)

```
Week 1-2:  [====================] Project Setup & Auth
Week 3-4:  [====================] Client Management (E1)
Week 5-6:  [====================] Invoice Tracking (E2)
Week 7-8:  [====================] Dashboard (E3) + Follow-ups (E4)
Week 9-10: [====================] Settings (E5) + Polish
Week 11-12:[====================] Testing + Soft Launch
```

### Sprint Breakdown

| Sprint | Duration | Focus | Key Deliverables |
|--------|----------|-------|------------------|
| 0 | 1 week | Setup | Repo, CI/CD, DB, Auth |
| 1 | 2 weeks | Core | Clients, Risk Scores |
| 2 | 2 weeks | Invoices | CRUD, Status |
| 3 | 2 weeks | Dashboard | Overview, Widgets |
| 4 | 2 weeks | Follow-ups | Email System |
| 5 | 2 weeks | Settings | Preferences, Polish |
| 6 | 2 weeks | Launch | Testing, Deploy |

### Post-MVP Roadmap

| Quarter | Focus | Key Features |
|---------|-------|--------------|
| Q2 2026 | Integrations | Stripe, QuickBooks |
| Q3 2026 | Growth | Mobile App, Team Features |
| Q4 2026 | Intelligence | ML Predictions, Benchmarks |

### Success Milestones

| Milestone | Target Date | Criteria |
|-----------|-------------|----------|
| MVP Launch | April 2026 | 100 beta users |
| Product-Market Fit | July 2026 | 500 paying users |
| Scale | Dec 2026 | 2,000 paying users |

---

*End of Epics Document*

