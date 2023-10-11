"use client";

import { authorProps } from "@/Types/types";
import { useRef, useState } from "react";

export default function AuthorForm({
  authorData,
}: {
  authorData?: authorProps;
}) {
  const isUpdate = !!authorData ? true : false;

  const refAuthorName = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("tagName", refTagName.current?.value);

    const data = !isUpdate
      ? await fetch("/api/author", {
          method: "POST",
          body: JSON.stringify({
            name: refAuthorName.current?.value,
          }),
        })
      : await fetch(`/api/author/${authorData?.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: refAuthorName.current?.value,
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
          Name
        </label>
        <input
          type="text"
          // onChange={(e) => setTitle(e.target.value)}
          ref={refAuthorName}
          defaultValue={
            isUpdate ? authorData?.name : refAuthorName.current?.value
          }
          className="text-black p-2 rounded-md"
          id="name"
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
