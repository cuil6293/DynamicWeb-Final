"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthUserContext";
import CreateUserForm from "../components/CreateUserForm";
import { useEffect } from "react";

export default function CreateUser() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser]);

  return (
    <div>
      <CreateUserForm />
    </div>
  );
}
