"use client";

import { tagProps } from "@/Types/types";
import { useRef, useState } from "react";

export default function TagForm({ tagData }: { tagData?: tagProps }) {
  const isUpdate = !!tagData ? true : false;

  const refTagName = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("tagName", refTagName.current?.value);

    const data = !isUpdate
      ? await fetch("/api/tag", {
          method: "POST",
          body: JSON.stringify({
            tagName: refTagName.current?.value,
          }),
        })
      : await fetch(`/api/tag/${tagData?.id}`, {
          method: "PUT",
          body: JSON.stringify({
            tagName: refTagName.current?.value,
          }),
        });

    const res = await data.json();

    if (!res) console.log(res);
    else setMessage(`Successfuly ${isUpdate ? "updated" : "added"}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/3">
      <div className="py-4">
        {message && (
          <p className="bg-green-600 p-5 rounded-md capitalize">{message}!!</p>
        )}
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <label htmlFor="title" className="">
          Tag Name
        </label>
        <input
          type="text"
          // onChange={(e) => setTitle(e.target.value)}
          ref={refTagName}
          defaultValue={isUpdate ? tagData?.tagName : refTagName.current?.value}
          className="text-black p-2 rounded-md"
          id="title"
        />
      </div>
      <div className="py-4 ">
        <button type="submit" className="p-4 bg-gray-600 rounded-md w-1/2">
          {isUpdate ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
