# 🇪🇹 Ethiopia B2B E-commerce Platform

A fully customized Medusa B2B e-commerce platform for the Ethiopian market, featuring Ethiopian Birr (ETB) currency, Ethiopia-only region, and a complete distributor-business-employee model.

---

## 🎯 Quick Start

```bash
cd backend
npm install
npm run build
npm run seed          # Creates Ethiopia region, products, shipping
npm run demo-setup    # Creates 4 demo companies
npm run dev
```

**Admin Panel**: http://localhost:9000/app

---

## ✨ Features

### 🇪🇹 Ethiopia-Specific
- **Currency**: Ethiopian Birr (ETB) only - no multi-currency complexity
- **Region**: Ethiopia (ET) exclusively
- **Warehouse**: Addis Ababa central distribution
- **Shipping**: Nationwide Ethiopia coverage
- **Addresses**: Ethiopian format (city, state/region, zip)
- **Phone Numbers**: +251 format

### 🏢 B2B Features
- **Company Management**: Manage multiple business customers
- **Employee System**: Employees within companies, individual limits
- **Approval Workflows**: Multi-level (company admin + sales manager)
- **Quote System**: Request, negotiate, and accept bulk quotes
- **Tiered Pricing**: Bronze, Silver, Gold, Platinum customer groups
- **Spending Limits**: Daily, weekly, monthly, or yearly controls

---

## 📚 Documentation

| File | Purpose | Length |
|------|---------|--------|
| **[ETHIOPIA_SETUP.md](ETHIOPIA_SETUP.md)** | Complete setup & configuration guide | 270+ lines |
| **[DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)** | Step-by-step demonstration guide | 450+ lines |
| **[DEMO_QUICK_REFERENCE.md](DEMO_QUICK_REFERENCE.md)** | One-page cheat sheet | Quick ref |
| **[B2B_MODEL_EXPLAINED.md](B2B_MODEL_EXPLAINED.md)** | Visual diagrams & explanations | 400+ lines |
| **[CUSTOMIZATION_SUMMARY.md](CUSTOMIZATION_SUMMARY.md)** | Complete change log | This project |
| **[backend/README.md](backend/README.md)** | Technical backend docs | Backend |

---

## 🏗️ Architecture

```
DISTRIBUTOR (You)
    ↓
COMPANIES (Business Customers)
    • Bole Electronics Retail (Addis Ababa)
    • Merkato Tech Solutions (Addis Ababa)
    • Bahir Dar Office Supplies (Bahir Dar)
    • Hawassa Industrial Corp (Hawassa)
    ↓
EMPLOYEES (Individual Buyers)
    • Company Admins (approve orders)
    • Regular Employees (place orders)
    ↓
ORDERS & QUOTES (ETB transactions)
```

---

## 💰 Pricing

### Sample Products (ETB)
- 16" Laptop: 125,900-129,900 ETB
- Smartphone: 95,900-99,900 ETB
- 34" Monitor: 59,900 ETB
- Gaming Headset: 14,900 ETB
- Wireless Keyboard: 9,900 ETB
- Wireless Mouse: 7,900 ETB
- Conference Speaker: 5,500-7,900 ETB
- HD Webcam: 2,900-3,200 ETB

### Pricing Tiers
- 🥉 **Bronze**: Standard pricing (new customers)
- 🥈 **Silver**: 5% discount (regular customers)
- 🥇 **Gold**: 10% discount (large customers)
- 💎 **Platinum**: 15% discount (enterprise/VIP)

### Bulk Discounts
- 1-10 units: Base price
- 11-50 units: +3% off
- 51-100 units: +5% off
- 100+ units: +8% off + custom quote

---

## 🎭 Demo Companies

The `npm run demo-setup` command creates:

| Company | Location | Sector | Limit | Employees |
|---------|----------|--------|-------|-----------|
| **Bole Electronics** | Addis Ababa | Electronics | 500K ETB/mo | 2 |
| **Merkato Tech** | Addis Ababa | IT Services | 300K ETB/wk | 1 |
| **Bahir Dar Office** | Bahir Dar | Office Supplies | 150K ETB/mo | 1 |
| **Hawassa Industrial** | Hawassa | Manufacturing | 1M ETB/mo | 2 |

Each company has realistic Ethiopian addresses, phone numbers, and email addresses.

---

## 🚀 Demo Flow

### 30-Minute Demo
1. **Introduction** (3 min) - Ethiopia-specific features
2. **Company Management** (5 min) - View and create companies
3. **Product Catalog** (3 min) - Browse ETB-priced products
4. **Tiered Pricing** (3 min) - Customer groups setup
5. **Approval Workflows** (5 min) - Multi-level approvals
6. **Quote System** (5 min) - Quote negotiation
7. **Order Management** (3 min) - Order processing
8. **Regional Config** (3 min) - Ethiopia settings

**Full guide**: See [DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)

---

## 🔧 Technical Stack

### Backend
- **Framework**: Medusa 2.8.4
- **Database**: PostgreSQL
- **Language**: TypeScript
- **ORM**: MikroORM
- **Cache**: In-memory (Redis for production)

### Custom Modules
- **Company Module**: B2B company & employee management
- **Quote Module**: Quote request & negotiation system
- **Approval Module**: Multi-level approval workflows

### Admin UI
- **Framework**: React 18
- **UI Library**: Medusa UI
- **Custom Pages**: Companies, Quotes, Approvals

---

## 🌍 Geographic Coverage

```
ETHIOPIA REGIONS SUPPORTED
├─ Addis Ababa (Capital, Warehouse)
├─ Amhara Region (Bahir Dar)
├─ Oromia Region
├─ SNNPR (Hawassa)
├─ Tigray Region
├─ Somali Region
├─ Afar Region
├─ Benishangul-Gumuz
├─ Gambela Region
├─ Harari Region
└─ Dire Dawa
```

