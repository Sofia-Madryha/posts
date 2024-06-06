"use client";

import Link from "next/link";

import styles from "./PostItem.module.scss";
import { usePost } from "@/hooks/usePostItem";

export default function PostItem({ id }: { id: string }) {
  const { data, error, isLoading } = usePost(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <Link href="/posts">...Back to posts</Link>
      <div className={styles.post}>
        <h2 className={styles.post__title}>{data.title}</h2>
        <p className={styles.post__text}>{data.body}</p>
      </div>
    </div>
  );
}
