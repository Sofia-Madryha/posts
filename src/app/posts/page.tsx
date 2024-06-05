"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import styles from "./PostsPage.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Posts() {
  const router = useRouter();

  const fetchPosts = async (page: any) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
    );
    return res.json();
  };

  const [page, setPage] = useState(1);

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>It is loading</p>;
  }

  return (
    <div className={styles.data}>
      <h1 className={styles.data__title}>Posts</h1>
      <div className={styles.data__posts}>
        {postsData?.map((post: any) => (
          <div
            className={styles["data__posts-item"]}
            key={post.id}
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <h2 className={styles["data__posts-item-title"]}>{post.title}</h2>
            <p className={styles["data__posts-item-text"]}>{post.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.buttons__item}
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          Prev
        </button>
        <p className="">{page}</p>
        <button
          className={styles.buttons__item}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
