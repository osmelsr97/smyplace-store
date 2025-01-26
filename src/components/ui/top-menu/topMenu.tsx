"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import clsx from "clsx";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";

const gendersLinks = [
  { name: "Women", href: "/gender/women" },
  { name: "Man", href: "/gender/men" },
  { name: "Kids", href: "/gender/kid" },
];

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const pathname = usePathname();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            SmyPlace
          </span>

          <span> | Store</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        {gendersLinks.map((link) => (
          <Link
            key={link.href}
            className={clsx("mr-2 p-2 rounded-md hover:bg-gray-100", {
              "font-bold": link.href === pathname,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2" aria-label="Search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={loaded && totalItemsInCart === 0 ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
