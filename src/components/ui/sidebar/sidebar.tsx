"use client";

import { signOut, useSession } from "next-auth/react";

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

import { useUIStore } from "@/store";
// import { logout } from "@/actions";

import { SidebarItem, Props as IMenuOption } from "./sidebarItem";

const clientOptions: Omit<IMenuOption, "closeMenu">[] = [
  { href: "/profile", name: "Profile", icon: <IoPersonOutline size={30} /> },
  { href: "/orders", name: "Orders", icon: <IoTicketOutline size={30} /> },
];

const adminOptions: Omit<IMenuOption, "closeMenu">[] = [
  { href: "/profile", name: "Product", icon: <IoShirtOutline size={30} /> },
  { href: "/orders", name: "Orders", icon: <IoTicketOutline size={30} /> },
  { href: "/auth/signin", name: "Users", icon: <IoPeopleOutline size={30} /> },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const handleLogout = () => {
    closeMenu();
    signOut();
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed fade-in inset-0 w-screen h-screen z-10 backdrop:filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed z-[999] p-2 right-0 top-0 w-64 sm:w-[500px] h-screen bg-white shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
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
          {isAuthenticated && (
            <>
              {clientOptions.map((option) => (
                <SidebarItem
                  key={option.href}
                  {...option}
                  closeMenu={closeMenu}
                />
              ))}

              {/* Logout */}
              <SidebarItem
                icon={<IoLogOutOutline size={30} />}
                name="Logout"
                onClick={handleLogout}
              />
            </>
          )}

          {/* Signin */}
          {!isAuthenticated && (
            <SidebarItem
              icon={<IoLogInOutline size={30} />}
              name="Sign in"
              href="/auth/login"
            />
          )}

          {/* Admin Options */}
          {isAdmin && (
            <>
              {/* Separator */}
              <div className="w-full h-px bg-gray-200 my-10" />

              {adminOptions.map((option) => (
                <SidebarItem
                  key={option.href ?? option.name}
                  {...option}
                  closeMenu={closeMenu}
                />
              ))}
            </>
          )}
        </section>
      </nav>
    </div>
  );
};
