# Ethiopia B2B Platform - Demo Checklist

## Pre-Demo Setup (15 minutes before)

### 1. Environment Check
- [ ] PostgreSQL database running
- [ ] Node.js 20+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env` file)

### 2. Database Setup
```bash
cd backend
npm run build
npm run seed          # Seeds Ethiopia region, products, shipping
npm run demo-setup    # Creates 4 demo companies
```

### 3. Start Services
```bash
npm run dev
```
- [ ] Backend running on `http://localhost:9000`
- [ ] Admin panel accessible at `http://localhost:9000/app`

### 4. Admin Account
- [ ] Create admin user account (first user becomes admin)
- [ ] Login successful

---

## Demo Flow (30-45 minutes)

### Part 1: Platform Introduction (5 minutes)

**Key Points to Mention:**
- ✅ Built specifically for Ethiopian market
- ✅ All prices in Ethiopian Birr (ETB)
- ✅ Ethiopia-only region (no multi-country complexity)
- ✅ Distributor → Business → Employee model
- ✅ Approval workflows for controlled purchasing

**Show:**
- Dashboard overview
- Navigation menu highlighting B2B features

---

### Part 2: Company Management (8 minutes)

#### Navigate to Companies
1. [ ] Click **Companies** in sidebar
2. [ ] Show 4 demo companies created:
   - Bole Electronics Retail (Addis Ababa)
   - Merkato Tech Solutions (Addis Ababa)
   - Bahir Dar Office Supplies (Bahir Dar)
   - Hawassa Industrial Corporation (Hawassa)

#### Explore Company Details
3. [ ] Click on **Bole Electronics Retail**
4. [ ] Show company information:
   - Ethiopian address (Bole Road, Addis Ababa)
   - Phone number (+251 format)
   - Currency: ETB
   - Spending limit: Monthly reset

#### Employee Management
5. [ ] Show **Employees** tab
6. [ ] Point out:
   - Admin employee: Alem Tesfaye (500,000 ETB limit)
   - Regular employee: Kebede Alemu (100,000 ETB limit)
   - Different spending limits = different authority levels

#### Create New Company (Live)
7. [ ] Click **Create Company**
8. [ ] Fill in sample data:
   ```
   Name: Dire Dawa Tech Hub
   Email: info@diredawa-tech.et
   Phone: +251-25-XXX-XXXX
   Address: Churchill Road
   City: Dire Dawa
   State: Dire Dawa
   Zip: 4000
   Country: Ethiopia
   Currency: ETB
   Spending Limit Reset: Monthly
   ```
9. [ ] Save and show new company in list

---

### Part 3: Product Catalog (5 minutes)

#### View Products
1. [ ] Navigate to **Products**
2. [ ] Show 8 demo products:
   - Laptops (129,900 ETB)
   - Smartphones (95,900 - 99,900 ETB)
   - Monitors (59,900 ETB)
   - Accessories (2,900 - 14,900 ETB)

#### Highlight Pricing
3. [ ] Click on **16" Ultra-Slim AI Laptop**
4. [ ] Show variants and prices:
   - 256 GB / Blue: **129,900 ETB**
   - 512 GB / Red: **125,900 ETB**
5. [ ] Point out:
   - All prices in Birr (Br symbol)
   - No currency conversion needed
   - Simplified for single market

#### Product Categories
6. [ ] Show categories:
   - Laptops
   - Phones
   - Monitors
   - Accessories

---

### Part 4: Customer Groups & Tiered Pricing (5 minutes)

#### Create Pricing Tiers
1. [ ] Navigate to **Customers** → **Groups**
2. [ ] Create customer groups:

   **Bronze Tier (Standard)**
   - [ ] Name: Bronze Partners
   - [ ] No special discount

   **Silver Tier (5% discount)**
   - [ ] Name: Silver Partners
   - [ ] Note: 5% discount tier

   **Gold Tier (10% discount)**
   - [ ] Name: Gold Partners
   - [ ] Note: 10% discount tier

   **Platinum Tier (15% discount)**
   - [ ] Name: Platinum Partners
   - [ ] Note: 15% discount - top customers

