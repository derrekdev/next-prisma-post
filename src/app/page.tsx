async function getPost() {
  const res = await fetch(`${process.env.BASE_URL}/api/post`, {
    next: { revalidate: 60 },
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

  console.log(data);

  return (
    <main>
      {data.map((post) => (
        <h1 className="text-lg py-6" key={post.id}>
          {post.title}
        </h1>
      ))}
    </main>
  );
}

// export async function getStaticProps() {
//   const data: { id: number; title: string }[] = await getPost();

//   return {
//     props: { data },
//   };
// }
