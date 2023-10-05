"use client";

import { postProps } from "@/Types/types";
import Link from "next/link";

const publishedData = async (postId: number) => {
  const res = await fetch("/api/post", {
    method: "PUT",
  });

  if (!res.ok) {
    console.log("error", res);
  }

  return res.json();
};

// const publisedFetcher = (url: string) => {
//   const res = fetch(url, { method: "PUT" });
//   if (!res) {
//     console.log("error", res);
//   }

//   return res;
// };

const ShowPost = ({ data }: { data: Array<Partial<postProps>> }) => {
  const handlePublished = async (id: number) => {
    const postData = await publishedData(id);

    // const { data: postData, isLoading } = useSWR("/api/post", publisedFetcher);
    console.log("trigger", postData);
  };

  return (
    <ul className="w-4/5">
      {data?.map((post) => (
        <li key={post.id} className="flex flex-row justify-between py-6 w-full">
          <h2 className="text-lg ">{post.title}</h2>
          <div className="pl-4 flex flex-row gap-2">
            <button
              className="p-4 bg-neutral-700 rounded-lg"
              onClick={() => handlePublished(post.id ? post.id : 0)}
            >
              {post.published ? "Unpublished" : "Published"}
            </button>
            <Link className="p-4 bg-sky-500 rounded-lg" href="/">
              Update
            </Link>
            <Link className="p-4 bg-rose-600 rounded-lg" href="/">
              Delete
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShowPost;
