import AuthorForm from "@/components/AuthorForm/AuthorForm";

async function getAuthor(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/author/${id}`, {
    // cache: "no-store",
    method: "GET",
  });

  if (!res.ok) {
    console.log("res", res);
  }
  return res.json();
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getAuthor(params.id);
  return (
    <div>
      <h1 className="text-4xl pb-20">Create Author</h1>
      <AuthorForm authorData={data} />
    </div>
  );
}
