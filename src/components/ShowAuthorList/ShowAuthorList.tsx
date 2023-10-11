"use client";

import { authorProps } from "@/Types/types";
import Link from "next/link";
import { useState } from "react";

const deleteData = async (tagId: number) => {
  const res = await fetch(`/api/author/${tagId}`, {
    method: "DELETE",
  });
};

async function getAuthor() {
  const res = await fetch(`/api/author`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default function ShowAuthorList({
  authorData,
}: {
  authorData: authorProps[];
}) {
  const [currentData, setCurrentData] = useState(authorData);

  const retrieveData = async () => {
    const newData = await getAuthor();

    setCurrentData(newData);
  };

  const handleDeletePost = async (id: number) => {
    await deleteData(id);

    retrieveData();
  };
  return (
    <ul>
      {!!authorData &&
        authorData.length > 0 &&
        authorData.map((author) => (
          <li
            key={author.id}
            className="flex flex-row justify-between py-6 w-full"
          >
            <span>{author.name}</span>
            <div className="pl-4 flex flex-row gap-2">
              <Link
                className="p-4 bg-sky-500 rounded-lg"
                href={`/create-author/${author.id}`}
              >
                Update
              </Link>
              <button
                className="p-4 bg-rose-600 rounded-lg"
                onClick={() => handleDeletePost(author.id ? author.id : 0)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
