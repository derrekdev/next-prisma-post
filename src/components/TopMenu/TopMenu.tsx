import Link from "next/link";

const TopMenu = () => {
  return (
    <nav className="pb-10">
      <ul className="flex flex-row gap-4 border-b-2 border-white pb-6">
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/dashboard"
          >
            Go to the dashboard
          </Link>
        </li>
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/create-post"
          >
            Create Post
          </Link>
        </li>
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/tags"
          >
            View Tags
          </Link>
        </li>

        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/create-tag"
          >
            Create Tags
          </Link>
        </li>
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/author"
          >
            View Author
          </Link>
        </li>

        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/create-author"
          >
            Create Author
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopMenu;
