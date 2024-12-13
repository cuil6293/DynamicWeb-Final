"use client";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import CreateUserForm from "./components/CreateUserForm";
import styles from "./page.module.css";

export default function Home() {
  const [activeForm, setActiveForm] = useState(null);

  const handleButtonClick = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  return (
    <div className={styles.page}>
      <h1>Fish for Love</h1>
      <h2>There are plenty of fish in the sea</h2>
      <h2>
        Are you ready to capture their hearts with a new identity? Or will you
        keep your old identity?
      </h2>
      <div className={styles.container}>
        {activeForm === null ? (
          <div className={styles.buttonContainer}>
            <button onClick={() => handleButtonClick("login")}>Old Life</button>
            <button onClick={() => handleButtonClick("createUser")}>
              New Life
            </button>
          </div>
        ) : (
          <div className={styles.formContainer}>
            {activeForm === "login" && (
              <div>
                <LoginForm />
                <button onClick={handleCloseForm}>Close</button>
              </div>
            )}
            {activeForm === "createUser" && (
              <div>
                <CreateUserForm />
                <button onClick={handleCloseForm}>Close</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
