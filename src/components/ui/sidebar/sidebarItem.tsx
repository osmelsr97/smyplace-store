import Link from "next/link";

export interface Props {
  name: string;
  href?: string;
  closeMenu?: () => void;
  onClick?: () => void;
  icon: React.ReactNode;
  endElement?: React.ReactNode;
}

export const SidebarItem = ({
  href,
  icon,
  name,
  closeMenu,
  onClick,
  endElement,
}: Props) => {
  if (!href) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        {icon}
        <span className="ml-3 text-xl">{name}</span>
        {endElement && <div className="ml-auto">{endElement}</div>}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl">{name}</span>
      {endElement && <div className="ml-auto">{endElement}</div>}
    </Link>
  );
};
