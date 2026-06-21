import Image from "next/image";
import Link from "next/link";
import { navigationLinks } from "../../data/navigation";

export default function Navbar() {
  return (
    <nav
      className="
        h-[77px]
        bg-[#1E3A5F]
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
      "
    >
      <div className="h-full flex items-center px-[51px]">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo/object.svg"
            alt="Department of IT Logo"
            width={47}
            height={47}
            priority
          />

          <h1
            className="
              text-white
              text-[24px]
              font-semibold
              tracking-[-0.6px]
            "
          >
            Dept. of IT
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="ml-auto flex items-center gap-[20px]">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                w-[124px]
                h-[36px]
                rounded-[10px]
                flex
                items-center
                justify-center
                text-white
                text-[14px]
                font-semibold
                tracking-[0.35px]
                transition-all
                ${
                  index === 0
                    ? "bg-[rgba(217,217,217,0.40)]"
                    : "bg-[rgba(217,217,217,0.05)]"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}