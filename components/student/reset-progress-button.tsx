"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { resetDemoProgress } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function ResetProgressButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await resetDemoProgress();
          router.refresh();
        });
      }}
    >
      Reset demo progress
    </Button>
  );
}
