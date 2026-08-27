# Ethiopia B2B E-commerce Platform

## Overview
This is a customized Medusa B2B e-commerce platform configured specifically for the Ethiopian market, using Ethiopian Birr (ETB) as the default and only currency, with Ethiopia as the default country.

## Business Model

### Distributor-Business Architecture
This platform is designed for a B2B model where:

- **Distributors**: Wholesale suppliers who manage inventory and fulfill orders
- **Businesses**: Retail companies or enterprises that purchase from distributors
- **Employees**: Individual users within businesses who can place orders on behalf of their company

### Key Features

#### 1. **Company Management**
- Companies represent business customers (retailers, enterprises)
- Each company has:
  - Company profile (name, contact info, Ethiopian address)
  - Employee roster
  - Spending limits (daily, weekly, monthly, yearly)
  - Customer group assignment for pricing tiers
  - Approval settings

#### 2. **Employee Management**
- Employees are linked to companies
- Individual spending limits
- Admin privileges (company admin vs regular employee)
- Linked to customer accounts for authentication

#### 3. **Quote System**
- Businesses can request quotes for bulk orders
- Quote statuses:
  - `pending_merchant`: Awaiting distributor response
  - `pending_customer`: Awaiting business approval
  - `accepted`: Quote approved by both parties
  - `customer_rejected`: Declined by business
  - `merchant_rejected`: Declined by distributor
- Messaging system for quote negotiations

#### 4. **Approval Workflows**
- Admin approval: Company admins approve employee orders
- Sales manager approval: Distributor sales managers review large orders
- Configurable per company

## Ethiopia-Specific Configuration

### Currency
- **Primary Currency**: Ethiopian Birr (ETB)
- **Currency Symbol**: Br
- All product prices in ETB
- No multi-currency support (single market)

### Geographic Setup
- **Country Code**: ET (Ethiopia)
- **Default Region**: Ethiopia
- **Tax Region**: Ethiopia
- **Default Warehouse**: Addis Ababa

### Shipping
- **Service Zone**: Ethiopia nationwide
- **Shipping Options**:
  - Standard Shipping: 1,000 ETB (2-3 days)
  - Express Shipping: 1,000 ETB (24 hours)
- Geo-zone configured for Ethiopian addresses

### Address Format
Companies and orders use standard Ethiopian addressing:
- City (e.g., Addis Ababa)
- State/Region
- Zip/Postal Code
- Country: Ethiopia (ET)

## Demo Products

The seed data includes 8 sample products:
1. **16" Ultra-Slim AI Laptop** - 129,900 ETB
2. **1080p HD Pro Webcam** - 2,900-3,200 ETB
3. **6.5" Ultra HD Smartphone** - 95,900-99,900 ETB
4. **34" QD-OLED Curved Gaming Monitor** - 59,900 ETB
5. **Hi-Fi Gaming Headset** - 14,900 ETB
6. **Wireless Keyboard** - 9,900 ETB
7. **Wireless Mouse** - 7,900 ETB
8. **Conference Speaker** - 5,500-7,900 ETB

All prices are in Ethiopian Birr (ETB).

## Installation & Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Redis (optional, for production)

### Initial Setup

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Configure environment**:
Copy `.env.template` to `.env` and update:
```env
DATABASE_URL=postgres://postgres@localhost/medusa-et
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7000,http://localhost:7001
```

3. **Run database migrations**:
```bash
npm run build
```

4. **Seed demo data**:
```bash
npm run seed
```

This will create:
- Ethiopia region with ETB currency
- Addis Ababa warehouse
- Sample products with ETB pricing
- Shipping options for Ethiopia

5. **Start the development server**:
```bash
npm run dev
```

The admin panel will be available at: `http://localhost:9000/app`

## Demonstration Guide

### Demo Scenario: Setting Up a Distributor-Business Relationship

#### Step 1: Access Admin Panel
1. Navigate to `http://localhost:9000/app`
2. Create an admin account (first user becomes admin)

#### Step 2: Create a Distributor Company Profile
While this system is primarily for businesses buying from you (the distributor), you can also manage other distributor relationships:

1. Go to **Companies** in the left sidebar
2. Click **Create Company**
3. Fill in details:
   - Name: "Addis Tech Supplies Ltd"
   - Email: distributor@example.com
   - Phone: +251-11-XXX-XXXX
   - Address: Ethiopian address format
   - City: Addis Ababa
   - Country: Ethiopia
   - Currency: ETB

