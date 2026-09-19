import { AcceptInviteForm } from "@/components/auth/accept-invite-form";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <AcceptInviteForm token={token} />
    </div>
  );
}
