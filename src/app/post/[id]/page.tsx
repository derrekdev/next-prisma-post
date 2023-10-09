import { postProps } from "@/Types/types";
import ShowPost from "@/components/ShowPost/ShowPost";

async function getSpecificPost(id: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/post/${id}`, {
      // next: { revalidate: 60 },
    });

    // fetch(URL, { cache: 'no-store' })
    // fetch(URL, {next: { revalidate: 10 }})

    if (!res) {
      console.log(res);
    }

    return res.json();
  } catch (error) {
    return { error: error };
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const data: postProps = await getSpecificPost(params.id);

  console.log("data", data);

  return (
    <main>
      <ShowPost data={data} />
    </main>
  );
}
