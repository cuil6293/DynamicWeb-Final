// /app/dashboard/DashboardLayout.js
import Link from "next/link";
import styles from "./Dashboard.module.css";

export default function DashboardLayout({
  isLoggedIn,
  logoutUserFunction,
  children,
}) {
  return (
    <div>
      <header className={styles.HeaderWrapper}>
        <div className={styles.TitleWrapper}>
          <h1>Fish for Love</h1>
        </div>
        <nav>
          <div className={styles.NavWrapper}>
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
                <Link href="/">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>{" "}
    </div>
  );
}
