import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { getSessionUser } from "@/lib/demo/store";
import { listUsers } from "@/lib/demo/admin-store";

export default async function AdminUsersPage() {
  const user = await getSessionUser();
  if (user.role !== "admin") {
    return (
      <AppShell title="Users">
        <p className="text-sm text-[var(--muted)]">Admin only.</p>
      </AppShell>
    );
  }
  const users = await listUsers();
  return (
    <AppShell title="Users">
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Id</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[var(--border)]">
                <td className="p-3">{u.fullName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <Badge>{u.role}</Badge>
                </td>
                <td className="p-3 text-xs text-[var(--muted)]">{u.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
