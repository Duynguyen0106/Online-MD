import { requireRole } from "@/lib/auth/require-role";

export default async function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["faculty", "admin"]);
  return children;
}
