import { navLinks } from "constants/navLinks";
import Link from "next/link";

export function Linksbar() {
  return (
    <div className="hidden media-md:block">
      <div className="container flex items-center">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            className="px-4 py-4 transition-all typography-M14"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