#### Assign Groups to Companies
3. [ ] Go back to **Companies**
4. [ ] Assign tiers:
   - [ ] Bole Electronics → Gold (large retailer)
   - [ ] Merkato Tech → Silver (medium business)
   - [ ] Bahir Dar Office → Bronze (small business)
   - [ ] Hawassa Corporation → Platinum (enterprise)

---

### Part 5: Approval Workflows (7 minutes)

#### Configure Approval Settings
1. [ ] Open **Bole Electronics Retail**
2. [ ] Go to **Approval Settings** tab
3. [ ] Enable both:
   - [ ] **Requires Admin Approval**: ✅ (Company admin approves employee orders)
   - [ ] **Requires Sales Manager Approval**: ✅ (Distributor reviews large orders)

#### Explain Approval Flow
**Scenario**: Employee wants to order laptops

```
Employee (Kebede) places order
    ↓
Company Admin (Alem) reviews & approves
    ↓
Sales Manager (Distributor) reviews
    ↓
Order processed & fulfilled
```

**Benefits:**
- Control over company spending
- Prevent unauthorized purchases
- Volume discount negotiations
- Budget compliance

---

### Part 6: Quote System (7 minutes)

#### Navigate to Quotes
1. [ ] Click **Quotes** in sidebar
2. [ ] Click **Create Quote** (or simulate received quote)

#### Create Sample Quote
3. [ ] Fill in quote details:
   - [ ] Company: Hawassa Industrial Corporation
   - [ ] Products: 50x Laptops, 100x Monitors
   - [ ] Base price calculated automatically
   - [ ] Apply discount (Platinum tier)
   
#### Quote Statuses
4. [ ] Explain quote lifecycle:
   - **Pending Merchant**: Business requested, awaiting your response
   - **Pending Customer**: You sent quote, awaiting business approval
   - **Accepted**: Both parties agreed
   - **Rejected**: Either party declined

#### Quote Negotiation
5. [ ] Show messaging feature:
   - Business: "Can we get better price for bulk order?"
   - Distributor: "For 50+ units, we can offer 18% discount"
   - Business: "Accepted!"

#### Convert to Order
6. [ ] Show how accepted quote becomes an order
7. [ ] Order processed with negotiated terms

---

### Part 7: Order Management (5 minutes)

#### View Orders
1. [ ] Navigate to **Orders**
2. [ ] Show sample order details:
   - Company name
   - Employee who placed order
   - Items and quantities
   - Total in ETB
   - Approval status

#### Fulfillment
3. [ ] Show fulfillment options:
   - [ ] Stock location: **Addis Ababa Warehouse**
   - [ ] Shipping options:
     - Standard: 1,000 ETB (2-3 days)
     - Express: 1,000 ETB (24 hours)
   - [ ] Destination: Ethiopian address

#### Order Status Updates
4. [ ] Demonstrate status progression:
   - Pending Approval
   - Approved
   - Processing
   - Shipped
   - Delivered

---

### Part 8: Regional Configuration (3 minutes)

#### Show Ethiopia Settings
1. [ ] Navigate to **Settings** → **Regions**
2. [ ] Show **Ethiopia** region:
   - Currency: ETB (Ethiopian Birr)
   - Countries: Ethiopia (ET)
   - Payment providers: Default
   - Tax settings: Ethiopia

#### Shipping Configuration
3. [ ] Go to **Settings** → **Shipping**
4. [ ] Show shipping setup:
   - Service zone: Ethiopia
   - Geo-zone: Country ET
   - Standard/Express options
   - Flat rate pricing in ETB

#### Stock Locations
5. [ ] Go to **Settings** → **Locations**
6. [ ] Show **Addis Ababa Warehouse**:
   - Address: Addis Ababa, ET
   - Linked to fulfillment
   - Serves Ethiopia region

---

## Demo Scenarios (Choose 1-2)

### Scenario A: Small Business First Order
**Story**: Bahir Dar Office Supplies placing first bulk order

