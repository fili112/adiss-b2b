# Demo Quick Reference Card 🇪🇹

## Setup Commands (Run Once)

```bash
cd backend
npm install
npm run build
npm run seed
npm run demo-setup
npm run dev
```

Access: **http://localhost:9000/app**

---

## Demo Companies Created

| Company | City | Contact | Spending Limit |
|---------|------|---------|----------------|
| **Bole Electronics** | Addis Ababa | admin@boleelectronics.et | 500K ETB/month |
| **Merkato Tech** | Addis Ababa | admin@merkato-tech.et | 300K ETB/week |
| **Bahir Dar Office** | Bahir Dar | owner@bahirdar-office.et | 150K ETB/month |
| **Hawassa Industrial** | Hawassa | purchasing@hawassa-corp.et | 1M ETB/month |

---

## Key Features to Demo

### 1️⃣ Ethiopia-Specific (2 min)
- ✅ All prices in **Ethiopian Birr (ETB)**
- ✅ Ethiopia region only
- ✅ Addis Ababa warehouse
- ✅ Ethiopian addresses

### 2️⃣ Company Management (5 min)
- View all companies
- Company details (address, phone, limits)
- Employee roster with individual limits
- Create new company live

### 3️⃣ Tiered Pricing (3 min)
- Customer Groups:
  - 🥉 Bronze (Standard)
  - 🥈 Silver (5% off)
  - 🥇 Gold (10% off)
  - 💎 Platinum (15% off)

### 4️⃣ Approval Workflows (5 min)
```
Employee Order → Company Admin → Sales Manager → Fulfilled
```
- Spending limit checks
- Admin approval required
- Distributor review

### 5️⃣ Quote System (5 min)
- Request quote for bulk order
- Negotiate pricing
- Accept/reject quotes
- Convert to order

### 6️⃣ Order Management (3 min)
- View orders by company
- Track spending
- Fulfillment from Addis Ababa
- Shipping: Standard (1,000 ETB) or Express (1,000 ETB)

---

## Sample Products & Prices (ETB)

| Product | Price Range |
|---------|-------------|
| 16" Laptop | 125,900 - 129,900 |
| Smartphone | 95,900 - 99,900 |
| Monitor 34" | 59,900 |
| Gaming Headset | 14,900 |
| Keyboard | 9,900 |
| Mouse | 7,900 |
| Speaker | 5,500 - 7,900 |
| Webcam | 2,900 - 3,200 |

---

## Demo Scenarios

### Scenario A: Small Business Order
**Company**: Bahir Dar Office Supplies  
**Need**: 10 keyboards + 10 mice  
**Total**: ~178,000 ETB  
**Flow**: Employee → Admin approval → Process

### Scenario B: Enterprise Bulk Quote
**Company**: Hawassa Industrial  
**Need**: 100 laptops  
**Base**: 12,990,000 ETB  
**Discount**: 15% (Platinum) = 11,041,500 ETB  
**Flow**: Quote request → Negotiate → Accept → Order

### Scenario C: Spending Limit Block
**Employee**: Kebede (100K limit)  
**Tries**: 130,000 ETB order  
**Result**: Blocked, needs admin override

---

## Navigation Menu

```
📊 Dashboard
🏢 Companies          ← Main B2B feature
👥 Customers
📦 Products
📋 Orders
💬 Quotes             ← Quote system
✅ Approvals          ← Approval workflows
⚙️  Settings
  └─ Regions          ← Ethiopia config
  └─ Shipping         ← Shipping options
  └─ Locations        ← Warehouse
```

---

## Talking Points

### Why This Platform?

**For Distributors:**
- ✅ Manage multiple business customers
- ✅ Custom pricing per customer
- ✅ Approve large orders
- ✅ Track spending patterns
- ✅ Bulk order efficiency

**For Businesses:**
- ✅ Employee purchasing control
- ✅ Approval workflows
- ✅ Budget management
- ✅ Quote negotiations
- ✅ Order history tracking

**Ethiopia Benefits:**
- ✅ Single currency (no forex)
- ✅ Local addresses & phones
- ✅ Ethiopian business practices
- ✅ Scales across all cities

---

## Common Questions & Answers

**Q: Can we add more regions?**  
A: Yes, but optimized for Ethiopia single-market.

**Q: Payment methods?**  
A: Configurable. Can add TeleBirr, CBE Birr, M-Pesa, etc.

**Q: Multi-language support?**  
A: Yes, Amharic can be added via i18n.

**Q: How many companies supported?**  
A: Unlimited. Scales to thousands.

**Q: Custom product catalog?**  
A: Fully customizable. Import your products.

**Q: Mobile app?**  
A: Headless API supports mobile apps.

**Q: Offline ordering?**  
A: Can be implemented with sync.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 9000 busy | Change in `.env` or stop conflicting service |
| Database error | Check PostgreSQL running: `pg_ctl status` |
| Seed fails | Run `npm run build` first |
| Login fails | First user auto-admin |

---

## Reset Demo

```bash
# Quick reset
dropdb medusa-et && createdb medusa-et
npm run build
npm run seed
npm run demo-setup
```

---

## Demo Timing

| Section | Time |
|---------|------|
| Intro | 3 min |
| Companies | 5 min |
| Products | 3 min |
| Pricing | 3 min |
| Approvals | 5 min |
| Quotes | 5 min |
| Orders | 3 min |
| Q&A | 10 min |
| **Total** | **37 min** |

---

## Post-Demo Next Steps

1. ✅ Discuss requirements
2. ✅ Customize products
3. ✅ Add payment methods
4. ✅ Import companies
5. ✅ Set pricing tiers
6. ✅ Train admins
7. ✅ Launch pilot

---

**Quick Tips:**
- Keep browser at comfortable zoom
- Have demo companies open in tabs
- Practice quote scenario
- Mention Ethiopia benefits often
- Be confident with pricing (ETB only!)

**Good luck! 🚀🇪🇹**
