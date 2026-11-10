"use client"

import { updatePassword } from "@/lib/data/customer"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { B2BCustomer } from "@/types"
import { Container, Text, toast } from "@medusajs/ui"
import { useActionState, useEffect, useState } from "react"

const SecurityCard = ({ customer }: { customer: B2BCustomer }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [state, formAction, isPending] = useActionState(updatePassword, {
    success: false,
    error: null,
  })

  useEffect(() => {
    if (state.success) {
      toast.success("Password updated successfully!")
      setIsEditing(false)
    }
  }, [state])

  return (
    <div className="h-fit">
      <Container className="p-0 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-neutral-200 p-4">
          <div className="flex flex-col gap-y-1">
            <Text className="font-medium text-neutral-950">Password</Text>
            {!isEditing && (
              <Text className="text-neutral-500 font-mono tracking-widest text-sm">
                ••••••••••••
              </Text>
            )}
          </div>

          {isEditing && (
            <form action={formAction} className="flex flex-col gap-y-4 pt-2">
              <Input
                label="Current Password"
                name="old_password"
                type="password"
                required
                autoComplete="current-password"
                className="bg-white"
              />
              <Input
                label="New Password (min 8 characters)"
                name="new_password"
                type="password"
                required
                autoComplete="new-password"
                className="bg-white"
              />
              <Input
                label="Confirm New Password"
                name="confirm_password"
                type="password"
                required
                autoComplete="new-password"
                className="bg-white"
              />

              {state.error && (
                <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded p-2">
                  {state.error}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="secondary"
                  type="button"
                  disabled={isPending}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center justify-end gap-2 bg-neutral-50 p-4">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default SecurityCard
