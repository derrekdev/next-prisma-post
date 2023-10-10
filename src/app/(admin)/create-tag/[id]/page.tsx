import TagForm from "@/components/TagForm/TagForm";

async function getTags(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/tag/${id}`, {
    // cache: "no-store",
    method: "GET",
  });

  if (!res.ok) {
    console.log("res", res);
  }
  return res.json();
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getTags(params.id);

  return (
    <div>
      <h1 className="text-4xl pb-20">Create Tags</h1>
      <TagForm tagData={data} />
    </div>
  );
}
