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
            Go to the dashboard
          </Link>
        </li>
        <li>
          <Link
            className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md"
            href="/create"
          >
            Create Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopMenu;
