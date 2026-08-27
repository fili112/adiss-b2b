import { defineLink } from "@medusajs/framework/utils";
import CompanyModule from "../modules/company/index.js";
import ApprovalModule from "../modules/approval/index.js";

export default defineLink(
  CompanyModule.linkable.company,
  ApprovalModule.linkable.approvalSettings
);
