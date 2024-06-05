"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import styles from "./PostsPage.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { fetchPosts } from "../api/posts/route";


export default function Posts() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(1);

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>It is loading</p>;
  }

  const updatePage = (p: any) => {
    setPage(p);
  };

  console.log(postsData);
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

      <Pagination
        pageSize={postsPerPage}
        onChange={updatePage}
        current={page}
        total={postsData.length}
      />
    </div>
  );
}
