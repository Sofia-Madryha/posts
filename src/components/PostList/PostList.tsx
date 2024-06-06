import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styles from "./PostList.module.scss";

import { usePosts } from "@/hooks/usePosts";

export default function PostList() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);

const { data: postsData, isLoading } = usePosts(page);

  if (isLoading) {
    return <p>It is loading</p>;
  }

  const updatePage = (p: number) => {
    setPage(p);
  };

  return (
    <div className={styles.data}>
      <h1 className={styles.data__title}>Posts</h1>
      <div className={styles.data__posts}>
        {postsData?.data?.map((post: any) => (
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
        total={postsData?.total || 0}
      />
    </div>
  );
}
