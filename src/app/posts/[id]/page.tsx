"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Post() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/posts/${queryKey[1]}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
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
    <div>
      <Link href="/posts">Back to posts</Link>
      <div>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </div>
    </div>
  );
}
