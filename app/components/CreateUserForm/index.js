"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
import { useAuth } from "../../context/AuthUserContext";

export default function CreateUserForm() {
  const { createUserWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const createUserSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      try {
        await createUserWithEmailAndPassword(email, password);
        router.push("/dashboard");
      } catch (error) {
        console.error("User creation failed:", error.message);
        alert("User creation failed: " + error.message);
      }
    },
    [createUserWithEmailAndPassword, router]
  );

  return (
    <div>
      <h2>Create User</h2>
      <form className={styles.formContainer} onSubmit={createUserSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
