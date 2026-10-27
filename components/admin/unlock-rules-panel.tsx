"use client";

import { useTransition } from "react";
import { setUnlockRuleActive } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { UnlockRule } from "@/lib/types/domain";

function scopeLabel(scope: UnlockRule["scope"]): string {
  switch (scope) {
    case "module_qbank":
      return "Module question bank";
    case "phase_step1_qbank":
      return "Step 1 question bank";
    case "clerkship_step2_qbank":
      return "Step 2 CK question bank";
    case "custom":
      return "Custom access rule";
    default:
      return String(scope).replaceAll("_", " ");
  }
}

function stateLabel(state: UnlockRule["minModuleState"]): string {
  switch (state) {
    case "not_started":
      return "Not started";
    case "in_progress":
      return "In progress";
    case "completed":
    case "mastered":
      return "Complete";
    default:
      return String(state).replaceAll("_", " ");
  }
}

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
              {scopeLabel(rule.scope)} · students need module status:{" "}
              {stateLabel(rule.minModuleState)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={rule.isActive ? "bg-emerald-50 text-emerald-800" : ""}>
              {rule.isActive ? "On for students" : "Turned off"}
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
              {rule.isActive ? "Turn off" : "Turn on"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
