"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "../lib/firebase.js";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { authUser, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authUser && !authLoading) {
      router.push("/");
    } else {
      const fetchPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "posts"));
          const postsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsData);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [authUser, authLoading, router]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className={styles.postsContainer}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <h2>{post.fish}</h2>
              <p>{post.outcome}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
