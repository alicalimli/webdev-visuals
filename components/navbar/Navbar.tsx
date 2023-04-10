import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Visuals",
    href: "/visuals",
  },
  {
    label: "Tutorials",
    href: "/tutorials",
  },
];

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const renderLinks = links.map(({ label, href }) => (
    <li key={href}>
      <Link href={href}>{label}</Link>
    </li>
  ));

  return (
    <nav className="flex w-full items-center gap-2 p-8 px-vw-32 ">
      <Link href="/" className="hidden font-bold fluid-2xl sm:block">
        WebDevVisuals
      </Link>
      <Link href="/" className="font-bold fluid-2xl sm:hidden">
        WDV
      </Link>
      {/* <ul className='ml-auto flex gap-4 text-xl'>
        {renderLinks}
      </ul> */}
    </nav>
  );
};

export default Navbar;
