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

export default async function page() {
  const tagData = await getTags();

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm tagsData={tagData} />
    </div>
  );
}
