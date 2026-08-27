# Ethiopia B2B E-commerce Platform (Backend)

A customized Medusa B2B e-commerce backend specifically configured for the Ethiopian market.

## 🇪🇹 Ethiopia Configuration

This platform is optimized for Ethiopia with:

- **Currency**: Ethiopian Birr (ETB) only
- **Region**: Ethiopia (ET)
- **Default Location**: Addis Ababa
- **Language**: English (Amharic support ready)

## 🏢 B2B Model

### Architecture
```
Distributor (You)
    ↓
Companies (Business Customers)
    ↓
Employees (Individual Buyers)
    ↓
Orders & Quotes
```

### Key Features

- **Company Management**: Manage business customer accounts
- **Employee System**: Employees belong to companies with individual limits
- **Approval Workflows**: Multi-level approval (company admin + sales manager)
- **Quote System**: Request and negotiate bulk order quotes
- **Spending Limits**: Daily, weekly, monthly, or yearly resets
- **Tiered Pricing**: Customer groups for different discount levels

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL
- Redis (optional)

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.template .env
# Edit .env with your database credentials

# Build and run migrations
npm run build

# Seed initial data (Ethiopia region, products, shipping)
npm run seed

# (Optional) Create demo companies for testing
npm run demo-setup

# Start development server
npm run dev
```

The admin panel will be available at: **http://localhost:9000/app**

## 📦 What's Seeded

### Region & Currency
- Region: Ethiopia
- Currency: ETB (Ethiopian Birr)
- Country: ET
- Tax region: Ethiopia

### Stock Location
- Addis Ababa Warehouse
- Address: Addis Ababa, ET

### Shipping Options
- Standard Shipping: 1,000 ETB (2-3 days)
- Express Shipping: 1,000 ETB (24 hours)
- Service zone: Ethiopia nationwide

### Products (8 items)
All prices in Ethiopian Birr:

1. 16" Ultra-Slim AI Laptop - 129,900 ETB
2. 1080p HD Pro Webcam - 2,900-3,200 ETB
3. 6.5" Ultra HD Smartphone - 95,900-99,900 ETB
4. 34" QD-OLED Gaming Monitor - 59,900 ETB
5. Hi-Fi Gaming Headset - 14,900 ETB
6. Wireless Keyboard - 9,900 ETB
7. Wireless Mouse - 7,900 ETB
8. Conference Speaker - 5,500-7,900 ETB

## 🎯 Demo Setup

Run the demo setup script to create 4 sample companies:

```bash
npm run demo-setup
```

This creates:
1. **Bole Electronics Retail** (Addis Ababa) - Large retailer
2. **Merkato Tech Solutions** (Addis Ababa) - IT business
3. **Bahir Dar Office Supplies** (Bahir Dar) - Small business
4. **Hawassa Industrial Corporation** (Hawassa) - Enterprise

Each company has employees with different spending limits and admin privileges.

## 📚 API Endpoints

### Company Management
- `GET /admin/company` - List all companies
- `POST /admin/company` - Create company
- `GET /admin/company/:id` - Get company details
- `PUT /admin/company/:id` - Update company
- `DELETE /admin/company/:id` - Delete company

### Employee Management
- `GET /admin/employee` - List employees
- `POST /admin/employee` - Create employee
- `PUT /admin/employee/:id` - Update employee
- `DELETE /admin/employee/:id` - Delete employee

### Quote Management
- `GET /admin/quotes` - List quotes
- `GET /admin/quotes/:id` - Get quote details
- `PUT /admin/quotes/:id` - Update quote
- `POST /admin/quotes/:id/accept` - Accept quote

### Approval Management
- `GET /admin/approvals` - List approvals
- `POST /admin/approvals/:id/approve` - Approve request
- `POST /admin/approvals/:id/reject` - Reject request

## 🔧 Configuration Files

- **medusa-config.ts**: Main configuration, modules setup
- **.env**: Environment variables (database, CORS, secrets)
- **src/scripts/seed.ts**: Ethiopia region and product seeding
- **src/scripts/demo-setup.ts**: Demo companies creation

## 🏗️ Custom Modules

### Company Module
Located in: `src/modules/company/`

**Models:**
- Company: Business customer entity
- Employee: Links customers to companies

**Features:**
- Company profiles with Ethiopian addresses
- Spending limit management
- Employee roster
- Customer group integration

### Quote Module
Located in: `src/modules/quote/`

**Models:**
- Quote: Quote requests and negotiations
- Message: Quote discussion threads

**Features:**
- Quote creation and management
- Status tracking (pending, accepted, rejected)
- Messaging system

### Approval Module
Located in: `src/modules/approval/`

**Models:**
- Approval: Individual approval requests
- ApprovalSettings: Per-company approval rules
- ApprovalStatus: Cart-level approval tracking

**Features:**
- Multi-level approval workflows
- Admin approval (company level)
- Sales manager approval (distributor level)

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration:modules
npm run test:integration:http
```

## 📖 Documentation

For detailed setup and demonstration guide, see:
- **[ETHIOPIA_SETUP.md](../ETHIOPIA_SETUP.md)** - Complete Ethiopia configuration guide
- **[DEMO_CHECKLIST.md](../DEMO_CHECKLIST.md)** - Step-by-step demo instructions

## 🌐 Ethiopian Payment Integration (TODO)

To integrate local payment methods, add providers in `medusa-config.ts`:

```typescript
payment_providers: [
  "pp_system_default",
  "pp_telebirr",      // TeleBirr
  "pp_cbe_birr",      // CBE Birr
  "pp_m_pesa",        // M-Pesa Ethiopia
]
```

## 🛠️ Development

### Project Structure

```
backend/
├── src/
│   ├── admin/              # Admin UI customizations
│   │   ├── components/     # Custom admin components
│   │   ├── hooks/          # API hooks
│   │   ├── routes/         # Custom admin pages
│   │   └── utils/          # Utilities (currency symbols, etc.)
│   ├── api/                # API routes
│   ├── modules/            # Custom modules
│   │   ├── company/        # Company & employee management
│   │   ├── quote/          # Quote system
│   │   └── approval/       # Approval workflows
│   ├── scripts/            # Seed and setup scripts
│   ├── types/              # TypeScript type definitions
│   └── workflows/          # Custom workflows
├── integration-tests/      # Integration tests
├── medusa-config.ts        # Medusa configuration
└── package.json
```

### Admin Customizations

The admin panel includes custom pages for:
- Company management (`/app/companies`)
- Employee management (`/app/companies/:id`)
- Quote management (`/app/quotes`)
- Approval workflows (`/app/approvals`)

### Database Schema

Custom tables:
- `company` - Business customer companies
- `employee` - Company employees
- `quote` - Quote requests
- `message` - Quote messages
- `approval` - Approval requests
- `approval_settings` - Company approval rules
- `approval_status` - Cart approval status

## 🔒 Security

- JWT authentication
- Role-based access (admin, company admin, employee)
- Spending limit enforcement
- Approval workflows for controlled purchasing

## 📊 Monitoring

Key metrics to track:
- Order volume by company
- Spending vs limits
- Approval turnaround time
- Quote acceptance rate
- Geographic distribution (Ethiopian cities)

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review the demo setup
3. Check Medusa docs: https://docs.medusajs.com

## 📄 License

MIT License

---

**Version**: 1.0.0 (Ethiopia Edition)  
**Last Updated**: 2026
