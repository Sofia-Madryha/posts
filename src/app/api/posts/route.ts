export const fetchPosts = async (page: any) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  return res.json();
};

