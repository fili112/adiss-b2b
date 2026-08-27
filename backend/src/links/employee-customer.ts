import { defineLink } from "@medusajs/framework/utils";
import CustomerModule from "@medusajs/medusa/customer";
import CompanyModule from "../modules/company/index.js";

export default defineLink(
  CompanyModule.linkable.employee,
  CustomerModule.linkable.customer
);
