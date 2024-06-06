"use client";
import { PostItem } from "@/components/PostItem";
import { usePost } from "@/hooks/usePostItem";

import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();
  const { data, error, isLoading } = usePost(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return <PostItem id={data.id} />;
}
