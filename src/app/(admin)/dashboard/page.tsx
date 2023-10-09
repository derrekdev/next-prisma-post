import ShowPost from "@/components/ShowPostList/ShowPostList";

async function getPost() {
  // need to find a more sutable way for fetching data on admin
  const res = await fetch(`${process.env.BASE_URL}/api/post`, {
    cache: "no-store",
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function page() {
  const data: { id: number; title: string }[] = await getPost();

  // const cookieStore = cookies();

  // cookieStore.set("usertype", "admin", { secure: true });

  return (
    <>
      <h1 className="text-4xl">Dashboard</h1>
      <ShowPost data={data} isAdmin={true} />
    </>
  );
}
