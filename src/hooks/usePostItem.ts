import { fetchPostById } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });
};