**Shipping**: Standard (2-3 days) or Express (24 hours) - 1,000 ETB flat rate

---

## 📦 What's Included

### ✅ Pre-configured
- Ethiopia region (ET) with ETB currency
- Addis Ababa warehouse
- 8 sample products with ETB pricing
- Shipping options (Standard & Express)
- Tax regions for Ethiopia
- Default sales channel
- Publishable API key

### ✅ B2B System
- Company model with Ethiopian fields
- Employee model with spending limits
- Quote request & negotiation system
- Multi-level approval workflows
- Customer group integration
- Order approval flows

### ✅ Demo Data (Optional)
- 4 Ethiopian companies
- 6 employees with different roles
- Realistic addresses and contacts
- Varied spending limits
- Cross-Ethiopia geographic spread

### ✅ Documentation
- Complete setup guide
- Demo walkthrough
- Visual explanations
- API reference
- Technical docs

---

## 🎯 Use Cases

### For Distributors
✅ Manage multiple business customers from one platform  
✅ Set custom pricing per customer tier  
✅ Review and approve large orders  
✅ Negotiate bulk deals via quotes  
✅ Track customer spending patterns  
✅ Fulfill from central Addis Ababa warehouse  

### For Business Customers
✅ Company-wide purchasing account  
✅ Multiple employees with different limits  
✅ Admin approval for employee orders  
✅ Request quotes for bulk purchases  
✅ Track spending against budgets  
✅ Order history and analytics  

---

## 💡 Why This Platform?

### Ethiopia-Focused
- **No Currency Hassles**: Everything in Birr (ETB)
- **Local Optimization**: Ethiopian addresses, phones, business practices
- **Single Market**: No multi-country complexity
- **Scalable**: Supports businesses across all Ethiopian cities

### B2B-Optimized
- **Hierarchy**: Distributor → Company → Employee model
- **Control**: Spending limits and approval workflows
- **Flexibility**: Tiered pricing and custom quotes
- **Efficiency**: Bulk ordering and negotiation tools

---

## 🛠️ Installation

### Prerequisites
- Node.js 20+
- PostgreSQL
- Git

### Setup
```bash
# Clone repository
git clone <your-repo-url>
cd medusa-b2b

# Install backend
cd backend
npm install

# Configure environment
cp .env.template .env
# Edit .env with your PostgreSQL credentials

# Build and migrate
npm run build

# Seed Ethiopia region and products
npm run seed

# (Optional) Create demo companies
npm run demo-setup

# Start development server
npm run dev
```

### Access
- **Admin Panel**: http://localhost:9000/app
- **API**: http://localhost:9000
- **First user auto-registers as admin**

---

## 📖 API Endpoints

### Companies
```
GET    /admin/company          List all companies
POST   /admin/company          Create company
GET    /admin/company/:id      Get company
PUT    /admin/company/:id      Update company
DELETE /admin/company/:id      Delete company
```

### Employees
```
GET    /admin/employee         List employees
POST   /admin/employee         Create employee
PUT    /admin/employee/:id     Update employee
DELETE /admin/employee/:id     Delete employee
```

### Quotes
```
GET    /admin/quotes           List quotes
GET    /admin/quotes/:id       Get quote
PUT    /admin/quotes/:id       Update quote
POST   /admin/quotes/:id/accept Accept quote
```

### Approvals
```
GET    /admin/approvals        List approvals
POST   /admin/approvals/:id/approve  Approve request
POST   /admin/approvals/:id/reject   Reject request
```

**Full API docs**: See [backend/README.md](backend/README.md)

---

## 🧪 Testing

```bash
# Run all tests
npm run test:unit
npm run test:integration:http
npm run test:integration:modules
```

---

## 🔐 Security

- JWT authentication
- Role-based access control (admin, company admin, employee)
- Spending limit enforcement
- Approval workflow requirement
- Secure password handling
- CORS configuration
- Environment variable protection

---

## 🚀 Next Steps

### For Demo
1. ✅ Run setup commands
2. ✅ Create admin account
3. ✅ Review demo checklist
4. ✅ Practice demo flow
5. ✅ Prepare talking points

### For Production
1. ⬜ Import product catalog
2. ⬜ Configure payment gateways (TeleBirr, CBE Birr, M-Pesa)
3. ⬜ Import customer companies
4. ⬜ Set up pricing tiers
5. ⬜ Train admin staff
6. ⬜ Deploy to production
7. ⬜ Launch pilot program

---

## 🤝 Contributing

This is a customized platform. For modifications:
1. Review existing code structure
2. Follow TypeScript best practices
3. Maintain Ethiopia-specific focus
4. Update documentation
5. Test thoroughly

---

## 📄 License

MIT License - See LICENSE file

---

## 📞 Support

For questions or issues:
- **Setup**: See [ETHIOPIA_SETUP.md](ETHIOPIA_SETUP.md)
- **Demo**: See [DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)
- **Technical**: See [backend/README.md](backend/README.md)
- **Medusa Docs**: https://docs.medusajs.com

---

## 🎉 Ready for Demo!

Everything is configured and ready for demonstration:

✅ Ethiopian Birr (ETB) currency  
✅ Ethiopia (ET) region only  
✅ Addis Ababa warehouse  
✅ 8 products with ETB pricing  
✅ 4 demo companies  
✅ B2B features fully functional  
✅ Complete documentation  

**Start your demo**: Follow [DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)

---

**Version**: 1.0.0 (Ethiopia Edition)  
**Built for**: Ethiopian B2B Market  
**Currency**: Ethiopian Birr (ETB)  
**Region**: Ethiopia 🇪🇹
#   b 2 b - m e d u s a  
 