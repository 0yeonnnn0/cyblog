"use client";

import Link from "next/link";

interface NavigationLinkProps {
  path: string;
  label: string;
}

export default function NavigationLink({ path, label }: NavigationLinkProps) {
  return (
    <Link href={path} className="hover:text-gray-800">
      {label}
    </Link>
  );
}
