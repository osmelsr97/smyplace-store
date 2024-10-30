"use client";

import { useContext } from "react";
import clsx from "clsx";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { UIContext } from "@/store";
import { SidebarItem, Props as IMenuOption } from "./sidebarItem";

const clientOptions: IMenuOption[] = [
  { href: "/profile", name: "Profile", icon: <IoPersonOutline size={30} /> },
  { href: "/orders", name: "Orders", icon: <IoTicketOutline size={30} /> },
  { href: "/auth/signin", name: "Sign in", icon: <IoLogInOutline size={30} /> },
  { href: "/auth/logout", name: "Logout", icon: <IoLogOutOutline size={30} /> },
];

const adminOptions: IMenuOption[] = [
  { href: "/profile", name: "Product", icon: <IoShirtOutline size={30} /> },
  { href: "/orders", name: "Orders", icon: <IoTicketOutline size={30} /> },
  { href: "/auth/signin", name: "Users", icon: <IoPeopleOutline size={30} /> },
];

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(UIContext);

  return (
    <div>
      {/* Background black */}
      {isSidebarOpen && (
        <div className="fixed inset-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed fade-in inset-0 w-screen h-screen z-10 backdrop:filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed z-20 p-2 right-0 top-0 w-64 sm:w-[500px] h-screen bg-white shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSidebarOpen }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSidebar}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <section className="h-full overflow-y-auto scroll-auto">
          {/* Client Options */}
          {clientOptions.map((option) => (
            <SidebarItem key={option.href} {...option} />
          ))}

          {/* Separator */}
          <div className="w-full h-px bg-gray-200 my-10" />

          {/* Admin Options */}
          {adminOptions.map((option) => (
            <SidebarItem key={option.href} {...option} />
          ))}
        </section>
      </nav>
    </div>
  );
};
