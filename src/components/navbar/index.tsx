import Link from "next/link";

const routes = [
  { href: "/flora", text: "Flora" },
  { href: "/fauna", text: "Fauna" },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-5">
        {routes.map((e, i) => {
          return (
            <li key={i}>
              <Link href={e.href} className="text-black py-2 px-4 rounded hover:bg-main_darker hover:text-white transition-colors">
                {e.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
