"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./PostId.module.scss";

export default function PostId() {
  const { id } = useParams();
  const {
    data: postData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="">
      <Link href="/posts">....Back to posts</Link>
      <div className={styles.post}>
        <h2 className={styles.post__title}>{postData.title}</h2>
        <p className={styles.post__text}>{postData.body}</p>
      </div>
    </div>
  );
}
