import PostForm from "@/components/PostForm/PostForm";

async function getPost(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

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

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getPost(params.id);
  const tagsData = await getTags();
  const authorData = await getAuthor();

  return (
    <div>
      <h1>Update Post</h1>
      <PostForm postData={data} tagsData={tagsData} authorData={authorData} />
    </div>
  );
};

export default page;
