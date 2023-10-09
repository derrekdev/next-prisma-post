import { postProps } from "@/Types/types";

const ShowPost = ({ data }: { data: postProps }) => {
  return (
    <div>
      <h1 className="text-4xl pb-20">{data.title}</h1>
      <p className="">{data.content}</p>
    </div>
  );
};

export default ShowPost;
