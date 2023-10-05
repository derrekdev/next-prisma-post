"use client";

import { useState } from "react";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const data = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    const res = await data.json();
    if (!res) console.log(res);
    else setMessage("success");
  }

  return (
    <form onSubmit={submitPost} className="flex flex-col w-1/3">
      <div className="py-4">
        {message && (
          <p className="bg-green-60 p-5 rounded-md capitalize">{message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 pb-6">
        <label htmlFor="title" className="">
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="text-black p-2 rounded-md"
          id="title"
        />
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <label htmlFor="title" className="">
          Content
        </label>
        <textarea></textarea>
      </div>
      <div className="py-4 ">
        <button type="submit" className="p-4 bg-gray-600 rounded-md w-1/2">
          Create
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
