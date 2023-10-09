"use client";

import { postProps } from "@/Types/types";
import Link from "next/link";
import { useState } from "react";

const publishedData = async (postId: number, isPublished: boolean) => {
  const res = await fetch(`/api/post?type=published`, {
    method: "PATCH",
    body: JSON.stringify({
      id: postId,
      published: !isPublished,
    }),
  });

  if (!res.ok) {
    console.log("error", res.statusText);
  }

  return res.json();
};

const deleteData = async (postId: number) => {
  const res = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });
};

async function getPost() {
  const res = await fetch(`/api/post`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

const ShowPostList = ({
  data,
  isAdmin = false,
}: {
  data: Array<Partial<postProps>>;
  isAdmin?: boolean;
}) => {
  const [currentData, setCurrentData] = useState(data);

  const retrieveData = async () => {
    const postData = await getPost();

    setCurrentData(postData);
  };

  const handlePublished = async (id: number, isPublished: boolean) => {
    const updatedData = await publishedData(id, isPublished);

    retrieveData();
  };

  const handleDeletePost = async (id: number) => {
    console.log("trigger delete " + id);
    const deletedData = await deleteData(id);

    retrieveData();
  };

  return (
    <ul className="w-4/5">
      {!!currentData &&
        currentData?.map((post) => (
          <li
            key={post.id}
            className="flex flex-row justify-between py-6 w-full"
          >
            <Link href={`/post/${post.id}`}>
              <h2 className="text-lg ">{post.title}</h2>
            </Link>
            {isAdmin && (
              <div className="pl-4 flex flex-row gap-2">
                <button
                  className="p-4 bg-neutral-700 rounded-lg"
                  onClick={() =>
                    handlePublished(
                      post.id ? post.id : 0,
                      post.published ? post.published : false
                    )
                  }
                >
                  {post.published ? "Unpublished" : "Published"}
                </button>
                <Link
                  className="p-4 bg-sky-500 rounded-lg"
                  href={`/create-post/${post.id}`}
                >
                  Update
                </Link>
                <button
                  className="p-4 bg-rose-600 rounded-lg"
                  onClick={() => handleDeletePost(post.id ? post.id : 0)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default ShowPostList;