1. [ ] Employee logs in (simulate)
2. [ ] Browses catalog, adds 10 keyboards + 10 mice
3. [ ] Total: ~178,000 ETB
4. [ ] Submits for admin approval
5. [ ] Admin approves (show in admin panel)
6. [ ] Order proceeds to fulfillment

**Highlight**: Simple approval workflow for small businesses

---

### Scenario B: Enterprise Bulk Purchase with Quote
**Story**: Hawassa Corporation needs 100 laptops

1. [ ] Procurement team requests quote
2. [ ] System calculates: 100 × 129,900 = 12,990,000 ETB
3. [ ] Platinum discount (15%): 11,041,500 ETB
4. [ ] Negotiate for bulk: 18% discount = 10,651,800 ETB
5. [ ] Quote accepted
6. [ ] Order processed with payment terms

**Highlight**: Quote negotiation for large deals

---

### Scenario C: Spending Limit Control
**Story**: Employee exceeds monthly spending limit

1. [ ] Employee Kebede (100,000 ETB limit) tries to order
2. [ ] Cart total: 130,000 ETB (exceeds limit)
3. [ ] System blocks or requires special approval
4. [ ] Admin can override or increase limit
5. [ ] Order proceeds with approval

**Highlight**: Budget control mechanisms

---

## Key Talking Points

### ✅ Ethiopia-Specific Benefits
- **Single Currency**: No forex complexity, all in ETB
- **Local Focus**: Ethiopian addresses, phone numbers, business practices
- **Regional Shipping**: Optimized for Ethiopia's geography
- **Scalable**: Supports businesses across all Ethiopian cities

### ✅ B2B Features
- **Multi-level Hierarchy**: Distributor → Company → Employee
- **Approval Workflows**: Control spending and purchases
- **Tiered Pricing**: Reward larger customers with better rates
- **Quote System**: Negotiate deals for bulk orders
- **Spending Limits**: Daily, weekly, monthly, yearly controls

### ✅ Distributor Advantages
- **Manage Multiple Businesses**: Single platform for all B2B customers
- **Custom Pricing**: Per-company or per-tier pricing
- **Order Control**: Review and approve large orders
- **Relationship Management**: Track spending, preferences, history
- **Bulk Fulfillment**: Efficient processing from central warehouse

### ✅ Business Customer Benefits
- **Employee Management**: Control who can order and how much
- **Approval Workflows**: Company admins approve purchases
- **Spending Tracking**: Monitor usage against budgets
- **Quote Requests**: Negotiate better prices for bulk
- **Order History**: Track all purchases and spending

---

## Post-Demo: Next Steps

### For Interested Clients:
1. [ ] Discuss specific business requirements
2. [ ] Customize product catalog
3. [ ] Configure payment methods (TeleBirr, CBE Birr, M-Pesa, etc.)
4. [ ] Import existing customer companies
5. [ ] Set up pricing tiers
6. [ ] Train admin users
7. [ ] Launch pilot program

### Technical Setup:
1. [ ] Deploy to production server
2. [ ] Configure domain (e.g., distributor.et)
3. [ ] Set up SSL certificate
4. [ ] Connect payment gateways
5. [ ] Configure email notifications
6. [ ] Set up backups
7. [ ] Monitor performance

---

## Troubleshooting

### Common Issues:
- **Database connection**: Check PostgreSQL is running
- **Port conflicts**: Ensure 9000 is available
- **Seed errors**: Run migrations first (`npm run build`)
- **Admin login**: First user automatically becomes admin

### Reset Demo:
```bash
# Drop and recreate database
dropdb medusa-et
createdb medusa-et

# Re-run setup
npm run build
npm run seed
npm run demo-setup
```

---

## Demo Timing

| Section | Duration |
|---------|----------|
| Introduction | 5 min |
| Company Management | 8 min |
| Product Catalog | 5 min |
| Pricing Tiers | 5 min |
| Approval Workflows | 7 min |
| Quote System | 7 min |
| Order Management | 5 min |
| Regional Config | 3 min |
| **Total** | **45 min** |
| Q&A | 15 min |
| **Full Demo** | **60 min** |

---

**Good luck with your demonstration! 🇪🇹**
