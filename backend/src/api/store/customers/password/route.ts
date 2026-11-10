import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export const POST = async (
  req: AuthenticatedMedusaRequest<{
    old_password: string;
    new_password: string;
  }>,
  res: MedusaResponse
) => {
  const customerId = req.auth_context?.actor_id;
  const { old_password, new_password } = req.body || {};

  if (!old_password || !new_password) {
    res.status(400).json({ message: "Both current and new password are required." });
    return;
  }

  if (new_password.length < 8) {
    res.status(400).json({ message: "New password must be at least 8 characters long." });
    return;
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const authModule = req.scope.resolve(Modules.AUTH);

  const {
    data: [customer],
  } = await query.graph({
    entity: "customer",
    fields: ["id", "email"],
    filters: { id: customerId },
  });

  if (!customer?.email) {
    res.status(404).json({ message: "Customer not found." });
    return;
  }

  // 1. Verify old password
  const authResult = await authModule.authenticate("emailpass", {
    body: {
      email: customer.email,
      password: old_password,
    },
  });

  if (!authResult.success) {
    res.status(400).json({ message: "Current password is incorrect." });
    return;
  }

  // 2. Update to new password
  const updateResult = await authModule.updateProvider("emailpass", {
    entity_id: customer.email,
    password: new_password,
  });

  if (!updateResult.success) {
    res.status(400).json({ message: updateResult.error || "Failed to update password." });
    return;
  }

  res.json({ success: true, message: "Password updated successfully." });
};

