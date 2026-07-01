import { RegisterForm } from "@/components/sections/auth/registerForm/RegisterForm";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return <RegisterForm lng={lng} />;
}
