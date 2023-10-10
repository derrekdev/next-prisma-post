import { tagProps } from "@/Types/types";
import ShowTagList from "@/components/ShowTagList/ShowTagList";

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

export default async function page() {
  const data: Array<tagProps> = await getTags();

  return (
    <div>
      <h1 className="text-4xl pb-20">Tags</h1>
      <ShowTagList tagData={data} />
    </div>
  );
}
