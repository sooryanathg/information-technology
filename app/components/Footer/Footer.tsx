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
        <div className="mx-auto max-w-[1280px]">
          {/* ── Desktop grid (lg+) ── */}
          <div className="hidden lg:grid grid-cols-[1.2fr_auto_0.7fr_auto_1fr_1.4fr] gap-10">
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
            <div className="flex items-stretch justify-center">
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
            <div className="flex items-stretch justify-center">
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
            <div className="flex items-start justify-end">
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

          {/* ── Mobile / Tablet layout (below lg) ── */}
          <div className="flex flex-col lg:hidden">
            {/* ── Branding Section ── */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[1.65rem] font-extrabold leading-[1.25] tracking-tight text-[#3C2A1C] md:text-[1.8rem]">
                DEPARTMENT
                <br />
                OF
                <br />
                INFORMATION TECHNOLOGY
              </h2>

              <p className="max-w-[340px] text-[0.85rem] leading-[1.6] text-[#5D4630]">
                Empowering innovation through knowledge and technology,
                creating future ready engineers for a connected world
              </p>

              <div className="flex items-center gap-3.5 pt-2">
                <a
                  href={footerSocialLinks.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#3C2A1C] transition-colors hover:bg-[#e6d5be]"
                >
                  <Image
                    src="/icons/footer-linkedin.svg"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                  />
                </a>

                <a
                  href={footerSocialLinks.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#3C2A1C] transition-colors hover:bg-[#e6d5be]"
                >
                  <Image
                    src="/icons/footer-instagram.svg"
                    alt="Instagram"
                    width={18}
                    height={18}
                  />
                </a>
              </div>
            </div>

            {/* ── Horizontal Divider ── */}
            <div className="my-7 h-px w-full bg-[#C4A882]/50" />

            {/* ── Quick Links Section ── */}
            <nav aria-label="Quick Links">
              <h3 className="mb-5 text-[0.78rem] font-bold tracking-[0.12em] text-[#3C2A1C] uppercase">
                Quick Links
              </h3>

              <ul className="grid grid-cols-2 gap-x-8 gap-y-3.5">
                {footerNavigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.92rem] text-[#5D4630] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Horizontal Divider ── */}
            <div className="my-7 h-px w-full bg-[#C4A882]/50" />

            {/* ── Contact Us Section ── */}
            <div>
              <h3 className="mb-5 text-[0.78rem] font-bold tracking-[0.12em] text-[#3C2A1C] uppercase">
                Contact Us
              </h3>

              <div className="flex flex-col gap-4">
                {/* Address */}
                <a
                  href={footerContact.addressMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-[0.88rem] leading-[1.65] text-[#5D4630] hover:underline"
                >
                  <Image
                    src="/icons/footer-location.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="mt-[3px] shrink-0"
                  />
                  <span>
                    WC3M+8GW, Government Engineering College Rd,
                    <br />
                    Mannampatta, Sreekrishnapuram, Kerala 679533
                  </span>
                </a>

                {/* Email */}
                <a
                  href={footerContact.emailHref}
                  className="flex items-center gap-3 text-[0.88rem] text-[#5D4630] hover:underline"
                >
                  <Image
                    src="/icons/footer-mail.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>{footerContact.emailDisplay}</span>
                </a>
              </div>
            </div>

            {/* ── Department Building Image ── */}
            <div className="mt-8 flex items-start justify-center">
              <div className="w-full max-w-[380px] overflow-hidden rounded-[14px] shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/department-building.png"
                  alt="Department of Information Technology building at GEC Sreekrishnapuram"
                  width={400}
                  height={260}
                  className="h-auto w-full scale-[1.02] object-cover"
                />
              </div>
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
