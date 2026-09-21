// Node.js script to generate a standalone internship_presentation.pdf
const fs = require('fs');
const path = require('path');

function createPresentationPDF() {
  const slides = [
    {
      title: "Ethiopia B2B E-Commerce & Wholesale Ecosystem",
      subtitle: "Multi-Tenant Enterprise Distribution Platform Engineered for Ethiopia",
      tag: "INTERNSHIP CAPSTONE PRESENTATION • FINAL DEFENSE",
      bullets: [
        "Project Scope: Full-Stack Engineering, Localization, B2B Governance & Mobile Commerce",
        "Architecture: Medusa v2 Headless Engine • Next.js 14 Storefront • React Native Expo",
        "Target Market: Addis Ababa Central Warehouse & Nationwide Logistics (ETB Currency)",
        "Core Value: Eliminating Forex friction and manual invoicing with automated corporate workflows"
      ],
      cards: [
        { title: "Distributor & Logistics", text: "Addis Ababa central fulfillment hub managing regional branches nationwide." },
        { title: "B2B Companies & Limits", text: "Multi-seat corporate accounts with granular daily/monthly spending controls." },
        { title: "Omnichannel Apps", text: "Desktop Next.js procurement portal and React Native mobile app for buyers." }
      ]
    },
    {
      title: "Executive Summary & Project Vision",
      subtitle: "Bridging the Digital Divide for Wholesale Commerce Across Ethiopia",
      tag: "CONTEXT & OVERVIEW",
      bullets: [
        "100% Localized Economics: Zero foreign exchange friction with strict Ethiopian Birr (ETB) pricing.",
        "Corporate Hierarchies: Supports multi-tier companies (Bole Electronics, Merkato Tech, Hawassa Industrial).",
        "Role-Based Governance: Distinguishes Company Admins (approvers) from Buyers (purchasers).",
        "Automated Approvals: Eliminates unauthorized corporate expenditure through systematic approval gates."
      ],
      cards: [
        { title: "No Currency Conversion", text: "Entire catalog, shipping rates, and tax lines are exclusively in ETB / Birr." },
        { title: "Custom Quote RFQ", text: "Real-time quote negotiation engine for bulk orders of 100+ hardware units." },
        { title: "Nationwide Coverage", text: "Pre-configured logistics covering Addis Ababa, Bahir Dar, Hawassa, and Dire Dawa." }
      ]
    },
    {
      title: "Wholesale Commerce Challenges in Ethiopia",
      subtitle: "Why Generic Global E-Commerce Platforms Fail in the Local Market",
      tag: "PROBLEM ANALYSIS",
      bullets: [
        "Foreign Currency Dependency: Standard platforms enforce USD/EUR, causing accounting and banking havoc.",
        "Absence of Corporate Controls: B2C shopping carts lack employee spending caps and departmental budgets.",
        "Manual Negotiation Friction: High-ticket wholesale deals stall over fragmented phone calls and paper quotes.",
        "Desktop vs Mobile Disconnect: Ethiopian retail merchants operate primarily on smartphones in commercial hubs."
      ],
      cards: [
        { title: "Accounting Mismatches", text: "Fluctuating forex rates make USD-denominated software unviable for local trade." },
        { title: "Risk of Rogue Orders", text: "Without automated approvals, organizations risk unbudgeted department purchases." },
        { title: "Slow Quoting Cycles", text: "Manual RFQs take days to resolve, leading to lost enterprise accounts." }
      ]
    },
    {
      title: "End-to-End System Architecture",
      subtitle: "Modern Headless Micro-Modular Infrastructure for Enterprise Scalability",
      tag: "TECHNICAL ARCHITECTURE",
      bullets: [
        "Presentation Tier: Next.js 14 Web Portal (SSR) & React Native Expo Mobile Application.",
        "API & Business Logic Tier: Medusa v2 Headless Commerce Engine with custom B2B remote links.",
        "Data & Persistence Tier: PostgreSQL 16 relational database with Redis caching and event pub/sub.",
        "Cloud Infrastructure: Deployed backend on Render cloud with automated CI/CD and secure environments."
      ],
      cards: [
        { title: "Frontend (Web & Mobile)", text: "Next.js 14 SSR Storefront + React Native / Expo Native App for iOS and Android." },
        { title: "Headless Core", text: "Medusa v2 micro-kernel with custom Company, Approval, and Quote modules." },
        { title: "Cloud Database", text: "PostgreSQL 16 persistence with Redis queue and Render cloud deployment." }
      ]
    },
    {
      title: "Distributor-to-Business Hierarchy Model",
      subtitle: "Multi-Tenant Organizational Structure with Fine-Grained Governance",
      tag: "CORE B2B INNOVATION 1",
      bullets: [
        "Distributor Tier: Central seller (Addis Ababa warehouse) managing catalogs, tiers, and inventory.",
        "Company Tier: Corporate buyers (e.g., Bole Electronics, Merkato Tech, Bahir Dar Office, Hawassa Industrial).",
        "Employee Tier: Corporate Admins (set budgets, approve orders) and Buyers (place orders within limits).",
        "Spending Limit Rules: Configurable daily, weekly, monthly, or yearly spending caps per employee."
      ],
      cards: [
        { title: "Bole Electronics Retail", text: "Addis Ababa • Gold Tier (10% off) • 500,000 ETB monthly spending limit." },
        { title: "Merkato Tech Solutions", text: "Addis Ababa • Silver Tier (5% off) • 300,000 ETB weekly spending limit." },
        { title: "Hawassa Industrial Corp", text: "Hawassa • Platinum Tier (15% off) • 1,000,000 ETB monthly spending limit." }
      ]
    },
    {
      title: "Multi-Stage Approval Workflows",
      subtitle: "Automated Financial Controls Eliminating Unauthorized Corporate Spending",
      tag: "CORE B2B INNOVATION 2",
      bullets: [
        "Step 1 (Order Initiation): Buyer places order. System verifies order total against active employee limit.",
        "Step 2 (Threshold Verification): If total <= limit, order completes; if total > limit, order pauses.",
        "Step 3 (Company Admin Review): Admin receives notification, inspects line items, and approves/rejects.",
        "Step 4 (Distributor Confirmation): For high-volume orders, distributor sales manager verifies inventory."
      ],
      cards: [
        { title: "Automatic Guardrails", text: "Purchasing officers cannot accidentally exceed allocated department budgets." },
        { title: "Transparent Audit Trail", text: "Every approval or rejection records employee ID, timestamp, and comments." },
        { title: "Zero Cart Drop-Off", text: "Orders are preserved in pending state rather than rejected at checkout." }
      ]
    },
    {
      title: "B2B Quote Negotiation Engine (RFQ)",
      subtitle: "Digital Price Negotiation Engine for High-Volume Enterprise Transactions",
      tag: "CORE B2B INNOVATION 3",
      bullets: [
        "Request For Quote: Buyers submit custom RFQ for bulk items (e.g., 100x monitors for university lab).",
        "Distributor Counter-Offer: Sales team reviews warehouse inventory and offers custom volume discount.",
        "Acceptance & Locking: Customer accepts offer with 1-click; prices lock and convert to draft order.",
        "Cross-Platform Flow: Entire negotiation workflow is supported across Web Storefront and Mobile App."
      ],
      cards: [
        { title: "Custom Bulk Pricing", text: "Enables flexible margin adjustments based on customer loyalty and volume." },
        { title: "Inventory Reservation", text: "Temporarily holds stock during active negotiation window to prevent stockouts." },
        { title: "Audit & Messaging", text: "Complete timestamped message thread preserved between buyer and seller." }
      ]
    },
    {
      title: "Tiered Customer Pricing & Catalog in ETB",
      subtitle: "Rewarding Partner Loyalty and Volume Purchases with Transparent Birr Pricing",
      tag: "MONETARY ENGINEERING",
      bullets: [
        "Customer Loyalty Tiers: Bronze (Standard), Silver (5% OFF), Gold (10% OFF), Platinum (15% OFF).",
        "Automated Bulk Breaks: 1-10 units (Base), 11-50 units (+3%), 51-100 units (+5%), 100+ units (+8% or RFQ).",
        "Single-Currency Enforcement: Eliminated foreign exchange overhead; all prices stored and displayed in ETB.",
        "Currency Map Customization: Configured 'Br' symbol priority in backend admin and storefront components."
      ],
      cards: [
        { title: "16\" Pro Laptop", text: "129,900 ETB Base • 116,910 ETB (Gold Tier) • Multi-spec variants." },
        { title: "34\" UltraWide Monitor", text: "59,900 ETB Base • 53,910 ETB (Gold Tier) • Volume discount eligible." },
        { title: "Enterprise Headset", text: "14,900 ETB Base • 13,410 ETB (Gold Tier) • Office accessories category." }
      ]
    },
    {
      title: "Addis B2B Mobile App (React Native + Expo)",
      subtitle: "Delivering Enterprise Wholesale Commerce to Mobile Devices Across Ethiopia",
      tag: "CROSS-PLATFORM INNOVATION",
      bullets: [
        "Live Backend Connection: Directly consumes the live Render Medusa API via publishable API keys.",
        "Wholesale-First UX: Stepper controls for bulk quantity ordering (10x, 50x, 100x) and variant selection.",
        "Mobile Quote Requests: Field buyers can submit RFQs directly from smartphones in commercial markets.",
        "Cross-Platform Deployment: Built with React Native & Expo for seamless execution on iOS and Android."
      ],
      cards: [
        { title: "Instant Live Reload", text: "Rapid development and QR-code testing via the free Expo Go mobile client." },
        { title: "Corporate Auth", text: "Employee login displaying corporate spending balance and approval rights." },
        { title: "Native Performance", text: "Smooth 60 FPS catalog navigation, image caching, and resilient networking." }
      ]
    },
    {
      title: "Key Contributions & Engineering Tasks",
      subtitle: "Full-Stack Development, Architectural Customization, and Documentation",
      tag: "INTERNSHIP DELIVERABLES",
      bullets: [
        "Backend Customization: Registered ETB currency symbol in currency-symbol-map.ts and refactored seed.ts.",
        "Geographic Setup: Configured Ethiopia-only region, tax zones, and Addis Ababa fulfillment warehouse.",
        "Mobile App Development: Engineered complete Addis B2B Expo React Native mobile application from scratch.",
        "Documentation & Guides: Created 1,500+ lines of comprehensive documentation and live demo checklists."
      ],
      cards: [
        { title: "Currency & Region", text: "Fixed seed scripts, removed EUR/USD defaults, and configured ETB priority." },
        { title: "Mobile Client", text: "Engineered React Native app with catalog, cart, variants, and quote flows." },
        { title: "Technical Docs", text: "Authored ETHIOPIA_SETUP.md, DEMO_CHECKLIST.md, and B2B_MODEL_EXPLAINED.md." }
      ]
    },
    {
      title: "Technical Challenges & Solutions",
      subtitle: "Overcoming Complex Integration and Architectural Hurdles During Development",
      tag: "PROBLEM SOLVING",
      bullets: [
        "Medusa v2 Remote Links: Solved complex entity relations between Companies, Employees, and Limits.",
        "Approval State Machine: Designed safe intermediate order state preventing premature payment authorization.",
        "Multi-Currency Eradication: Eliminated stubborn hardcoded foreign currency defaults from legacy seed data.",
        "Mobile Network Resilience: Implemented defensive error handling and timeout recovery for mobile clients."
      ],
      cards: [
        { title: "Remote Link Engine", text: "Leveraged Medusa v2 micro-link architecture to join B2B tables cleanly." },
        { title: "Interim Order State", text: "Held cart line items without capturing payment until admin authorization." },
        { title: "Seed Pipeline Overhaul", text: "Re-engineered database seeding to enforce single-currency ETB integrity." }
      ]
    },
    {
      title: "Demonstration Scenarios & Validation",
      subtitle: "Empirical Testing Verifying End-to-End Reliability Across All Enterprise Use Cases",
      tag: "SYSTEM VERIFICATION",
      bullets: [
        "Scenario 1 (Standard Order): Buyer Kebede orders 2x webcams (6,400 ETB) -> Instant checkout success.",
        "Scenario 2 (Limit Exceeded): Buyer Kebede orders 10x laptops (1.299M ETB) -> Successfully routed to Admin.",
        "Scenario 3 (Volume RFQ): Hawassa Industrial submits quote for 100x monitors -> Negotiated to 5.4M ETB.",
        "100% Validation Rate: All B2B authorization gates and status transitions passed live testing."
      ],
      cards: [
        { title: "Routine Purchasing", text: "Verified friction-free checkout for everyday orders within employee limits." },
        { title: "Budget Governance", text: "Verified secure halts when spending thresholds are breached." },
        { title: "Enterprise Deals", text: "Verified multi-million Birr volume quote negotiation and order creation." }
      ]
    },
    {
      title: "Future Roadmap & Strategic Enhancements",
      subtitle: "Scaling the Platform to Power Wholesale Distribution Across the Horn of Africa",
      tag: "LOOKING AHEAD",
      bullets: [
        "Ethiopian FinTech Integration: Direct payment SDK integration for Telebirr, CBE Birr, and Chapa.",
        "Offline-First Mobile Architecture: SQLite caching allowing field ordering during cellular network dropouts.",
        "Enterprise ERP Connectors: Bi-directional inventory and accounting sync with Odoo and SAP systems.",
        "Ministry of Revenues (MOR) Invoicing: Automated generation of compliant Ethiopian electronic tax receipts."
      ],
      cards: [
        { title: "Telebirr & CBE Birr", text: "Enabling direct mobile wallet settlement for millions of business users." },
        { title: "Offline Field Mode", text: "Order queueing and automatic sync for regional distribution routes." },
        { title: "ERP Integration", text: "Real-time synchronization with centralized warehouse ERP databases." }
      ]
    },
    {
      title: "Conclusion & Key Learnings",
      subtitle: "Reflections on Technical Growth, Project Outcomes, and Final Defense",
      tag: "FINAL SUMMARY",
      bullets: [
        "Technical Mastery: Hands-on expertise in headless commerce, Next.js 14, TypeScript, and React Native Expo.",
        "Domain Expertise: Mastered B2B enterprise workflows, corporate spending limits, and multi-tier pricing.",
        "Practical Impact: Delivered a production-ready, highly customized e-commerce ecosystem for Ethiopia.",
        "Ready for Demonstration: Prepared to showcase live admin dashboards, mobile client, and approval flows."
      ],
      cards: [
        { title: "Headless Architecture", text: "Learned to build modular, decoupled enterprise micro-services." },
        { title: "Market Impact", text: "Built a customized platform solving real Ethiopian wholesale bottlenecks." },
        { title: "Live Defense Ready", text: "Available for live demonstration and defense committee questions." }
      ]
    }
  ];

  // PDF stream generation
  let objects = [];
  function addObject(content) {
    objects.push(content);
    return objects.length; // 1-indexed ID
  }

  // Pre-allocate objects
  // Obj 1: Catalog
  // Obj 2: Pages
  // Obj 3: Font F1 (Helvetica)
  // Obj 4: Font F2 (Helvetica-Bold)
  // Obj 5: Font F3 (Helvetica-Oblique)
  const fontF1Obj = 3;
  const fontF2Obj = 4;
  const fontF3Obj = 5;

  let pageObjIds = [];
  let contentObjIds = [];

  // Slide geometry: A4 Landscape (842 x 595 points)
  const W = 842;
  const H = 595;

  slides.forEach((slide, idx) => {
    // Generate content stream for slide
    let stream = "";
    
    // Background
    stream += "q\n";
    stream += "0.04 0.06 0.10 rg\n"; // Deep dark background #0a0f1a
    stream += `0 0 ${W} ${H} re f\n`;

    // Ambient glow shapes (decorations)
    stream += "0.06 0.12 0.20 rg\n";
    stream += "700 450 200 200 re f\n";
    stream += "0.04 0.08 0.14 rg\n";
    stream += "-50 -50 250 250 re f\n";

    // Header Tag Pill
    stream += "0.06 0.72 0.50 rg\n"; // Emerald green
    stream += `48 ${H - 52} 240 18 re f\n`;
    stream += "0.04 0.06 0.10 rg\n";
    stream += "BT\n";
    stream += `/F2 9 Tf\n`;
    stream += `56 ${H - 46} Td\n`;
    stream += `(${escapePdf(slide.tag)}) Tj\n`;
    stream += "ET\n";

    // Slide Number in Top Right
    stream += "0.60 0.65 0.75 rg\n";
    stream += "BT\n";
    stream += `/F2 11 Tf\n`;
    stream += `${W - 130} ${H - 46} Td\n`;
    stream += `(SLIDE ${String(idx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}) Tj\n`;
    stream += "ET\n";

    // Title
    stream += "1.0 1.0 1.0 rg\n";
    stream += "BT\n";
    stream += `/F2 22 Tf\n`;
    stream += `48 ${H - 84} Td\n`;
    stream += `(${escapePdf(slide.title)}) Tj\n`;
    stream += "ET\n";

    // Subtitle
    stream += "0.62 0.68 0.78 rg\n";
    stream += "BT\n";
    stream += `/F1 12 Tf\n`;
    stream += `48 ${H - 104} Td\n`;
    stream += `(${escapePdf(slide.subtitle)}) Tj\n`;
    stream += "ET\n";

    // Decorative line under header
    stream += "0.15 0.22 0.35 rg\n";
    stream += `48 ${H - 116} ${W - 96} 1.5 re f\n`;

    // Left Column: Key Highlights / Bullets (Box)
    const colW = (W - 96 - 24) / 2; // ~346 pt
    const colH = 370;
    const colY = H - 130 - colH; // ~95 pt

    stream += "0.07 0.10 0.16 rg\n"; // Card background
    stream += `48 ${colY} ${colW} ${colH} re f\n`;
    // Border
    stream += "0.15 0.22 0.35 RG 1 w\n";
    stream += `48 ${colY} ${colW} ${colH} re S\n`;

    // Left Box Header
    stream += "0.06 0.72 0.50 rg\n";
    stream += "BT\n";
    stream += `/F2 13 Tf\n`;
    stream += `64 ${colY + colH - 28} Td\n`;
    stream += `(Key Architecture & Implementation) Tj\n`;
    stream += "ET\n";

    // Left Bullets
    let bulletY = colY + colH - 58;
    slide.bullets.forEach((b) => {
      // Split bullet into 2 lines if long
      const wrapped = wrapText(b, 42);
      stream += "0.06 0.72 0.50 rg\n";
      stream += "BT\n";
      stream += `/F2 11 Tf\n`;
      stream += `64 ${bulletY} Td\n`;
      stream += `(*) Tj\n`;
      stream += "ET\n";

      stream += "0.85 0.88 0.94 rg\n";
      stream += "BT\n";
      stream += `/F1 10.5 Tf\n`;
      stream += `78 ${bulletY} Td\n`;
      stream += `(${escapePdf(wrapped[0] || "")}) Tj\n`;
      if (wrapped[1]) {
        stream += `\n0 -14 Td\n(${escapePdf(wrapped[1])}) Tj\n`;
      }
      if (wrapped[2]) {
        stream += `\n0 -14 Td\n(${escapePdf(wrapped[2])}) Tj\n`;
      }
      stream += "ET\n";

      bulletY -= (wrapped.length * 15 + 14);
    });

    // Right Column: 3 Structured Cards
    const cardH = (colH - 20) / 3;
    slide.cards.forEach((card, cIdx) => {
      const cardY = colY + colH - (cIdx + 1) * cardH - (cIdx * 10);
      stream += "0.08 0.12 0.20 rg\n";
      stream += `${48 + colW + 24} ${cardY} ${colW} ${cardH} re f\n`;
      stream += "0.20 0.30 0.45 RG 1 w\n";
      stream += `${48 + colW + 24} ${cardY} ${colW} ${cardH} re S\n`;

      // Card Title
      stream += "0.96 0.72 0.20 rg\n"; // Golden Amber
      stream += "BT\n";
      stream += `/F2 12 Tf\n`;
      stream += `${48 + colW + 40} ${cardY + cardH - 24} Td\n`;
      stream += `(${escapePdf(card.title)}) Tj\n`;
      stream += "ET\n";

      // Card Description
      const descLines = wrapText(card.text, 44);
      stream += "0.80 0.84 0.90 rg\n";
      stream += "BT\n";
      stream += `/F1 10 Tf\n`;
      stream += `${48 + colW + 40} ${cardY + cardH - 42} Td\n`;
      stream += `(${escapePdf(descLines[0] || "")}) Tj\n`;
      if (descLines[1]) {
        stream += `\n0 -13 Td\n(${escapePdf(descLines[1])}) Tj\n`;
      }
      if (descLines[2]) {
        stream += `\n0 -13 Td\n(${escapePdf(descLines[2])}) Tj\n`;
      }
      stream += "ET\n";
    });

    // Footer
    stream += "0.45 0.50 0.60 rg\n";
    stream += "BT\n";
    stream += `/F1 9 Tf\n`;
    stream += `48 24 Td\n`;
    stream += `(Ethiopia B2B E-Commerce Platform • Internship Capstone Defense • Medusa v2 | Next.js 14 | React Native Expo) Tj\n`;
    stream += "ET\n";

    stream += "BT\n";
    stream += `/F2 9 Tf\n`;
    stream += `${W - 130} 24 Td\n`;
    stream += `(Addis Ababa, Ethiopia) Tj\n`;
    stream += "ET\n";

    stream += "Q\n";

    contentObjIds.push(stream);
  });

  function escapePdf(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  function wrapText(text, maxChars) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = "";

    words.forEach(word => {
      if ((currentLine + " " + word).trim().length <= maxChars) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Assemble PDF document objects
  // 1: Catalog
  // 2: Pages
  // 3: Font F1
  // 4: Font F2
  // 5: Font F3
  // 6..(6 + 14 - 1): Page objects
  // (6 + 14)..(6 + 28 - 1): Content stream objects

  const startPageObj = 6;
  const startContentObj = startPageObj + slides.length;

  let body = "";
  let offsets = {};

  function recordOffset(objId) {
    offsets[objId] = body.length;
  }

  body += "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";

  // Obj 1: Catalog
  recordOffset(1);
  body += "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";

  // Obj 2: Pages
  recordOffset(2);
  let kidsStr = "";
  for (let i = 0; i < slides.length; i++) {
    kidsStr += `${startPageObj + i} 0 R `;
  }
  body += `2 0 obj\n<< /Type /Pages /Kids [ ${kidsStr}] /Count ${slides.length} >>\nendobj\n`;

  // Obj 3: Font F1 (Helvetica)
  recordOffset(3);
  body += "3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";

  // Obj 4: Font F2 (Helvetica-Bold)
  recordOffset(4);
  body += "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n";

  // Obj 5: Font F3 (Helvetica-Oblique)
  recordOffset(5);
  body += "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n";

  // Page Objects
  for (let i = 0; i < slides.length; i++) {
    const pId = startPageObj + i;
    const cId = startContentObj + i;
    recordOffset(pId);
    body += `${pId} 0 obj\n`;
    body += `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${cId} 0 R `;
    body += `/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> >>\n`;
    body += "endobj\n";
  }

  // Content Objects
  for (let i = 0; i < slides.length; i++) {
    const cId = startContentObj + i;
    const streamContent = contentObjIds[i];
    recordOffset(cId);
    body += `${cId} 0 obj\n`;
    body += `<< /Length ${Buffer.byteLength(streamContent, 'utf8')} >>\n`;
    body += `stream\n${streamContent}\nendstream\n`;
    body += "endobj\n";
  }

  // Xref table
  const startXref = body.length;
  const totalObjs = startContentObj + slides.length - 1;

  body += `xref\n0 ${totalObjs + 1}\n`;
  body += "0000000000 65535 f \n";
  for (let i = 1; i <= totalObjs; i++) {
    const off = String(offsets[i]).padStart(10, '0');
    body += `${off} 00000 n \n`;
  }

  body += `trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\n`;
  body += `startxref\n${startXref}\n%%EOF\n`;

  const outputPath = path.join(__dirname, 'internship_presentation.pdf');
  fs.writeFileSync(outputPath, body, 'binary');
  console.log(`Successfully generated ${outputPath} (${body.length} bytes, ${slides.length} slides)`);
}

createPresentationPDF();
