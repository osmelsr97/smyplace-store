"use client";

import { useContext } from "react";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { UIContext } from "@/store";

export const TopMenu = () => {
  const { openSidebar } = useContext(UIContext);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            SmyPlace
          </span>

          <span> | Store</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="mr-2 p-2 rounded-md hover:bg-gray-100"
          href="/gender/women"
        >
          Women
        </Link>

        <Link
          className="mr-2 p-2 rounded-md hover:bg-gray-100"
          href="/gender/men"
        >
          Man
        </Link>

        <Link
          className="mr-2 p-2 rounded-md hover:bg-gray-100"
          href="/gender/kid"
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2" aria-label="Search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSidebar}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
