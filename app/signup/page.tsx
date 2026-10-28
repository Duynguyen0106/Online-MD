import { AuthChrome } from "@/components/auth/auth-chrome";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthChrome>
      <SignupForm />
    </AuthChrome>
  );
}
