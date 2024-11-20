"use client";

import Link from "next/link";

interface NavItemProps {
  title: string;
  url: string;
}

const NavItem = ({ title, url }: NavItemProps) => {
  return (
    <Link href={url} className="text-white hover:text-gray-300">
      {title}
    </Link>
  );
};

export default NavItem;