# Ethiopia B2B Model - Visual Guide 🇪🇹

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DISTRIBUTOR                           │
│         (You - Using Admin Panel)                        │
│                                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Manage product catalog (ETB pricing)          │  │
│  │  • Set pricing tiers (Bronze/Silver/Gold/Plat)   │  │
│  │  • Review & approve large orders                 │  │
│  │  • Negotiate quotes                              │  │
│  │  • Fulfill from Addis Ababa warehouse           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Manages
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 BUSINESS COMPANIES                       │
│            (Your B2B Customers)                          │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Company A  │  │   Company B  │  │   Company C  │  │
│  │              │  │              │  │              │  │
│  │ Bole Elec.   │  │ Merkato Tech │  │ Bahir Dar    │  │
│  │ Addis Ababa  │  │ Addis Ababa  │  │ Bahir Dar    │  │
│  │ Gold Tier    │  │ Silver Tier  │  │ Bronze Tier  │  │
│  │ 500K ETB/mo  │  │ 300K ETB/wk  │  │ 150K ETB/mo  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
           │                  │                  │
           │ Contains         │ Contains         │ Contains
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                     EMPLOYEES                            │
│         (Individual users within companies)              │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Admin        │  │ Buyer        │  │ Procurement  │  │
│  │ Alem T.      │  │ Kebede A.    │  │ Sara M.      │  │
│  │ 500K limit   │  │ 100K limit   │  │ 250K limit   │  │
│  │ Can approve  │  │ Can order    │  │ Can order    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
           │                  │                  │
           │ Places           │ Places           │ Places
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                   ORDERS & QUOTES                        │
│                                                           │
│  📦 Order #1234     💬 Quote #5678     ✅ Approval #91011│
│  127,500 ETB        1,500,000 ETB      Pending Admin     │
│  5x Laptops         100x Monitors      Review order      │
│  Approved ✓         Negotiating...     before submit     │
└─────────────────────────────────────────────────────────┘
```

---

## Order Flow with Approvals

### Scenario: Employee Places Order

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: EMPLOYEE CREATES ORDER                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Kebede (Regular Employee)                               │
│  • Browses catalog                                       │
│  • Adds 10 laptops to cart (1,299,000 ETB)             │
│  • Clicks "Submit Order"                                │
│                                                           │
│  ❓ Check: Does this exceed employee limit?             │
│     YES → Requires company admin approval               │
│                                                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: COMPANY ADMIN REVIEWS                            │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Alem (Company Admin)                                    │
│  • Receives notification                                 │
│  • Reviews order details                                 │
│  • Checks budget & necessity                            │
│  • Decision:                                             │
│    ✅ APPROVE → Continue to next step                   │
│    ❌ REJECT → Order cancelled                          │
│                                                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: SALES MANAGER REVIEWS (If enabled)              │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Distributor Sales Manager                               │
│  • Large order alert                                     │
│  • Reviews customer history                              │
│  • Checks inventory                                      │
│  • Can offer better pricing                             │
│  • Decision:                                             │
│    ✅ APPROVE → Order confirmed                         │
│    ❌ REJECT → Send back with reason                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: ORDER PROCESSING                                 │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  • Payment processed                                     │
│  • Invoice generated                                     │
│  • Fulfillment team notified                            │
│  • Picked from Addis Ababa warehouse                    │
│  • Shipped to customer                                   │
│  • Tracking updated                                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Quote Flow

### Scenario: Company Requests Bulk Quote

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: COMPANY REQUESTS QUOTE                           │
│ Status: pending_merchant                                 │
├─────────────────────────────────────────────────────────┤
│  Company: Hawassa Industrial                             │
│  Request: 100 laptops for office expansion              │
│  Expected: ~12,000,000 ETB                              │
│  Message: "Need delivery in 2 weeks"                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: DISTRIBUTOR REVIEWS & RESPONDS                   │
│ Status: pending_customer                                 │
├─────────────────────────────────────────────────────────┤
│  Distributor checks:                                     │
│  • Stock availability: ✅ In stock                      │
│  • Customer tier: Platinum (15% discount)               │
│  • Base price: 12,990,000 ETB                           │
│  • Tier discount: -1,948,500 ETB                        │
│  • Bulk discount: -1,040,000 ETB (additional 8%)       │
│  • Final quote: 10,000,000 ETB                          │
│  • Delivery: 2 weeks ✅                                 │
│  Message: "Special bulk pricing applied"                │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: COMPANY REVIEWS QUOTE                            │
├─────────────────────────────────────────────────────────┤
│  Company sees:                                           │
│  • Original price: 12,990,000 ETB                       │
│  • Quoted price: 10,000,000 ETB                         │
│  • Savings: 2,990,000 ETB (23% off!)                   │
│  • Terms: 2 weeks delivery                              │
│                                                           │
│  Options:                                                │
│  ✅ ACCEPT → Convert to order                           │
│  💬 NEGOTIATE → Request changes                         │
│  ❌ REJECT → Cancel quote                               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 4: QUOTE ACCEPTED                                   │
│ Status: accepted                                         │
├─────────────────────────────────────────────────────────┤
│  • Quote converts to order automatically                 │
│  • Payment terms applied                                 │
│  • Delivery scheduled                                    │
│  • Both parties notified                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Pricing Tiers Explained

### How Tiered Pricing Works

```
STANDARD PRODUCT PRICE
┌────────────────────────────────────┐
│  16" Laptop = 129,900 ETB          │
└────────────────────────────────────┘
                │
                ├─► Bronze Tier (Standard)
                │   • No discount
                │   • Price: 129,900 ETB
                │   • For: New/small customers
                │
                ├─► Silver Tier (5% discount)
                │   • Discount: -6,495 ETB
                │   • Price: 123,405 ETB
                │   • For: Regular customers
                │
                ├─► Gold Tier (10% discount)
                │   • Discount: -12,990 ETB
                │   • Price: 116,910 ETB
                │   • For: Large customers
                │
                └─► Platinum Tier (15% discount)
                    • Discount: -19,485 ETB
                    • Price: 110,415 ETB
                    • For: Enterprise/VIP customers
