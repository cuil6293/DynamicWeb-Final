"use client";
import { useState } from "react";
import LoginForm from "./components/LoginForm/index";
import CreateUserForm from "./components/CreateUserForm/index";
import styles from "./page.module.css";

export default function Home() {
  const [activeForm, setActiveForm] = useState(null);

  const handleButtonClick = (formType) => setActiveForm(formType);
  const handleCloseForm = () => setActiveForm(null);

  return (
    <div className={styles.pageWrapper}>
      <h1>Fish for Love</h1>
      <div className={styles.formButtonWrapper}>
        {activeForm === null ? (
          <div className={styles.buttonContainer}>
            <h2>Begin your fish love</h2>
            <button onClick={() => handleButtonClick("login")}>Login</button>
            <button onClick={() => handleButtonClick("createUser")}>
              Create User
            </button>
          </div>
        ) : (
          <div className={styles.formContainer}>
            {activeForm === "login" && (
              <div>
                <button onClick={handleCloseForm}> Go Back</button>
                <LoginForm />
              </div>
            )}
            {activeForm === "createUser" && (
              <div>
                <button onClick={handleCloseForm}>Go Back</button>
                <CreateUserForm />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
