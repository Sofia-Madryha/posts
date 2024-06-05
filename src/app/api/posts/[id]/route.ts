export const FetchPostId = async (id: number) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
