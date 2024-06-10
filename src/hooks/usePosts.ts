import { fetchPosts } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const prefetchPosts = async (queryClient, page) => {
  await queryClient.prefetchQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });
};

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    staleTime: 5000,
  });
};