```

### Bulk Order Pricing

```
ORDER SIZE DISCOUNTS
(Can stack with tier discounts)

1-10 units    → Base price
11-50 units   → Additional 3% off
51-100 units  → Additional 5% off
100+ units    → Additional 8% off + custom quote
```

**Example: 100 Laptops for Platinum Customer**

```
Base Price:        129,900 ETB × 100 = 12,990,000 ETB
Tier Discount:     15% off            = -1,948,500 ETB
Bulk Discount:     8% off             = -1,039,200 ETB
                                        ──────────────
FINAL PRICE:                             10,002,300 ETB
SAVINGS:                                  2,987,700 ETB (23%)
```

---

## Spending Limits System

### How Limits Work

```
COMPANY LEVEL
┌────────────────────────────────────────────────────┐
│  Bole Electronics Retail                            │
│  Total Company Spending Limit: 500,000 ETB/month   │
│  Reset Frequency: Monthly (1st of each month)      │
│                                                     │
│  Current Month Spending: 325,000 ETB               │
│  Remaining Budget: 175,000 ETB                     │
└────────────────────────────────────────────────────┘
        │
        ├─► Employee 1: Alem (Admin)
        │   ├─ Personal Limit: 500,000 ETB/month
        │   ├─ This Month: 150,000 ETB
        │   └─ Can Still Order: 175,000 ETB
        │      (Limited by company remaining budget)
        │
        └─► Employee 2: Kebede (Regular)
            ├─ Personal Limit: 100,000 ETB/month
            ├─ This Month: 75,000 ETB
            └─ Can Still Order: 25,000 ETB
               (Hit personal limit first)
