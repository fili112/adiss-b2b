# ⚡ Quick Start Guide

Get your Ethiopia B2B platform running in 5 minutes!

---

## 🚀 Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```
⏱️ **~2 minutes**

### Step 2: Configure Environment
```bash
# Copy template
copy .env.template .env

# Edit .env (if needed)
# Default works for local PostgreSQL: postgres://postgres@localhost/medusa-et
```
⏱️ **~30 seconds**

### Step 3: Build & Migrate
```bash
npm run build
```
⏱️ **~1 minute**

### Step 4: Seed Data
```bash
npm run seed
```
**Creates**:
- ✅ Ethiopia region (ETB currency)
- ✅ Addis Ababa warehouse
- ✅ 8 products with ETB pricing
- ✅ Shipping options

⏱️ **~30 seconds**

### Step 5: Create Demo Companies (Optional)
```bash
npm run demo-setup
```
**Creates**:
- ✅ 4 Ethiopian companies
- ✅ 6 employees with roles
- ✅ Realistic data

⏱️ **~10 seconds**

### Step 6: Start Server
```bash
npm run dev
```
⏱️ **~30 seconds**

---

## 🎯 Access the Platform

**Admin Panel**: http://localhost:9000/app

**First Login**:
1. Create your admin account (auto-registration)
2. Enter email and password
3. You're in! 🎉

---

## ✅ What You Have Now

### Companies (4)
1. **Bole Electronics Retail** - Addis Ababa
   - Login: admin@boleelectronics.et
   - Large electronics retailer
   
2. **Merkato Tech Solutions** - Addis Ababa
   - Login: admin@merkato-tech.et
   - IT services business
   
3. **Bahir Dar Office Supplies** - Bahir Dar
   - Login: owner@bahirdar-office.et
   - Small business
   
4. **Hawassa Industrial Corporation** - Hawassa
   - Login: purchasing@hawassa-corp.et
   - Large enterprise

### Products (8)
- 16" Laptop: 125,900-129,900 ETB
- Smartphone: 95,900-99,900 ETB
- Monitor: 59,900 ETB
- Headset: 14,900 ETB
- Keyboard: 9,900 ETB
- Mouse: 7,900 ETB
- Speaker: 5,500-7,900 ETB
- Webcam: 2,900-3,200 ETB

### Features
- ✅ Company management
- ✅ Employee system
- ✅ Approval workflows
- ✅ Quote system
- ✅ Tiered pricing
- ✅ Order tracking

---

## 📚 Next Steps

### For Demo
1. Read: [DEMO_QUICK_REFERENCE.md](DEMO_QUICK_REFERENCE.md)
2. Follow: [DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)
3. Use: [DEMO_PRESENTATION_NOTES.md](DEMO_PRESENTATION_NOTES.md)

### For Understanding
1. Overview: [README.md](README.md)
2. B2B Model: [B2B_MODEL_EXPLAINED.md](B2B_MODEL_EXPLAINED.md)
3. Setup Details: [ETHIOPIA_SETUP.md](ETHIOPIA_SETUP.md)

### For Development
1. Technical: [backend/README.md](backend/README.md)
2. Changes: [CUSTOMIZATION_SUMMARY.md](CUSTOMIZATION_SUMMARY.md)

---

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
# Create database if needed
createdb medusa-et
```

### Port Already in Use
```bash
# Change port in .env or stop conflicting service
# Default port: 9000
```

### Seed Fails
```bash
# Make sure you ran build first
npm run build
npm run seed
```

### Can't Login
- First user auto-becomes admin
- Check email/password
- Try creating new account

---

## 🎯 Quick Demo (10 min)

### 1. Show Companies (2 min)
- Click **Companies**
- Open **Bole Electronics**
- Show employees

### 2. Show Products (2 min)
- Click **Products**
- Open **16" Laptop**
- Show ETB pricing

### 3. Create Customer Group (2 min)
- Go to **Customers** → **Groups**
- Create "Gold Partners"
- Assign to company

### 4. Show Approval Settings (2 min)
- Open company
- Go to **Approval Settings**
- Enable approvals

### 5. Show Quote System (2 min)
- Click **Quotes**
- Show quote flow

---

## 🎉 You're Ready!

Everything is configured for Ethiopia:
- ✅ Currency: Ethiopian Birr (ETB)
- ✅ Region: Ethiopia only
- ✅ Warehouse: Addis Ababa
- ✅ Shipping: Ethiopia-wide
- ✅ Demo data: 4 companies
- ✅ B2B features: All active

**Start exploring the admin panel!**

---

## 📞 Need Help?

Check these docs:
- **Quick**: [DEMO_QUICK_REFERENCE.md](DEMO_QUICK_REFERENCE.md)
- **Detailed**: [ETHIOPIA_SETUP.md](ETHIOPIA_SETUP.md)
- **Visual**: [B2B_MODEL_EXPLAINED.md](B2B_MODEL_EXPLAINED.md)

---

**Total Setup Time**: ~5 minutes  
**Status**: ✅ Ready for Demo  
**Platform**: Ethiopia B2B E-commerce 🇪🇹
