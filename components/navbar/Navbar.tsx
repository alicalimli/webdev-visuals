import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Collections",
    href: "/collections",
  },
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
    <nav className="flex w-full items-center justify-center gap-2 px-vw-12 py- bg-black">
      <h1 className="website-title font-bold fluid-3xl text-center text-slate-300">
        Web Development Visuals
      </h1>
      {/* <h1 className=" text-slate-300 website-title font-bold fluid-6xl sm:hidden">
        wd
        <span className="font-bold text-[#4dabf7]">visuals</span>
      </h1> */}
      {/* <ul className="ml-auto flex gap-4 fluid-lg">{renderLinks}</ul> */}
    </nav>
  );
};

export default Navbar;
