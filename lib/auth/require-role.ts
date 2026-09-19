import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/demo/store";
import type { UserRole } from "@/lib/types/domain";

export async function requireRole(roles: UserRole[]) {
  const user = await getSessionUser();
  if (!roles.includes(user.role)) {
    redirect("/login");
  }
  return user;
}
