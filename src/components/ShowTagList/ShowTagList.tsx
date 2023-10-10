"use client";

import { tagProps } from "@/Types/types";
import Link from "next/link";
import { useState } from "react";

const deleteData = async (tagId: number) => {
  const res = await fetch(`/api/tag/${tagId}`, {
    method: "DELETE",
  });
};

async function getTag() {
  const res = await fetch(`/api/tag`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default function ShowTagList({ tagData }: { tagData: Array<tagProps> }) {
  const [currentData, setCurrentData] = useState(tagData);

  const retrieveData = async () => {
    const tagData = await getTag();

    setCurrentData(tagData);
  };

  const handleDeletePost = async (id: number) => {
    await deleteData(id);

    retrieveData();
  };

  return (
    <ul className="w-4/5">
      {!!currentData &&
        currentData.map((tag) => (
          <li
            key={tag.id}
            className="flex flex-row justify-between py-6 w-full"
          >
            <span>{tag.tagName}</span>
            <div className="pl-4 flex flex-row gap-2">
              <Link
                className="p-4 bg-sky-500 rounded-lg"
                href={`/create-tag/${tag.id}`}
              >
                Update
              </Link>
              <button
                className="p-4 bg-rose-600 rounded-lg"
                onClick={() => handleDeletePost(tag.id ? tag.id : 0)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
