import { fetchPostsInfiniteScroll } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteScroll = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsInfiniteScroll,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
  });
};
