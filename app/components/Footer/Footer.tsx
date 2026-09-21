import Image from "next/image";
import Link from "next/link";
import {
  footerNavigationLinks,
  footerSocialLinks,
  footerContact,
  footerCopyright,
} from "@/app/data/footer";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ── Main Footer ── */}
      <div className="bg-[#F0E6D6] px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_auto_0.7fr_auto_1fr_1.4fr]">
          {/* ── Column 1 — Department Branding ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.35rem] font-bold leading-[1.3] tracking-tight text-[#3C2A1C]">
              DEPARTMENT
              <br />
              OF
              <br />
              INFORMATION TECHNOLOGY
            </h2>

            <p className="max-w-[280px] text-[0.82rem] leading-[1.55] text-[#5D4630]">
              Empowering innovation through knowledge and technology,
              creating future ready engineers for a connected world
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={footerSocialLinks.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C4A882] transition-colors hover:bg-[#e6d5be]"
              >
                <Image
                  src="/icons/footer-linkedin.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                />
              </a>

              <a
                href={footerSocialLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C4A882] transition-colors hover:bg-[#e6d5be]"
              >
                <Image
                  src="/icons/footer-instagram.svg"
                  alt="Instagram"
                  width={16}
                  height={16}
                />
              </a>
            </div>
          </div>

          {/* Divider 1 */}
          <div className="hidden lg:flex items-stretch justify-center">
            <div className="w-px bg-white" />
          </div>

          {/* ── Column 2 — Quick Links ── */}
          <nav aria-label="Quick Links">
            <h3 className="mb-4 text-[0.85rem] font-semibold tracking-wide text-[#3C2A1C]">
              QUICK LINKS
            </h3>

            <ul className="flex flex-col gap-2.5">
              {footerNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.84rem] text-[#5D4630] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider 2 */}
          <div className="hidden lg:flex items-stretch justify-center">
            <div className="w-px bg-white" />
          </div>

          {/* ── Column 3 — Contact Us ── */}
          <div>
            <h3 className="mb-4 text-[0.85rem] font-semibold tracking-wide text-[#3C2A1C]">
              CONTACT US
            </h3>

            <div className="flex flex-col gap-4">
              {/* Address */}
              <a
                href={footerContact.addressMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-[0.82rem] leading-[1.6] text-[#5D4630] hover:underline"
              >
                <Image
                  src="/icons/footer-location.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-[3px] shrink-0"
                />
                <span className="whitespace-pre-line">
                  {footerContact.addressText}
                </span>
              </a>

              {/* Email */}
              <a
                href={footerContact.emailHref}
                className="flex items-center gap-2.5 text-[0.82rem] text-[#5D4630] hover:underline"
              >
                <Image
                  src="/icons/footer-mail.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span>{footerContact.emailDisplay}</span>
              </a>
            </div>
          </div>



          {/* ── Column 4 — Department Building Image ── */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-[400px] overflow-hidden rounded-[16px] shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]">
              <Image
                src="/images/department-building.png"
                alt="Department of Information Technology building at GEC Sreekrishnapuram"
                width={400}
                height={260}
                className="h-auto w-full scale-[1.05] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="bg-[#3C2A1C] px-6 py-3 md:px-12 lg:px-16 xl:px-20">
        <p className="mx-auto max-w-[1280px] text-[0.75rem] text-[#E8DDD0]">
          {footerCopyright}
        </p>
      </div>
    </footer>
  );
}
