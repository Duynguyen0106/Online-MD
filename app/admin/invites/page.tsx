import { AppShell } from "@/components/shared/app-shell";
import { InviteManager } from "@/components/admin/invite-manager";
import { listInvites } from "@/lib/demo/admin-store";

export default async function AdminInvitesPage() {
  const invites = await listInvites();
  return (
    <AppShell title="Faculty / admin invites">
      <p className="mb-6 text-sm text-[var(--muted)]">
        Invite-only provisioning for faculty and admin. Student signup stays on{" "}
        <code>/signup</code>.
      </p>
      <InviteManager invites={invites} />
    </AppShell>
  );
}
