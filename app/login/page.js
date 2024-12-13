"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/Loginform";
import { useAuth } from "../context/AuthUserContext";

export default function Login() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/dashboard");
  }, [authUser, router]);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
