/**
 * Demo Setup Script for Ethiopia B2B Platform
 * 
 * This script creates sample companies, employees, and demonstrates
 * the distributor-business model for Ethiopia.
 * 
 * Run with: npm run demo-setup
 */

import {
  ExecArgs,
  ICustomerModuleService,
} from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
} from "@medusajs/framework/utils";
import { COMPANY_MODULE } from "../modules/company";
import { ICompanyModuleService } from "../types";

export default async function setupDemo({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const customerModuleService: ICustomerModuleService = container.resolve(
    ModuleRegistrationName.CUSTOMER
  );
  const companyModuleService = container.resolve<ICompanyModuleService>(COMPANY_MODULE);

  logger.info("🇪🇹 Setting up Ethiopia B2B Demo Data...");

  // Create Demo Companies (Businesses that buy from distributors)
  logger.info("Creating demo business companies...");

  // Company 1: Large Electronics Retailer in Addis Ababa
  const customer1 = await customerModuleService.createCustomers({
    email: "admin@boleelectronics.et",
    first_name: "Alem",
    last_name: "Tesfaye",
  });

  const company1 = await companyModuleService.createCompanies({
    name: "Bole Electronics Retail",
    email: "orders@boleelectronics.et",
    phone: "+251-11-123-4567",
    address: "Bole Road, Building 42",
    city: "Addis Ababa",
    state: "Addis Ababa",
    zip: "1000",
    country: "Ethiopia",
    currency_code: "ETB",
    spending_limit_reset_frequency: "monthly",
  });

  await companyModuleService.createEmployees({
    customer_id: customer1.id,
    company_id: company1.id,
    is_admin: true,
    spending_limit: 500000, // 500,000 ETB monthly limit for admin
  });

  // Add regular employee
  const customer1b = await customerModuleService.createCustomers({
    email: "buyer@boleelectronics.et",
    first_name: "Kebede",
    last_name: "Alemu",
  });

  await companyModuleService.createEmployees({
    customer_id: customer1b.id,
    company_id: company1.id,
    is_admin: false,
    spending_limit: 100000, // 100,000 ETB monthly limit
  });

  logger.info("✅ Created Bole Electronics Retail with 2 employees");

  // Company 2: Medium-sized IT Business
  const customer2 = await customerModuleService.createCustomers({
    email: "admin@merkato-tech.et",
    first_name: "Hirut",
    last_name: "Bekele",
  });

  const company2 = await companyModuleService.createCompanies({
    name: "Merkato Tech Solutions",
    email: "procurement@merkato-tech.et",
    phone: "+251-11-234-5678",
    address: "Merkato, Arada Subcity",
    city: "Addis Ababa",
    state: "Addis Ababa",
    zip: "1100",
    country: "Ethiopia",
    currency_code: "ETB",
    spending_limit_reset_frequency: "weekly",
  });

  await companyModuleService.createEmployees({
    customer_id: customer2.id,
    company_id: company2.id,
    is_admin: true,
    spending_limit: 300000, // 300,000 ETB weekly limit
  });

  logger.info("✅ Created Merkato Tech Solutions with admin");

  // Company 3: Small Business in Bahir Dar
  const customer3 = await customerModuleService.createCustomers({
    email: "owner@bahirdar-office.et",
    first_name: "Meron",
    last_name: "Haile",
  });

  const company3 = await companyModuleService.createCompanies({
    name: "Bahir Dar Office Supplies",
    email: "contact@bahirdar-office.et",
    phone: "+251-58-123-4567",
    address: "Belay Zeleke Road",
    city: "Bahir Dar",
    state: "Amhara Region",
    zip: "2000",
    country: "Ethiopia",
    currency_code: "ETB",
    spending_limit_reset_frequency: "monthly",
  });

  await companyModuleService.createEmployees({
    customer_id: customer3.id,
    company_id: company3.id,
    is_admin: true,
    spending_limit: 150000, // 150,000 ETB monthly limit
  });

  logger.info("✅ Created Bahir Dar Office Supplies");

  // Company 4: Large Enterprise in Hawassa
  const customer4 = await customerModuleService.createCustomers({
    email: "purchasing@hawassa-corp.et",
    first_name: "Dawit",
    last_name: "Tadesse",
  });

  const company4 = await companyModuleService.createCompanies({
    name: "Hawassa Industrial Corporation",
    email: "orders@hawassa-corp.et",
    phone: "+251-46-123-4567",
    address: "Industrial Park Zone A",
    city: "Hawassa",
    state: "SNNPR",
    zip: "3000",
    country: "Ethiopia",
    currency_code: "ETB",
    spending_limit_reset_frequency: "monthly",
  });

  await companyModuleService.createEmployees({
    customer_id: customer4.id,
    company_id: company4.id,
    is_admin: true,
    spending_limit: 1000000, // 1,000,000 ETB monthly limit for large enterprise
  });

  // Add procurement team member
  const customer4b = await customerModuleService.createCustomers({
    email: "procurement1@hawassa-corp.et",
    first_name: "Sara",
    last_name: "Mohammed",
  });

  await companyModuleService.createEmployees({
    customer_id: customer4b.id,
    company_id: company4.id,
    is_admin: false,
    spending_limit: 250000, // 250,000 ETB monthly limit
  });

  logger.info("✅ Created Hawassa Industrial Corporation with 2 employees");

  // Summary
  logger.info("\n📊 Demo Setup Complete!\n");
  logger.info("=".repeat(60));
  logger.info("🏢 Created 4 Demo Business Companies:");
  logger.info("  1. Bole Electronics Retail (Addis Ababa) - Large Retailer");
  logger.info("     - Admin: admin@boleelectronics.et");
  logger.info("     - Buyer: buyer@boleelectronics.et");
  logger.info("     - Spending: 500,000 ETB/month (admin), 100,000 ETB/month (buyer)");
  logger.info("");
  logger.info("  2. Merkato Tech Solutions (Addis Ababa) - IT Business");
  logger.info("     - Admin: admin@merkato-tech.et");
  logger.info("     - Spending: 300,000 ETB/week");
  logger.info("");
  logger.info("  3. Bahir Dar Office Supplies (Bahir Dar) - Small Business");
  logger.info("     - Owner: owner@bahirdar-office.et");
  logger.info("     - Spending: 150,000 ETB/month");
  logger.info("");
  logger.info("  4. Hawassa Industrial Corporation (Hawassa) - Large Enterprise");
  logger.info("     - Admin: purchasing@hawassa-corp.et");
  logger.info("     - Procurement: procurement1@hawassa-corp.et");
  logger.info("     - Spending: 1,000,000 ETB/month (admin), 250,000 ETB/month (team)");
  logger.info("=".repeat(60));
  logger.info("");
  logger.info("💡 Demo Scenarios:");
  logger.info("  - All companies are Ethiopia-based using ETB currency");
  logger.info("  - Spending limits configured for approval workflows");
  logger.info("  - Companies span multiple Ethiopian cities");
  logger.info("  - Mix of retail, IT, and industrial sectors");
  logger.info("");
  logger.info("🚀 Next Steps:");
  logger.info("  1. Login to admin panel: http://localhost:9000/app");
  logger.info("  2. Go to 'Companies' to view all demo businesses");
  logger.info("  3. Configure approval settings for each company");
  logger.info("  4. Assign customer groups for tiered pricing");
  logger.info("  5. Test quote and order workflows");
  logger.info("");
  logger.info("✨ Ready for demonstration!\n");
}
