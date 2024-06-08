export const fetchPosts = async (page: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  const total = res.headers.get("x-total-count");

  const data = await res.json();
  return { data, total: parseInt(total || "0", 10) };
};

export const fetchPostsInfiniteScroll = async (page: any) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.pageParam}`
  );

  const data = await res.json();
  return data;
};

export const fetchPostById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Post not found");
  }
  return res.json();
};
