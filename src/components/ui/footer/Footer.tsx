import Link from "next/link";
import { titleFont } from "@/config/fonts";

export const Footer = () => {
  return (
    <ul className="flex w-full justify-center text-xs mb-10 gap-2">
      <li>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            SmyPlace
          </span>
          <span> | store</span>
          <span> &copy; {new Date().getFullYear()}</span>
        </Link>
      </li>
      <li>
        <Link href="/"> Privacy & Legal</Link>
      </li>
      <li>
        <Link href="/"> Locations</Link>
      </li>
    </ul>
  );
};
