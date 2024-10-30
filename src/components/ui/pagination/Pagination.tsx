"use client";

import { redirect, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePagination } from "@/utils";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/");
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    // [Previous] When the `pageNumber` is under the first page, redirect to the root route.
    if (Number(pageNumber) <= 0) {
      //   return `${pathname}`; // href="/[category]"
      return `${pathname}?${params.toString()}`;
    }

    // [Next] When the `pageNumber` is over the last page, keep the same route.
    if (Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    // Update the route page param with the new page value
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center my-5">
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          <li>
            <Link
              className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
              aria-label="Previous page"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {generatePagination(currentPage, totalPages).map(
            (pageNumber, index) => (
              <li key={`${pageNumber}-${index}`}>
                <Link
                  className={clsx(
                    "relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                    {
                      "bg-blue-600 text-white hover:text-white hover:bg-blue-700 shadow-md":
                        currentPage === pageNumber,
                    }
                  )}
                  href={`${pathname}/?page=${pageNumber}`}
                >
                  {pageNumber}
                </Link>
              </li>
            )
          )}
          <li>
            <Link
              className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
              aria-label="Next page"
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
