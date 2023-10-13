import PostForm from "@/components/PostForm/PostForm";

async function getTags() {
  const res = await fetch(`${process.env.BASE_URL}/api/tag`, {
    // cache: "no-store",
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.log("res", res);
  }
  return res.json();
}

async function getAuthor() {
  const res = await fetch(`${process.env.BASE_URL}/api/author`, {
    // cache: "no-store",
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.log("res", res);
  }
  return res.json();
}

export default async function page() {
  const tagData = await getTags();
  const authorData = await getAuthor();

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm tagsData={tagData} authorData={authorData} />
    </div>
  );
}
