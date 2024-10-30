import Link from "next/link";

export interface Props {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ href, icon, name }: Props) => {
  return (
    <Link
      key={href}
      href={href}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl">{name}</span>
    </Link>
  );
};
