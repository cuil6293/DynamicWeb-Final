"use client";

import Link from "next/link";
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
    if (!authLoading) {
      if (!authUser) {
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
    }
  }, [authUser, authLoading, router]);

  if (!authUser) {
    return null;
  }

  return (
    <div className={styles.dashboardWrapper}>
      <Link href="/dashboard/Play">
        <img src="https://media.tenor.com/6m3I1g_WiokAAAAM/fish-spin-sha.gif" />
      </Link>
      <h1>Posts</h1>
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
      <footer>
        <h3>@Fish For Love - A fish dating simulator website</h3>
        <p>Do not contact us</p>
      </footer>
    </div>
  );
}
