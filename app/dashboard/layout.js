"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import styles from "./Dashboard.module.css";

export default function DashboardLayout({
  isLoggedIn,
  logoutUserFunction,
  children,
}) {
  const router = useRouter();

  const Logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <header className={styles.headerWrapper}>
        <div className={styles.titleWrapper}>
          <h1>Fish for Love</h1>
        </div>
        <nav>
          <div className={styles.navWrapper}>
            <ul>
              <li>
                <Link href="/dashboard">Home</Link>
              </li>
              <li>
                <Link href="/dashboard/Play">Play</Link>
              </li>
              <li>
                <Link href="/dashboard/Profile">Profile</Link>
              </li>
              <li>
                <button onClick={Logout} className={styles.logoutButton}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
