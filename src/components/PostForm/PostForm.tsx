"use client";

import { postProps } from "@/Types/types";
import { useRef, useState } from "react";

const PostForm = ({ postData }: { postData?: postProps }) => {
  const isUpdate = !!postData ? true : false;
  const [message, setMessage] = useState("");
  const refTitle = useRef<HTMLInputElement | null>(null);
  const refMessage = useRef<HTMLTextAreaElement | null>(null);
  const refPublished = useRef<HTMLInputElement | null>(null);

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const data = !isUpdate
      ? await fetch("/api/post", {
          method: "POST",
          body: JSON.stringify({
            title: refTitle.current?.value,
            content: refMessage.current?.value,
            published: refPublished.current?.checked,
          }),
        })
      : await fetch(`/api/post/${postData?.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: refTitle.current?.value,
            content: refMessage.current?.value,
            published: refPublished.current?.checked,
          }),
        });

    const res = await data.json();
    if (!res) console.log(res);
    else setMessage(`Successfuly ${isUpdate ? "updated" : "added"}`);
  }

  return (
    <form onSubmit={submitPost} className="flex flex-col w-1/3">
      <div className="py-4">
        {message && (
          <p className="bg-green-600 p-5 rounded-md capitalize">{message}!!</p>
        )}
      </div>

      <div className="flex flex-col gap-2 pb-6">
        <label htmlFor="title" className="">
          Title
        </label>
        <input
          type="text"
          // onChange={(e) => setTitle(e.target.value)}
          ref={refTitle}
          defaultValue={isUpdate ? postData?.title : refTitle.current?.value}
          className="text-black p-2 rounded-md"
          id="title"
        />
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <label htmlFor="content" className="">
          Content
        </label>
        <textarea
          ref={refMessage}
          id="content"
          className="text-black p-2 rounded-md"
          rows={4}
          defaultValue={
            isUpdate ? postData?.content : refMessage.current?.value
          }
        ></textarea>
      </div>
      <div className="flex flex-row gap-4 pb-6">
        <input
          type="checkbox"
          // onChange={(e) => setTitle(e.target.value)}
          ref={refPublished}
          // defaultValue={refTitle.current?.value || ""}
          className="text-black w-6 h-6 rounded-md"
          id="published"
          defaultChecked={
            isUpdate ? postData?.published : refPublished.current?.checked
          }
        />
        <label htmlFor="published" className="">
          Published
        </label>
      </div>
      <div className="py-4 ">
        <button type="submit" className="p-4 bg-gray-600 rounded-md w-1/2">
          {isUpdate ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
