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

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getPost(params.id);

  return (
    <div>
      <h1>Update Post</h1>
      <PostForm postData={data} />
    </div>
  );
};

export default page;
