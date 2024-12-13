"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
import { useAuth } from "../../context/AuthUserContext";

export default function LoginUserForm() {
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const loginSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      try {
        await signInWithEmailAndPassword(email, password);
        router.push("/dashboard");
      } catch (error) {
        console.error("User creation failed:", error.message);
        alert("User creation failed: " + error.message);
      }
    },
    [signInWithEmailAndPassword, router]
  );

  return (
    <div>
      <h2>Login User</h2>
      <form className={styles.formContainer} onSubmit={loginSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button type="submit">Login User</button>
      </form>
    </div>
  );
}
