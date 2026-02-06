# PaymentPredictor — UX Design Document

**Version:** 1.0  
**Last Updated:** 2026-02-06  
**Author:** Design Team  
**Status:** Draft

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [User Flows](#user-flows)
3. [Information Architecture](#information-architecture)
4. [Wireframe Descriptions](#wireframe-descriptions)
5. [Component Inventory](#component-inventory)
6. [Mobile Considerations](#mobile-considerations)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Design Tokens](#design-tokens)

---

## Design Principles

### Core Principles

PaymentPredictor's design philosophy centers on making financial management feel empowering rather than stressful. Every design decision should support these principles:

#### 1. Clarity Over Cleverness

**What it means:**
- Every screen should have an obvious primary action
- Data is presented in plain language, not jargon
- Visual hierarchy guides users to what matters most

**Examples:**
- Dashboard shows "You have $12,500 overdue" not "Outstanding AR: $12.5k"
- Risk scores use color-coded labels (Low, Medium, High) alongside numbers
- Follow-up emails show exact send date, not "in 3 days"

#### 2. Calm Financial UX

**What it means:**
- Reduce anxiety around financial data
- Celebrate wins (payments received)
- Frame problems as solvable, not alarming

**Examples:**
- Green confetti animation when invoice marked paid
- "At-risk" invoices framed as "needs attention" not "warning: danger"
- Weekly digest leads with positive metrics first

#### 3. Speed to Value

**What it means:**
- Users should see benefit within first session
- Minimize steps to core actions
- Progressive disclosure of advanced features

**Examples:**
- First client + invoice can be added in <2 minutes
- Risk score visible immediately based on industry defaults
- Templates pre-configured, customization optional

#### 4. Trust Through Transparency

**What it means:**
- Explain predictions, don't just show numbers
- Show users what the system is doing
- No hidden actions or confusing automation

**Examples:**
- Risk score shows contributing factors
- Email preview before any automated send
- Activity log visible for all actions

---

## User Flows

### Flow 1: New User Onboarding

**Goal:** Get user from signup to first value (seeing a risk prediction) in under 5 minutes.

```
┌─────────────────────────────────────────────────────────────────┐
│                         ONBOARDING FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Landing │───▶│  Signup  │───▶│  Welcome │───▶│  Add     │  │
│  │   Page   │    │   Form   │    │  Screen  │    │  Client  │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                        │        │
│                                                        ▼        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  First   │◀───│  View    │◀───│   Add    │◀───│  See     │  │
│  │Dashboard │    │  Client  │    │ Invoice  │    │Risk Score│  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-Step:**

1. **Landing Page** (0:00)
   - Hero: "Know which clients will pay late. Before you invoice them."
   - CTA: "Start Free" (prominent), "See Demo" (secondary)
   - Social proof: testimonials, stats

2. **Signup Form** (0:30)
   - Email + Password, or Google OAuth
   - Name field
   - No credit card required messaging
   - Privacy policy link

3. **Welcome Screen** (1:00)
   - Personalized greeting
   - Brief value proposition recap
   - Single CTA: "Add Your First Client"
   - Skip option (goes to empty dashboard)

4. **Add First Client** (1:30)
   - Minimal form: Company name + Industry (required)
   - Optional: Contact name, email
   - After save: Immediately show risk score

5. **See Risk Score** (2:30)
   - Celebratory moment: "Your first client is set up!"
   - Show industry-default risk score
   - Explain: "Based on [Industry] average payment patterns"
   - CTA: "Add Your First Invoice"

6. **Add First Invoice** (3:30)
   - Pre-selected client
   - Amount + Due Date (required)
   - Invoice number (optional, auto-generated)
   - After save: Show follow-up schedule preview

7. **First Dashboard View** (4:30)
   - Invoice visible in outstanding section
   - Upcoming due dates shown
   - Next follow-up date visible
   - Celebration message: "You're all set!"

**Success Metrics:**
- 60%+ complete onboarding flow
- <5 min time to first invoice
- 50%+ return within 48 hours

---

### Flow 2: Daily Dashboard Check

**Goal:** User quickly understands their payment status and takes necessary actions.

```
┌─────────────────────────────────────────────────────────────────┐
│                      DAILY CHECK FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐                                  │
│  │  Login   │───▶│ Dashboard│─────┬─────────┬─────────┐        │
│  │          │    │ Overview │     │         │         │        │
│  └──────────┘    └──────────┘     ▼         ▼         ▼        │
│                              ┌────────┐ ┌────────┐ ┌────────┐  │
│                              │ View   │ │ View   │ │  Mark  │  │
│                              │Overdue │ │At-Risk │ │  Paid  │  │
│                              └────────┘ └────────┘ └────────┘  │
│                                   │         │         │        │
│                                   ▼         ▼         ▼        │
│                              ┌────────┐ ┌────────┐ ┌────────┐  │
│                              │ Send   │ │ Send   │ │ Update │  │
│                              │Reminder│ │ Early  │ │ Stats  │  │
│                              └────────┘ │Reminder│ └────────┘  │
│                                         └────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-Step:**

1. **Dashboard Load** (<2 sec)
   - Key metrics immediately visible
   - Most important info "above the fold"
   - No loading spinners on critical data

2. **Scan Overview** (5 sec)
   - Total outstanding amount (big, prominent)
   - Overdue count with alert badge
   - At-risk count with warning indicator
   - Recent payments (positive reinforcement)

3. **Review Overdue** (if any)
   - Click overdue section
   - See list sorted by most overdue first
   - Each item shows: client, amount, days overdue
   - One-click action: "Send Reminder"

4. **Check At-Risk** (if any)
   - Click at-risk section
   - See invoices nearing due with high-risk clients
   - Explanation: "This client has 40% on-time rate"
   - Suggested action: "Send early reminder"

5. **Mark Payments Received**
   - Quick-action from dashboard if payment received
   - Enter payment date
   - Celebration animation
   - Stats update immediately

**Dashboard Layout (Visual Description):**

```
┌─────────────────────────────────────────────────────────────┐
│  PaymentPredictor                    [Search] [?] [Avatar] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ OUTSTANDING     │  │ OVERDUE ⚠️      │  │ AT-RISK     │ │
│  │                 │  │                 │  │             │ │
│  │    $45,000      │  │    $12,500      │  │   5 invoices│ │
│  │    25 invoices  │  │    8 invoices   │  │   $8,500    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ UPCOMING DUE DATES                                      ││
│  │ ┌──────────────────────────────────────────────────────┐││
│  │ │ Acme Corp        $2,500    Due: Feb 15    [Remind]  │││
│  │ ├──────────────────────────────────────────────────────┤││
│  │ │ Beta Inc         $3,000    Due: Feb 18    [Remind]  │││
│  │ ├──────────────────────────────────────────────────────┤││
│  │ │ Gamma LLC        $1,800    Due: Feb 20    [Remind]  │││
│  │ └──────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ RECENT PAYMENTS 🎉                                      ││
│  │ ┌──────────────────────────────────────────────────────┐││
│  │ │ Delta Corp paid $5,000                    Yesterday ││││
│  │ │ Epsilon Inc paid $2,200                   Feb 4     │││
│  │ └──────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Flow 3: Add New Invoice

**Goal:** Add invoice in <60 seconds with minimal friction.

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADD INVOICE FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Click   │───▶│  Select  │───▶│  Enter   │───▶│  Review  │  │
│  │  + Add   │    │  Client  │    │  Details │    │ & Submit │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                       │                               │        │
│                       ▼                               ▼        │
│                  ┌──────────┐                   ┌──────────┐   │
│                  │ Or: Add  │                   │ See Risk │   │
│                  │New Client│                   │ + Follow │   │
│                  └──────────┘                   │   Ups    │   │
│                                                 └──────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Form Design:**

```
┌─────────────────────────────────────────────────────────────┐
│  Add Invoice                                          [X]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Client *                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [▼] Select a client...                              │   │
│  └─────────────────────────────────────────────────────┘   │
│  + Add new client                                          │
│                                                             │
│  ┌─────────────────────┐  ┌───────────────────────────┐    │
│  │ Amount *            │  │ Currency                  │    │
│  │ ┌─────────────────┐ │  │ ┌───────────────────────┐ │    │
│  │ │ $               │ │  │ │ USD ▼                 │ │    │
│  │ └─────────────────┘ │  │ └───────────────────────┘ │    │
│  └─────────────────────┘  └───────────────────────────┘    │
│                                                             │
│  Due Date *                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📅 Select date...                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│  Quick select: [Net-15] [Net-30] [Net-60]                  │
│                                                             │
│  Invoice Number (optional)                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ INV-2026-001                                        │   │
│  └─────────────────────────────────────────────────────┘   │
│  Auto-generated if left blank                              │
│                                                             │
│  Description (optional)                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Website development - Phase 1                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📧 Automated follow-ups: [✓] Enabled                      │
│  Schedule: 3 days before, day of, +3, +7, +14              │
│  [Customize]                                               │
│                                                             │
│                              [Cancel]  [Save Invoice ▶]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**After Save Confirmation:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         ✓                                   │
│                                                             │
│              Invoice Added Successfully!                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Acme Corp          Risk Score: 🟡 5                 │   │
│  │ $2,500             Due: February 15, 2026           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📧 Follow-ups scheduled:                                  │
│     Feb 12 - Friendly reminder                             │
│     Feb 15 - Due date reminder                             │
│     Feb 18 - First follow-up                               │
│     ...                                                    │
│                                                             │
│          [View Invoice]  [Add Another]  [Done]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Flow 4: Mark Invoice as Paid

**Goal:** Record payment in <15 seconds with celebration.

```
┌─────────────────────────────────────────────────────────────────┐
│                       MARK PAID FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Find    │───▶│  Click   │───▶│  Enter   │───▶│ Celebrate│  │
│  │ Invoice  │    │ Mark Paid│    │   Date   │    │    !     │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                        │        │
│                                                        ▼        │
│                                                  ┌──────────┐   │
│                                                  │  Stats   │   │
│                                                  │ Updated  │   │
│                                                  └──────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Payment Modal:**

```
┌─────────────────────────────────────────────────────────────┐
│  Payment Received 🎉                                  [X]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Invoice: INV-2026-001                                      │
│  Client: Acme Corp                                          │
│  Amount: $2,500.00                                          │
│                                                             │
│  Payment Date *                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📅 February 10, 2026                                │   │
│  └─────────────────────────────────────────────────────┘   │
│  [Today] [Yesterday]                                       │
│                                                             │
│  Notes (optional)                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Received via ACH transfer                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ✓ This payment was:  🟢 On time (5 days early!)           │
│                                                             │
│                       [Cancel]  [Confirm Payment ✓]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Celebration Screen (appears for 2 seconds):**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     🎉 🎉 🎉                                │
│                                                             │
│                  Payment Received!                          │
│                                                             │
│                      $2,500                                 │
│                                                             │
│              Acme Corp • 5 days early                       │
│                                                             │
│         Client on-time rate: 92% (+8% ↑)                   │
│                                                             │
│                  [confetti animation]                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Flow 5: Review Client Risk Details

**Goal:** Understand why a client has their risk score and what to do about it.

**Client Detail Page:**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Clients                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  🏢 Acme Corporation                                │   │
│  │  Technology • jane@acme.com                         │   │
│  │                                                     │   │
│  │  ┌───────────────┐                                  │   │
│  │  │ Risk Score    │                                  │   │
│  │  │               │                                  │   │
│  │  │   🟡 5        │                                  │   │
│  │  │   Medium      │                                  │   │
│  │  └───────────────┘                                  │   │
│  │                                                     │   │
│  │  [Edit Client]  [Add Invoice]                       │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  RISK FACTORS                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Industry Average           🟢 4    Weight: 20%    │   │
│  │  Technology typically pays well                     │   │
│  │                                                     │   │
│  │  Payment History            🟡 5    Weight: 50%    │   │
│  │  8 of 12 invoices paid on time (67%)               │   │
│  │                                                     │   │
│  │  Recent Behavior            🟠 6    Weight: 20%    │   │
│  │  Last 3 invoices: 1 on time, 2 late                │   │
│  │                                                     │   │
│  │  Invoice Size               🟢 4    Weight: 10%    │   │
│  │  Average: $2,500                                    │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  PAYMENT STATISTICS                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Total Invoices: 12    │ Paid On Time: 8  (67%)     │   │
│  │ Total Amount: $30,000 │ Avg Days to Pay: 34        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  INVOICE HISTORY                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ INV-2026-001  $2,500  Due: Feb 15   🔵 Pending     │   │
│  │ INV-2026-002  $3,000  Due: Jan 10   🟢 Paid (2d)   │   │
│  │ INV-2025-015  $2,200  Due: Dec 15   🟠 Paid (+8d)  │   │
│  │ INV-2025-014  $1,800  Due: Nov 20   🟢 Paid (0d)   │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Information Architecture

### Site Map

```
PaymentPredictor
│
├── 🏠 Dashboard
│   ├── Outstanding summary
│   ├── Overdue list
│   ├── At-risk list
│   ├── Upcoming due dates
│   └── Recent payments
│
├── 📋 Invoices
│   ├── All Invoices (list)
│   │   ├── Filter by status
│   │   ├── Filter by client
│   │   └── Filter by date
│   ├── Invoice Detail
│   │   ├── Status timeline
│   │   ├── Follow-up schedule
│   │   └── Actions (edit, mark paid, delete)
│   └── Add Invoice
│
├── 👥 Clients
│   ├── All Clients (list)
│   │   ├── Sort by name
│   │   ├── Sort by risk
│   │   └── Search
│   ├── Client Detail
│   │   ├── Risk score + factors
│   │   ├── Statistics
│   │   ├── Invoice history
│   │   └── Notes
│   └── Add Client
│
├── 📊 Reports
│   ├── Payments Received
│   ├── Client Performance
│   └── Outstanding Summary
│
├── ⚙️ Settings
│   ├── Profile
│   ├── Notifications
│   ├── Follow-up Templates
│   ├── Integrations
│   ├── Billing
│   └── Account
│
└── 🔐 Auth
    ├── Login
    ├── Register
    ├── Forgot Password
    └── Reset Password
```

### Navigation Structure

**Primary Navigation (Sidebar):**
1. Dashboard (home)
2. Invoices
3. Clients
4. Reports (collapsed by default)
5. Settings (bottom)

**Global Actions (Header):**
- Search (global search across invoices, clients)
- Quick Add (+ button → add invoice/client)
- Notifications bell
- User avatar → menu

---

## Wireframe Descriptions

### Screen 1: Login Page

**Layout:**
- Centered card on gradient background
- Logo at top of card
- Email field
- Password field
- "Forgot password?" link
- Login button (primary, full-width)
- Divider with "or"
- "Sign in with Google" button
- "Don't have an account? Sign up" link

**Visual Details:**
- Background: subtle gradient (teal to blue)
- Card: white with shadow, rounded corners
- Logo: PaymentPredictor wordmark
- Primary button: teal/green

---

### Screen 2: Dashboard

**Layout:**
- Left sidebar navigation (collapsible)
- Top header with search and user menu
- Main content area with widgets

**Widgets (top to bottom, left to right):**

1. **Summary Cards (3-column row)**
   - Outstanding: total amount, invoice count
   - Overdue: amount, count, alert indicator
   - At-Risk: count, total value

2. **Upcoming Due Dates (full-width)**
   - Table: Client, Amount, Due Date, Risk, Action
   - Shows next 7 days
   - Action: Quick reminder button

3. **Recent Payments (half-width, left)**
   - List of last 5 payments
   - Shows client, amount, date
   - Positive/celebratory tone

4. **Activity Feed (half-width, right)**
   - Recent actions (invoices added, reminders sent)
   - Timestamps

---

### Screen 3: Invoice List

**Layout:**
- Standard page with header and content
- Filters bar at top
- Data table with pagination

**Elements:**

1. **Header Section**
   - Page title: "Invoices"
   - Primary action: "+ Add Invoice" button
   - Secondary: Export button

2. **Filters Bar**
   - Status dropdown (All, Pending, Overdue, Paid)
   - Client dropdown
   - Date range picker
   - Search field

3. **Data Table Columns:**
   - Invoice # (sortable)
   - Client (sortable)
   - Amount (sortable)
   - Due Date (sortable)
   - Status (with badge)
   - Actions (dropdown: view, edit, mark paid, delete)

4. **Pagination**
   - Items per page selector
   - Page navigation

---

### Screen 4: Client Detail

**Layout:**
- Two-column layout (main + sidebar)
- Tabs for different sections

**Left Column (Main):**

1. **Client Header**
   - Company name (large)
   - Industry badge
   - Contact info
   - Edit button

2. **Tabs:**
   - Overview (default)
   - Invoices
   - Activity

3. **Overview Tab Content:**
   - Risk factors breakdown
   - Payment statistics

4. **Invoices Tab Content:**
   - List of all invoices for this client
   - Filterable by status

**Right Column (Sidebar):**

1. **Risk Score Card**
   - Large number (1-10)
   - Color-coded background
   - "Low/Medium/High" label
   - "View factors" link

2. **Quick Actions**
   - Add Invoice button
   - Send Reminder (if overdue)
   - Edit Client

3. **Notes Section**
   - Editable text area
   - Auto-saves

---

### Screen 5: Settings - Follow-up Templates

**Layout:**
- Settings page with left navigation
- Main content area with template editor

**Left Navigation:**
- Profile
- Notifications
- Follow-up Templates (active)
- Integrations
- Billing
- Account

**Main Content:**

1. **Template List**
   - List of 5 default templates
   - Each shows: name, timing, enabled toggle
   - Click to edit

2. **Template Editor (when template selected)**
   - Template name (read-only for defaults)
   - Timing: "X days before/after due date"
   - Subject line field
   - Body editor (rich text)
   - Variable insertion dropdown
   - Preview button
   - Save/Cancel buttons

3. **Variable Reference**
   - Sidebar showing available variables
   - {client_name}, {amount}, {due_date}, etc.
   - Copy-to-clipboard on click

---

## Component Inventory

### Atoms (Basic Building Blocks)

#### Button Variants

| Variant | Usage | Visual |
|---------|-------|--------|
| Primary | Main actions | Solid teal, white text |
| Secondary | Secondary actions | Outline teal, teal text |
| Ghost | Tertiary actions | No border, teal text |
| Danger | Destructive actions | Solid red, white text |
| Disabled | Unavailable | Gray, reduced opacity |

#### Input Fields

| Type | Usage |
|------|-------|
| Text | Standard text input |
| Email | Email with validation |
| Password | Hidden text with show toggle |
| Number | Numeric with increment/decrement |
| Select | Dropdown selection |
| Multi-select | Multiple selection |
| Date | Date picker |
| Textarea | Multi-line text |
| Search | Text with search icon |

#### Badges

| Type | Color | Usage |
|------|-------|-------|
| Success | Green | Paid, on-time |
| Warning | Yellow/Orange | At-risk, almost due |
| Danger | Red | Overdue, high-risk |
| Info | Blue | Pending, informational |
| Neutral | Gray | Draft, inactive |

#### Icons

Using Lucide icon set for consistency:
- Plus (add actions)
- Pencil (edit)
- Trash (delete)
- Mail (email actions)
- AlertTriangle (warnings)
- CheckCircle (success)
- Clock (timing/scheduling)
- DollarSign (amounts)
- Users (clients)
- FileText (invoices)
- BarChart (reports)
- Settings (settings)

---

### Molecules (Composite Components)

#### Invoice Card

```
┌─────────────────────────────────────────────┐
│ INV-2026-001              🔴 Overdue        │
│ Acme Corporation                            │
│ $2,500.00            Due: Feb 15 (3d late)  │
│                                             │
│ [Mark Paid] [Send Reminder ▼]               │
└─────────────────────────────────────────────┘
```

**Props:**
- invoiceNumber: string
- clientName: string
- amount: number
- dueDate: Date
- status: 'pending' | 'overdue' | 'paid'
- onMarkPaid: () => void
- onSendReminder: () => void

---

#### Client Card

```
┌─────────────────────────────────────────────┐
│ 🏢 Acme Corporation                🟡 5     │
│ Technology                                  │
│                                             │
│ 12 invoices • 67% on-time • Avg: 34 days   │
│                                             │
│ [View Details →]                            │
└─────────────────────────────────────────────┘
```

**Props:**
- companyName: string
- industry: string
- riskScore: number
- stats: { totalInvoices, onTimeRate, avgDays }
- onClick: () => void

---

#### Risk Score Badge

```
┌───────────┐
│   🟡 5    │
│  Medium   │
└───────────┘
```

**Props:**
- score: number (1-10)
- size: 'sm' | 'md' | 'lg'
- showLabel: boolean

**Logic:**
- 1-3: Green, "Low"
- 4-6: Yellow, "Medium"
- 7-10: Red, "High"

---

#### Metric Card

```
┌─────────────────────┐
│ OUTSTANDING         │
│                     │
│      $45,000        │
│    25 invoices      │
│                     │
│ ↑ 12% from last mo  │
└─────────────────────┘
```

**Props:**
- title: string
- value: string | number
- subtitle: string
- trend?: { direction: 'up' | 'down', percentage: number }
- variant: 'default' | 'warning' | 'danger'

---

#### Data Table

**Props:**
- columns: Column[]
- data: Row[]
- sortable: boolean
- pagination: { page, limit, total }
- onSort: (column, direction) => void
- onPageChange: (page) => void
- emptyState: ReactNode

**Column Definition:**
```typescript
interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value, row) => ReactNode;
  width?: string;
}
```

---

### Organisms (Complex Components)

#### Dashboard Summary Row

Composed of 3 Metric Cards in responsive row.

#### Invoice List

Composed of:
- Filter bar
- Data Table with Invoice columns
- Pagination

#### Client Detail Header

Composed of:
- Client info section
- Risk Score Badge (large)
- Quick action buttons

---

## Mobile Considerations

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | <640px | Single column, bottom nav |
| Tablet | 640-1024px | Two columns, sidebar collapsed |
| Desktop | >1024px | Full layout, sidebar expanded |

### Mobile Navigation

**Bottom Tab Bar:**
- Dashboard
- Invoices
- Clients
- More (opens menu)

**Header (Mobile):**
- Hamburger menu (left)
- Logo (center)
- Quick add + (right)

### Mobile-Specific Patterns

#### Swipe Actions on List Items

Invoices and clients support swipe gestures:
- Swipe left: Quick actions (mark paid, send reminder)
- Swipe right: Delete (with confirmation)

#### Pull-to-Refresh

Dashboard and list pages support pull-to-refresh to update data.

#### Bottom Sheet Modals

Add/edit forms open as bottom sheets instead of centered modals on mobile.

### Touch Targets

All interactive elements minimum 44x44px for comfortable touch.

### Mobile Dashboard Layout

```
┌─────────────────────────────────────┐
│ PaymentPredictor           [+ ] [≡]│
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ OUTSTANDING        OVERDUE      │ │
│ │   $45,000           $12,500     │ │
│ │   25 inv.           8 inv.      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ AT-RISK                             │
│ ┌─────────────────────────────────┐ │
│ │ 5 invoices at high risk         │ │
│ │ Total: $8,500                   │ │
│ │ [View all →]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ NEEDS ATTENTION                     │
│ ┌─────────────────────────────────┐ │
│ │ Acme Corp     $2,500    5d late │ │
│ │ [←→ swipe for actions]          │ │
│ ├─────────────────────────────────┤ │
│ │ Beta Inc      $3,000    2d late │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [🏠] [📋] [👥] [•••]               │
└─────────────────────────────────────┘
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

PaymentPredictor targets WCAG 2.1 Level AA compliance.

### Color Contrast

All text must meet minimum contrast ratios:
- Normal text: 4.5:1
- Large text (18px+ or 14px+ bold): 3:1
- UI components and graphics: 3:1

### Keyboard Navigation

All functionality accessible via keyboard:
- Tab: Move focus forward
- Shift+Tab: Move focus backward
- Enter/Space: Activate buttons, links
- Escape: Close modals, dropdowns
- Arrow keys: Navigate within components

### Focus Management

- Visible focus indicators on all interactive elements
- Focus trapped within modals when open
- Focus returned to trigger when modal closed
- Skip links for main content

### Screen Reader Support

- Semantic HTML elements used appropriately
- ARIA labels on icons and non-text elements
- ARIA live regions for dynamic content updates
- Meaningful link and button text

### Form Accessibility

- Labels associated with inputs
- Error messages linked to inputs
- Required fields indicated
- Instructions provided where needed

### Motion and Animation

- Reduced motion mode supported
- No auto-playing content
- Animations under 5 seconds
- Pause controls for longer animations

---

## Design Tokens

### Colors

```css
/* Primary */
--color-primary-50: #f0fdfa;
--color-primary-100: #ccfbf1;
--color-primary-200: #99f6e4;
--color-primary-300: #5eead4;
--color-primary-400: #2dd4bf;
--color-primary-500: #14b8a6;  /* Primary */
--color-primary-600: #0d9488;
--color-primary-700: #0f766e;
--color-primary-800: #115e59;
--color-primary-900: #134e4a;

/* Success */
--color-success-500: #22c55e;

/* Warning */
--color-warning-500: #f59e0b;

/* Danger */
--color-danger-500: #ef4444;

/* Neutral */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Borders & Shadows

```css
/* Border Radius */
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill */

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Animation

```css
/* Durations */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Appendix

### A. Icon Reference

All icons from Lucide React library.

| Icon | Name | Usage |
|------|------|-------|
| ➕ | Plus | Add actions |
| ✏️ | Pencil | Edit |
| 🗑️ | Trash2 | Delete |
| 📧 | Mail | Email actions |
| ⚠️ | AlertTriangle | Warnings |
| ✓ | CheckCircle | Success |
| 🕐 | Clock | Timing |
| 💵 | DollarSign | Money/amounts |
| 👥 | Users | Clients |
| 📄 | FileText | Invoices/documents |
| 📊 | BarChart2 | Reports/charts |
| ⚙️ | Settings | Settings |
| 🔍 | Search | Search |
| 📅 | Calendar | Dates |
| 🏢 | Building2 | Companies |
| ▼ | ChevronDown | Dropdowns |
| → | ChevronRight | Navigation |
| ↩️ | RotateCcw | Refresh/reset |
| 📋 | ClipboardList | Lists |

### B. Document Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Design Team | Initial draft |

---

*End of UX Design Document*

