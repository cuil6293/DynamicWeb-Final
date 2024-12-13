"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../Profile.module.css";

export default function Profile() {
  const { authUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    } else {
      const fetchPosts = async () => {
        try {
          const q = query(
            collection(db, "posts"),
            where("userEmail", "==", authUser.email)
          );
          const querySnapshot = await getDocs(q);
          const postsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
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
  }, [authUser, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>{authUser.email}</h1>

      <div className={styles.postsSection}>
        <h2>Your Posts</h2>
        {userPosts.length === 0 ? (
          <p>You haven't posted anything yet.</p>
        ) : (
          <div className={styles.postsList}>
            {userPosts.map((post) => (
              <div key={post.id} className={styles.post}>
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
