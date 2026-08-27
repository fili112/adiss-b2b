import { defineLink } from "@medusajs/framework/utils";
import CompanyModule from "../modules/company/index.js";
import CustomerModule from "@medusajs/medusa/customer";

export default defineLink(
  CompanyModule.linkable.company,
  CustomerModule.linkable.customerGroup
);
