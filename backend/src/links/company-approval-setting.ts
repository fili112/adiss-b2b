import { defineLink } from "@medusajs/framework/utils";
import CompanyModule from "../modules/company/index";
import ApprovalModule from "../modules/approval/index";

export default defineLink(
  CompanyModule.linkable.company,
  ApprovalModule.linkable.approvalSettings
);
