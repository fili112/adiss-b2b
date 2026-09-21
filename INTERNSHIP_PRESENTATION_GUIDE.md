# 🎓 Internship Project Presentation & Defense Guide

**Project**: Ethiopia B2B E-Commerce & Wholesale Ecosystem  
**Tech Stack**: Medusa v2 (Headless Engine) • Next.js 14 (Web Storefront) • React Native / Expo (Mobile App)  
**Deliverables Created**:
- 📄 **Presentation PDF File**: [`internship_presentation.pdf`](file:///c:/Users/user%20A/Music/medusa-b2b/internship_presentation.pdf)
- 🖥️ **Interactive Slide Deck**: [`internship_presentation.html`](file:///c:/Users/user%20A/Music/medusa-b2b/internship_presentation.html) (with 1-click Export to PDF, presentation mode, timer, and speaker notes)

---

## ⏱️ Recommended 15-Minute Defense Timing

| Slide # | Slide Title | Speaking Time | Focus Area |
|:-------:|:------------|:-------------:|:-----------|
| **01** | Title & Project Cover | 1 min | Context, stack, project scope |
| **02** | Executive Summary & Vision | 1 min | Ethiopian localization, B2B model |
| **03** | Ethiopian Wholesale Challenges | 1.5 min | Forex issues, lack of governance, RFQ delay |
| **04** | End-to-End System Architecture | 1.5 min | 4-tier stack (Presentation, API, DB, Cloud) |
| **05** | Distributor-to-Business Hierarchy | 1.5 min | Company entities, employee roles, spending limits |
| **06** | Multi-Stage Approval Workflows | 1.5 min | Budget evaluation, threshold halts, approval gate |
| **07** | B2B Quote Negotiation Engine (RFQ) | 1.5 min | High-volume negotiation, counter-offers, draft orders |
| **08** | Dynamic Tiered Pricing in ETB | 1 min | Bronze/Silver/Gold/Platinum tiers + volume breaks |
| **09** | Addis B2B Mobile App (Expo) | 1.5 min | Live Render backend, mobile wholesale UX, Expo Go |
| **10** | Key Contributions & Tasks | 1.5 min | What you individually engineered and customized |
| **11** | Technical Challenges Overcome | 1.5 min | Remote links, state transitions, currency purges |
| **12** | Demonstration & Verification | 1.5 min | Routine order, limit exceedance, volume RFQ |
| **13** | Future Roadmap | 1 min | Telebirr / CBE Birr, offline sync, ERP |
| **14** | Conclusion & Defense Q&A | 1.5 min | Core learnings, opening floor for questions |

---

## 🎤 Slide-by-Slide Script & Talking Points

### Slide 01: Cover & Opening
> *"Good morning, respected professors, supervisors, and committee members. Today I am presenting my internship capstone project: the **Ethiopia B2B E-Commerce & Wholesale Ecosystem**. Unlike conventional B2C shopping sites, this platform is an enterprise-grade multi-tenant distribution engine specifically customized for the Ethiopian commercial landscape using Medusa v2, Next.js 14, and React Native Expo."*

### Slide 02: Executive Summary & Project Vision
> *"Wholesale commerce in Ethiopia relies heavily on manual, paper-driven processes, fragmented WhatsApp negotiations, and cash settlements. Our vision was to engineer a localized digital platform that eliminates foreign currency friction with 100% Ethiopian Birr (ETB) pricing, introduces corporate governance with employee spending limits, and provides omnichannel accessibility across desktop web and native mobile apps."*

### Slide 03: Industry Problem Analysis
> *"Why can't Ethiopian enterprises simply adopt Shopify, Magento, or WooCommerce? There are four critical reasons: First, foreign platforms enforce multi-currency and foreign exchange mechanisms that conflict with domestic ETB banking regulations. Second, they treat every user as an individual retail shopper—there are no corporate department budgets or approval workflows. Third, wholesale transactions require dynamic price negotiations (RFQ) rather than rigid shelf prices. And fourth, Ethiopian merchants in commercial centers like Merkato operate primarily on mobile phones rather than desktop computers."*

### Slide 04: End-to-End System Architecture
> *"To solve this, we implemented a decoupled, headless architecture organized into four tiers: At the client layer, we have a Next.js 14 SSR web storefront and a native React Native Expo mobile app. In the business logic layer, Medusa v2 manages our custom B2B modules—including Companies, Approvals, and Quotes. Data is persisted in PostgreSQL 16 with Redis for real-time caching and pub/sub messaging. The backend is deployed on Render cloud, and the frontend on Vercel."*

### Slide 05: Distributor-to-Business Hierarchy Model
> *"Our primary architectural innovation is the Company Hierarchy. The distributor (seller) operates from a central warehouse in Addis Ababa. Customers are registered as business companies—such as Bole Electronics, Merkato Tech, and Hawassa Industrial. Each company has assigned credit tiers and spending allowances. Within each company are employees assigned specific roles: Admins who manage budgets and approve purchases, and Purchasing Officers who can order within strictly enforced monthly or weekly caps."*

### Slide 06: Multi-Stage Approval Workflows
> *"How does the platform enforce financial controls? When an employee places an order within their limit—such as 6,400 ETB for webcams—the order clears immediately. However, if an employee attempts an order of 1.29 million ETB exceeding their 100,000 ETB limit, the checkout does not fail or charge the customer. It transitions into an intermediate 'REQUIRES_APPROVAL' status. The Company Admin receives an alert, inspects the line items, and decides whether to approve or reject. Upon approval, it progresses to the distributor's sales manager for stock allocation and fulfillment."*

### Slide 07: B2B Quote Negotiation Engine (RFQ)
> *"For high-ticket bulk hardware orders, such as 100 monitors valued at nearly 6 million Birr, fixed prices are not ideal. We built a Request For Quote (RFQ) engine. The client submits a quote with custom delivery notes. The distributor reviews warehouse stock and issues a counter-offer—for example, reducing the price to 5.4 million Birr. The client can accept the counter-offer with one click directly in the web portal or mobile app, instantly generating a binding draft order with price protection."*

### Slide 08: Tiered Customer Pricing & Catalog in ETB
> *"We implemented a dual-layer pricing structure. First, customer loyalty groups: Bronze (base), Silver (5% discount), Gold (10% discount), and Platinum (15% discount). Second, automated quantity breaks: orders of 11 to 50 units receive an additional 3% volume rebate, and 51 to 100 units receive 5%. All prices, taxes, and shipping rates are strictly in Ethiopian Birr, backed by a custom currency symbol priority mapping for 'Br'."*

### Slide 09: Addis B2B Mobile App (React Native + Expo)
> *"Recognizing that wholesale shop owners in regional hubs like Bahir Dar, Hawassa, and Dire Dawa are mobile-first, I developed the Addis B2B Mobile Application using React Native and Expo. It connects directly to our live Render backend using publishable API keys. It features wholesale-specific UX controls—such as bulk increment steppers, multi-variant selectors, employee budget indicators, and an on-the-go quote submission interface."*

### Slide 10: Key Internship Contributions
> *"My individual deliverables during this internship spanned backend engineering, frontend localization, and mobile development: I registered ETB priority in Medusa's currency map, refactored database seed pipelines to purge foreign currency defaults, configured the Ethiopia-only geographic region and central warehouse, built the React Native mobile application from scratch, and authored over 1,500 lines of comprehensive technical documentation and demo checklists."*

### Slide 11: Technical Challenges & Solutions
> *"I encountered and overcame three notable technical challenges: First, Medusa v2's micro-kernel architecture required linking custom Company models to core Customer entities without database lockups; I solved this using Medusa Remote Links. Second, managing order approval state transitions without prematurely capturing payment required designing a dedicated intermediate authorization state with inventory soft-locks. Third, legacy seed scripts had hardcoded EUR/USD pricing matrices that broke localization; I overhauled the seed pipeline to enforce single-currency ETB integrity."*

### Slide 12: Demonstration Scenarios & Validation
> *"We rigorously validated the platform across three core scenarios: Scenario 1 confirmed routine purchasing under budget. Scenario 2 proved that orders exceeding limits safely pause for administrative review. Scenario 3 demonstrated volume RFQ negotiation and draft order creation. All business logic rules and state transitions achieved a 100% test pass rate."*

### Slide 13: Future Roadmap
> *"For subsequent platform iterations, three strategic milestones are identified: First, direct integration with Ethiopian FinTech APIs, specifically Telebirr SuperApp SDK, CBE Birr, and Chapa. Second, implementing an offline-first SQLite synchronization layer on the mobile app for regional distribution zones with intermittent cellular connectivity. Third, building bi-directional ERP connectors for Odoo and SAP to automate Ethiopian Ministry of Revenues electronic tax invoices."*

### Slide 14: Conclusion & Q&A
> *"In conclusion, this internship provided invaluable practical mastery in headless enterprise architecture, TypeScript, Next.js 14, and React Native mobile engineering, while producing a tangible, localized wholesale platform ready for real Ethiopian businesses. Thank you, and I now welcome your questions and invite you to view the live demonstration."*

---

## 🎯 Anticipated Defense Questions & Recommended Answers

### Q1: Why did you choose Medusa v2 instead of building from scratch or using WooCommerce?
**Answer**:  
> *"Building an e-commerce backend from scratch would require reinventing cart calculations, inventory reservation, tax rules, and user authentication. WooCommerce and Shopify are tightly coupled B2C platforms that enforce multi-currency and lack native multi-seat company hierarchies. Medusa v2 is a modern headless, micro-modular commerce engine that gives us full control over data models, database links, and custom workflows while providing production-grade security and reliability."*

### Q2: How did you handle the risk of currency mismatches?
**Answer**:  
> *"We enforced single-currency integrity at both the database and application levels. In `backend/src/scripts/seed.ts`, we restricted active currencies exclusively to ETB and removed foreign price sets. In `currency-symbol-map.ts`, we registered `etb: "Br"` as the primary symbol. This prevents accidental foreign currency inputs and avoids exchange rate conversion rounding errors."*

### Q3: What happens to inventory when an order is waiting for approval?
**Answer**:  
> *"When an order exceeds an employee's spending limit, it enters the `REQUIRES_APPROVAL` state. During this time, line items are registered in draft without charging payment. We implement a soft inventory reservation with a expiration window to prevent the same stock from being sold out before the company admin can review the purchase."*

### Q4: How does the mobile app communicate with the backend?
**Answer**:  
> *"The Addis B2B Mobile App is built with React Native and Expo. It uses the Medusa JS Client and Axios to make authenticated REST API calls directly to our live cloud backend on Render (`https://addis-b2b.onrender.com`). Requests pass the publishable API key in the headers to access store endpoints for catalog data, customer authentication, and quote requests."*

---

## 🖥️ How to Present & Export

1. **Direct PDF**:
   - Double-click or open [`internship_presentation.pdf`](file:///c:/Users/user%20A/Music/medusa-b2b/internship_presentation.pdf) in Chrome, Edge, or Adobe Acrobat.

2. **Interactive Presentation & 1-Click PDF Export**:
   - Open [`internship_presentation.html`](file:///c:/Users/user%20A/Music/medusa-b2b/internship_presentation.html) in any browser (Chrome or Edge recommended).
   - Press **"Export / Print to PDF"** (or press `P` / `Ctrl+P`) -> Choose **Destination: Save as PDF** -> Click **Save** to export a 16:9 widescreen presentation PDF.
   - Use `Right Arrow` / `Spacebar` for next slide, `Left Arrow` for previous slide.
   - Press `F` for fullscreen, `N` for speaker notes, and watch the live timer at the top.