```

### Limit Enforcement

```
When employee tries to order:

1. Check Employee Limit
   ├─ Within limit? → Continue
   └─ Over limit? → Requires override

2. Check Company Limit
   ├─ Within limit? → Continue
   └─ Over limit? → Requires override

3. Both OK?
   ├─ Auto-approve (if no workflow)
   └─ Send for approval (if workflow enabled)
```

---

## Geographic Coverage

### Ethiopia Nationwide

```
         ETHIOPIA MAP
    ┌─────────────────────┐
    │                      │
    │   🏭 Bahir Dar       │
    │                      │
    │      🏛️ Addis Ababa │
    │      (Warehouse)     │
    │                      │
    │         🏢 Hawassa   │
    │                      │
    └─────────────────────┘

SHIPPING ZONES
• All Ethiopia: Single shipping zone
• Standard: 1,000 ETB (2-3 days)
• Express: 1,000 ETB (24 hours)
• Central warehouse: Addis Ababa
• Serves all regions
```

---

## User Roles & Permissions

```
┌────────────────────────────────────────────────────────┐
│ DISTRIBUTOR ADMIN (You)                                 │
├────────────────────────────────────────────────────────┤
│ ✅ Manage all companies                                │
│ ✅ Set pricing tiers                                   │
│ ✅ Approve/reject quotes                               │
│ ✅ Review large orders                                 │
│ ✅ Configure approval workflows                        │
│ ✅ Manage product catalog                              │
│ ✅ View all analytics                                  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ COMPANY ADMIN (e.g., Alem @ Bole Electronics)         │
├────────────────────────────────────────────────────────┤
│ ✅ Approve employee orders                             │
│ ✅ Manage company employees                            │
│ ✅ View company spending                               │
│ ✅ Request quotes                                      │
│ ✅ Set employee limits (within company limit)          │
│ ❌ Cannot see other companies                          │
│ ❌ Cannot change pricing tiers                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ EMPLOYEE (e.g., Kebede @ Bole Electronics)            │
├────────────────────────────────────────────────────────┤
│ ✅ Browse catalog                                      │
│ ✅ Place orders (within limit)                         │
│ ✅ View own order history                              │
│ ✅ Request quotes                                      │
│ ❌ Cannot approve orders                               │
│ ❌ Cannot see other employees                          │
│ ❌ Cannot change own limit                             │
└────────────────────────────────────────────────────────┘
```

---

## Currency & Payments

```
ETHIOPIAN BIRR (ETB) ONLY
┌────────────────────────────────┐
│                                 │
│  All prices in ETB              │
│  Display format: Br XX,XXX      │
│  No currency conversion         │
│  Simplified accounting          │
│                                 │
└────────────────────────────────┘

PAYMENT METHODS (Configurable)
├─ Default Payment (Built-in)
├─ TeleBirr (Can be added)
├─ CBE Birr (Can be added)
├─ M-Pesa Ethiopia (Can be added)
├─ Bank Transfer
└─ Cash on Delivery
```

---

## Success Metrics

### What to Track

```
📊 BUSINESS METRICS

Companies
├─ Total active companies
├─ Companies by tier (Bronze/Silver/Gold/Platinum)
├─ Geographic distribution (by city)
└─ Average company spending

Orders
├─ Total order value (ETB)
├─ Orders per company
├─ Average order value
└─ Order approval rate

Quotes
├─ Quote requests received
├─ Quote acceptance rate
├─ Average discount offered
└─ Time to quote response

Efficiency
├─ Approval turnaround time
├─ Order fulfillment time
├─ Quote-to-order conversion
└─ Customer satisfaction
```

---

**This B2B model enables:**
- 🏢 Scalable management of multiple business customers
- 👥 Controlled purchasing by employees
- 💰 Flexible pricing strategies
- ✅ Compliance and approval workflows
- 📈 Growth across Ethiopian market

**Perfect for distributors serving businesses nationwide! 🇪🇹**
