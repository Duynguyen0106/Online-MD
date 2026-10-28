import { AuthChrome } from "@/components/auth/auth-chrome";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthChrome>
      <LoginForm />
    </AuthChrome>
  );
}
