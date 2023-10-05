import Link from "next/link";

async function getPost() {
  const res = await fetch(`${process.env.BASE_URL}/api/post`);

  if (res) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: { id: number; title: string }[] = await getPost();

  console.log(data);

  return (
    <main>
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link
              className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
              href="/dashboard"
            >
              Go to the dashboard
            </Link>
          </li>
          <li>
            <Link
              className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
              href="/create"
            >
              Create Post
            </Link>
          </li>
        </ul>
      </nav>

      {data.map((post) => (
        <h1 className="text-lg py-6" key={post.id}>
          {post.title}
        </h1>
      ))}
    </main>
  );
}
