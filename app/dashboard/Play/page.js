"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import fishData from "../fish.json";
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "../Play.module.css";

export default function Play() {
  const { authUser, loading: authLoading } = useAuth();
  const [fish, setFish] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!authUser) {
        router.push("/");
      } else {
        getRandomFish();
      }
    }
  }, [authUser, authLoading, router]);

  const getRandomFish = () => {
    const randomIndex = Math.floor(Math.random() * fishData.length);
    setFish(fishData[randomIndex]);
    setSelectedAnswer(null);
    setResult(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer.answer === true) {
      setResult(fish.win);
      addToFirebase(fish.win);
    } else {
      setResult(fish.lose);
      addToFirebase(fish.lose);
    }
  };

  const addToFirebase = async (outcome) => {
    try {
      await addDoc(collection(db, "posts"), {
        fish: fish.fish,
        outcome: outcome,
        userEmail: authUser.email,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!fish) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.fishImage}>
        <img src={fish.image} alt={fish.fish} />
      </div>

      {selectedAnswer === null ? (
        <>
          <div className={styles.gameStandardText}>
            <h2>{fish.question}</h2>
          </div>
          <div className={styles.gameStandardButton}>
            {fish.answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswer(answer)}>
                {answer.answerText}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.gameStandardText}>
            <h2>{result}</h2>
          </div>
          <div className={styles.gameStandardButton}>
            <button onClick={getRandomFish}>Swim</button>
          </div>
        </>
      )}
    </div>
  );
}
