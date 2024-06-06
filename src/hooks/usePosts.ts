import { fetchPosts } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    staleTime: 5000,
  });
};
