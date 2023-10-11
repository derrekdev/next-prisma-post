import { authorProps } from "@/Types/types";
import ShowAuthorList from "@/components/ShowAuthorList/ShowAuthorList";

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

export default async function page() {
  const data: Array<authorProps> = await getAuthor();

  return (
    <div>
      <h1>Author</h1>
      <ShowAuthorList authorData={data} />
    </div>
  );
}
