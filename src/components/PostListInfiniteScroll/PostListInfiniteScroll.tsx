import { useRouter } from "next/navigation";

import "rc-pagination/assets/index.css";
import styles from "./PostListInfiniteScroll.module.scss";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { InView, useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function PostListInfiniteScroll() {
  const router = useRouter();

  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteScroll();

  useEffect(() => {
    InView && fetchNextPage();
  }, [inView]);

  const postsData = data ? data.pages.flatMap((page) => page) : [];

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

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
}
