import ShowPost from "@/components/ShowPost/ShowPost";

async function getPost() {
  const res = await fetch(`${process.env.BASE_URL}/api/post`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function page() {
  const data: { id: number; title: string }[] = await getPost();

  return (
    <main>
      <h1 className="text-4xl">Dashboard</h1>
      <ShowPost data={data} />
    </main>
  );
}
