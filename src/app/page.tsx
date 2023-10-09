import ShowPost from "@/components/ShowPostList/ShowPostList";

async function getPost() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
    cache: "no-store",
    next: { revalidate: 5 },
  });

  // fetch(URL, { cache: 'no-store' })
  // fetch(URL, {next: { revalidate: 10 }})

  if (res) {
    console.log(res);
  }
  return res.json();
}

// export default async function Home({
//   data,
// }: {
//   data: { id: number; title: string }[];
// }) {
export default async function Home() {
  const data: { id: number; title: string }[] = await getPost();

  return (
    <main>
      <h1 className="text-4xl">Dashboard</h1>
      <ShowPost data={data} />
    </main>
  );
}
