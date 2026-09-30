import Image from "next/image";
import Link from "next/link";
import { navigationLinks } from "@/app/data/navigation";

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "/icons/footer-linkedin.svg" },
  { label: "Instagram", href: "#", icon: "/icons/footer-instagram.svg" },
];

const sectionTitle =
  "mb-5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-coffee lg:mb-4 lg:text-[0.85rem] lg:font-semibold lg:tracking-wide";
const bodyText = "font-heading text-[0.88rem] text-walnut lg:text-[0.82rem]";
const iconSize = "size-[18px] shrink-0 lg:size-4";

function Divider() {
  return (
    <div
      aria-hidden="true"
      className="my-7 h-px w-full bg-latte/50 lg:my-0 lg:h-auto lg:w-px lg:justify-self-center lg:bg-white"
    />
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-sand px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col lg:grid lg:grid-cols-[1.2fr_auto_0.7fr_auto_1fr_1.4fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.65rem] font-extrabold uppercase leading-[1.25] tracking-tight text-coffee md:text-[1.8rem] lg:text-[1.35rem] lg:font-bold lg:leading-[1.3]">
              Department
              <br />
              of
              <br />
              Information Technology
            </h2>

            <p className="max-w-[340px] text-[0.85rem] leading-[1.6] text-walnut lg:max-w-[280px] lg:text-[0.82rem] lg:leading-[1.55]">
              Empowering innovation through knowledge and technology, creating future ready engineers for a
              connected world
            </p>

            <div className="flex items-center gap-3.5 pt-2 lg:gap-3 lg:pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-coffee transition-colors hover:bg-sand-deep lg:size-9 lg:border lg:border-latte"
                >
                  <Image src={social.icon} alt="" width={18} height={18} className={iconSize} />
                </a>
              ))}
            </div>
          </div>

          <Divider />

          <nav aria-label="Quick links">
            <h3 className={sectionTitle}>Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3.5 lg:grid-cols-1 lg:gap-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-heading text-[0.92rem] text-walnut hover:underline lg:text-[0.84rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Divider />

          <div>
            <h3 className={sectionTitle}>Contact Us</h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.app.goo.gl/pVKDeuSTWuVTPoN46"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 leading-[1.65] hover:underline lg:gap-2.5 lg:leading-[1.6] ${bodyText}`}
              >
                <Image src="/icons/footer-location.svg" alt="" width={18} height={18} className={`mt-[3px] ${iconSize}`} />
                <span>
                  WG3M+8GW, Government Engineering
                  <br />
                  College Rd, Manampatta,
                  <br />
                  Sreekrishnapuram, Kerala 678633
                </span>
              </a>

              <a
                href="mailto:itassociation@gecskp.ac.in"
                className={`flex items-center gap-3 hover:underline lg:gap-2.5 ${bodyText}`}
              >
                <Image src="/icons/footer-mail.svg" alt="" width={18} height={18} className={iconSize} />
                <span>itassociation@gecskp.ac.in</span>
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-start justify-center lg:mt-0 lg:justify-end">
            <div className="w-full max-w-[380px] overflow-hidden rounded-[14px] shadow-photo lg:max-w-[400px] lg:rounded-2xl">
              <Image
                src="/images/department-building.png"
                alt="Department of Information Technology building at GEC Sreekrishnapuram"
                width={400}
                height={260}
                className="h-auto w-full scale-[1.02] object-cover lg:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-coffee px-6 py-3 md:px-12 lg:px-16 xl:px-20">
        <p className="mx-auto max-w-[1280px] text-[0.75rem] text-parchment">
          © 2026 Department of IT, GEC Sreekrishnapuram. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
