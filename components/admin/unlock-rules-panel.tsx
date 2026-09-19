"use client";

import { useTransition } from "react";
import { setUnlockRuleActive } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { UnlockRule } from "@/lib/types/domain";

export function UnlockRulesPanel({ rules }: { rules: UnlockRule[] }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <div>
            <p className="font-medium">{rule.name}</p>
            <p className="text-xs text-[var(--muted)]">
              scope: {rule.scope} · min state: {rule.minModuleState}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={rule.isActive ? "bg-emerald-50 text-emerald-800" : ""}>
              {rule.isActive ? "active" : "disabled"}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await setUnlockRuleActive({
                    ruleId: rule.id,
                    isActive: !rule.isActive,
                  });
                });
              }}
            >
              {rule.isActive ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