#### Step 3: Create a Business Customer Company
1. Go to **Companies**
2. Click **Create Company**
3. Fill in details:
   - Name: "Bole Electronics Retail"
   - Email: orders@boleelectronics.et
   - Phone: +251-11-YYY-YYYY
   - Address: Bole Road, Addis Ababa
   - Currency: ETB
   - Spending Limit Reset: Monthly

#### Step 4: Add Employees to Business
1. Open the company detail page
2. Add employees:
   - Company admin (can approve orders)
   - Regular employee (places orders)
3. Set individual spending limits

#### Step 5: Configure Approval Settings
1. In company settings, configure:
   - **Requires Admin Approval**: Enable for order approval workflow
   - **Requires Sales Manager Approval**: Enable for high-value orders

#### Step 6: Assign Customer Group (Pricing Tier)
1. Create customer groups for pricing tiers:
   - Bronze (standard pricing)
   - Silver (5% discount)
   - Gold (10% discount)
   - Platinum (15% discount)
2. Assign the business to appropriate tier

#### Step 7: Demonstrate Quote Flow
1. Switch to storefront (business employee login)
2. Browse products, add to cart
3. Request quote for bulk order
4. Back to admin: review quote request
5. Modify pricing/terms in quote
6. Send revised quote to business
7. Business accepts quote
8. Quote converts to order

#### Step 8: Demonstrate Approval Workflow
1. Employee adds items to cart
2. Submits order (triggers approval if enabled)
3. Company admin reviews and approves
4. If large order: Sales manager reviews
5. Order proceeds to fulfillment

#### Step 9: Order Management
1. View orders by company
2. Check spending limits vs actual spend
3. Process fulfillment from Addis Ababa warehouse
4. Update shipping status

### Demo Data Points to Highlight

**Currency**: All transactions in Ethiopian Birr (ETB)
- Prices displayed as "Br XX,XXX"
- No currency conversion needed
- Simplified for single-market operation

**Geographic Focus**: Ethiopia-only
- Single shipping zone
- Local payment methods
- Ethiopian address validation
- Addis Ababa central warehouse

**B2B Features**:
- Multi-level approval workflows
- Spending limit controls
- Company-wide purchasing policies
- Quote negotiation system
- Tiered pricing via customer groups
- Employee permission management

**Distributor Capabilities**:
- Manage multiple business accounts
- Set custom pricing per business
- Approve/reject quote requests
- Monitor spending patterns
- Bulk order handling

## Key API Endpoints

### Company Management
- `GET /admin/company` - List all companies
- `POST /admin/company` - Create company
- `GET /admin/company/:id` - Get company details
- `PUT /admin/company/:id` - Update company
- `DELETE /admin/company/:id` - Delete company

### Employee Management
- `GET /admin/company/:id/employees` - List employees
- `POST /admin/company/:id/employees` - Add employee
- `PUT /admin/employee/:id` - Update employee
- `DELETE /admin/employee/:id` - Remove employee

### Quote Management
- `GET /admin/quotes` - List all quotes
- `GET /admin/quotes/:id` - Get quote details
- `PUT /admin/quotes/:id` - Update quote
- `POST /admin/quotes/:id/accept` - Accept quote

### Approval Management
- `GET /admin/approvals` - List pending approvals
- `POST /admin/approvals/:id/approve` - Approve request
- `POST /admin/approvals/:id/reject` - Reject request

## Customization for Ethiopia

### Adding Ethiopian Payment Methods
Edit `medusa-config.ts` to add local payment providers:
```typescript
payment_providers: [
  "pp_system_default",
  "pp_telebirr",
  "pp_cbe_birr",
  "pp_mpesa"
]
```

### Regional Customization
All seed data is pre-configured for Ethiopia:
- Region: Ethiopia
- Currency: ETB
- Country: ET
- Tax regions: Ethiopian tax zones
- Shipping: Ethiopia-wide coverage

### Language Support
To add Amharic language support:
1. Add translation files to admin UI
2. Configure locale in storefront
3. Add RTL support if needed

## Support & Documentation

For more information:
- **Medusa Docs**: https://docs.medusajs.com
- **B2B Module**: https://docs.medusajs.com/resources/commerce-modules
- **API Reference**: https://docs.medusajs.com/api

## License
MIT License - See LICENSE file for details

---

**Version**: 1.0.0 (Ethiopia Edition)
**Last Updated**: 2026
