"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import styles from "../Profile.module.css";

export default function Profile() {
  const { authUser, loading: authLoading } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!authUser) {
        router.push("/");
      } else {
        const fetchPosts = async () => {
          try {
            const q = query(
              collection(db, "posts"),
              where("userEmail", "==", authUser.email),
              orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate().toISOString(),
            }));
            setUserPosts(postsData);
          } catch (error) {
            console.error("Error fetching posts: ", error);
          } finally {
            setLoading(false);
          }
        };

        fetchPosts();
      }
    }
  }, [authUser, authLoading, router]);

  if (!authUser) {
    return null;
  }

  return (
    <div className={styles.profileWrapper}>
      <h1>{authUser.email}</h1>

      <div className={styles.postsContainer}>
        <h2>Your Posts</h2>
        {userPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className={styles.postsContainerList}>
            {userPosts.map((post) => (
              <div key={post.id} className={styles.profilePost}>
                <h3>{post.fish}</h3>
                <p>{post.outcome}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
