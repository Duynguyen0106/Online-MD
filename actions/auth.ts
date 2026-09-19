"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addProvisionedUser, listUsers } from "@/lib/demo/admin-store";
import {
  newId,
  setSessionUserId,
  resetCurrentUserProgress,
} from "@/lib/demo/store";

const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(120),
});

export async function signupStudent(input: unknown) {
  const parsed = signupSchema.parse(input);
  const users = await listUsers();
  if (users.some((u) => u.email.toLowerCase() === parsed.email.toLowerCase())) {
    throw new Error("An account with that email already exists");
  }
  const user = await addProvisionedUser({
    id: newId("user"),
    email: parsed.email.toLowerCase().trim(),
    fullName: parsed.fullName.trim(),
    role: "student",
  });
  await setSessionUserId(user.id);
  revalidatePath("/", "layout");
  return { ok: true as const, user };
}

export async function resetDemoProgress() {
  await resetCurrentUserProgress();
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/qbank");
  return { ok: true as const };
}
