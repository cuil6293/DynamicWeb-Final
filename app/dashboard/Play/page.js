// /app/Play/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import fishData from "../fish.json";
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "../Play.module.css";

export default function Play() {
  const [fish, setFish] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const getRandomFish = () => {
    const randomIndex = Math.floor(Math.random() * fishData.length);
    setFish(fishData[randomIndex]);
    setSelectedAnswer(null);
    setResult(null);
  };

  useEffect(() => {
    getRandomFish();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === fish.answers[0].answer) {
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
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (!fish) return <p>Loading...</p>;

  return (
    <div className={styles.gameContainer}>
      <div className={styles.fishImage}>
        <img src={fish.image} alt={fish.fish} />
      </div>

      {}
      {selectedAnswer === null ? (
        <>
          <div className={styles.question}>{fish.question}</div>
          <div className={styles.answers}>
            {fish.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.answer)}
                className={styles.answerButton}
              >
                {answer.answerText}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {}
          <div className={styles.result}>{result}</div>

          {}
          <button onClick={getRandomFish} className={styles.swimButton}>
            Swim
          </button>
        </>
      )}
    </div>
  );
}
