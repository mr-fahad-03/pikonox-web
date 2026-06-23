import Link from "next/link";
import { getFooterConfig } from "@/actions/site-config";

type FooterData = {
  cta?: {
    title?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
  mapImage?: string;
  locations?: string[];
  footerLinks?: Array<{
    sub?: string;
    label?: string;
    href?: string;
  }>;
  contactCta?: {
    eyebrow?: string;
    label?: string;
    href?: string;
  };
  socialLinks?: Array<{
    label?: string;
    href?: string;
  }>;
  copyrightBrand?: string;
  copyrightText?: string;
};

const DEFAULT_DATA: Required<FooterData> = {
  cta: {
    title: "Ready to Build a More Profitable, Sustainable Business?",
    buttonLabel: "Free Consultation",
    buttonHref: "/contact",
  },
  mapImage: "/map.svg",
  locations: ["123 Finance Lane, Growth City, ST 45678 USA"],
  footerLinks: [
    { sub: "See our work", label: "Portfolio", href: "/work" },
    { sub: "How we do it", label: "Process", href: "/" },
    { sub: "Who we are", label: "About", href: "/about" },
    { sub: "Get started", label: "Contact", href: "/contact" },
  ],
  contactCta: {
    eyebrow: "Let's work together",
    label: "Get In Touch",
    href: "/contact",
  },
  socialLinks: [],
  copyrightBrand: "pikonox",
  copyrightText: "All Rights Reserved",
};

export default async function Footer() {
  const config = await getFooterConfig();
  
  const footer: Required<FooterData> = {
    cta: {
      title: config?.ctaTitle || DEFAULT_DATA.cta.title,
      buttonLabel: config?.ctaButtonLabel || DEFAULT_DATA.cta.buttonLabel,
      buttonHref: config?.ctaButtonHref || DEFAULT_DATA.cta.buttonHref,
    },
    mapImage: config?.mapImage || DEFAULT_DATA.mapImage,
    locations: config?.locations?.length ? config.locations : DEFAULT_DATA.locations,
    footerLinks: config?.footerLinks?.length ? config.footerLinks : DEFAULT_DATA.footerLinks,
    contactCta: {
      eyebrow: config?.contactCta?.eyebrow || DEFAULT_DATA.contactCta.eyebrow,
      label: config?.contactCta?.label || DEFAULT_DATA.contactCta.label,
      href: config?.contactCta?.href || DEFAULT_DATA.contactCta.href,
    },
    socialLinks: config?.socialLinks?.length ? config.socialLinks : DEFAULT_DATA.socialLinks,
    copyrightBrand: config?.copyrightBrand || DEFAULT_DATA.copyrightBrand,
    copyrightText: config?.copyrightText || DEFAULT_DATA.copyrightText,
  };
  
  const primaryLocation = footer.locations[0] || "";

  return (
    <footer className="relative bg-[#d9e1e8]">
      <div className="pt-10 xl:pt-32">
        <div className="container">
          <div className="grid grid-cols-12 gap-7.5">
            <div className="col-span-12 mb-10 lg:col-span-6 lg:mb-0">
              <h2 className="mb-6 text-2xl font-semibold text-secondary sm:text-3xl lg:text-4xl xl:mb-16 xl:text-[55px]/[65px]">
                {footer.cta.title}
              </h2>
              <Link
                href={footer.cta.buttonHref || "/contact"}
                className="btn relative mb-5 h-15 overflow-hidden rounded-full border border-white bg-white pl-7.5 pr-1 text-secondary shadow-md transition hover:border-primary"
              >
                <span className="button-flair" />
                <span className="pxl-button-text relative z-1 text-xl font-semibold">
                  {footer.cta.buttonLabel}
                </span>
                <span className="relative z-1 ml-20 inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-green-500 text-secondary">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 7H13V13" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 13L13 7" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="relative mb-16">
                <img
                  src={footer.mapImage || "/map.svg"}
                  alt="Global office locations"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="rounded-t-[14px] bg-black px-2.5 py-3.5 xl:px-6">
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.6666 8.33317C16.6666 12.494 12.0508 16.8273 10.5008 18.1657C10.3564 18.2743 10.1806 18.333 9.99998 18.333C9.81931 18.333 9.64354 18.2743 9.49915 18.1657C7.94915 16.8273 3.33331 12.494 3.33331 8.33317C3.33331 6.56506 4.03569 4.86937 5.28593 3.61913C6.53618 2.36888 8.23187 1.6665 9.99998 1.6665C11.7681 1.6665 13.4638 2.36888 14.714 3.61913C15.9643 4.86937 16.6666 6.56506 16.6666 8.33317Z" stroke="#1683F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 10.8335C11.3807 10.8335 12.5 9.71421 12.5 8.3335C12.5 6.95278 11.3807 5.8335 10 5.8335C8.61929 5.8335 7.5 6.95278 7.5 8.3335C7.5 9.71421 8.61929 10.8335 10 10.8335Z" stroke="#1683F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-base font-semibold text-white">{primaryLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container">
          <div className="grid grid-cols-12 py-10 xl:py-20 max-lg:gap-7.5">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex flex-wrap items-center max-md:justify-between max-sm:gap-5">
                {footer.footerLinks.map((link) => (
                  <div key={`${link.label}-${link.href}`} className="sm:w-[20%]">
                    <span className="text-base text-bodytext">{link.sub}</span>
                    <h2 className="text-2xl font-semibold text-secondary transition-colors hover:text-primary xl:text-3xl">
                      <Link
                        href={link.href || "/"}
                        className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-500 hover:after:w-full"
                      >
                        {link.label}
                      </Link>
                    </h2>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:ml-auto">
              <div className="flex items-center">
                <div>
                  <span className="text-sm font-medium text-bodytext">
                    {footer.contactCta.eyebrow}
                  </span>
                  <h2 className="text-2xl font-semibold text-secondary transition-colors hover:text-primary xl:text-3xl">
                    <Link
                      href={footer.contactCta.href || "/contact"}
                      className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-500 hover:after:w-full"
                    >
                      {footer.contactCta.label}
                    </Link>
                  </h2>
                </div>
                <Link
                  href={footer.contactCta.href || "/contact"}
                  className="ml-10 inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-green-500 text-secondary transition-transform hover:scale-110"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-bordergray py-7.5">
            <div className="grid grid-cols-12">
              <div className="col-span-12 sm:col-span-6">
                <ul className="flex flex-wrap items-center gap-3 xl:gap-8">
                  {footer.socialLinks.map((social) => (
                    <li key={`${social.label}-${social.href}`}>
                      <a
                        href={social.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative text-base font-semibold text-bodytext transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-secondary after:transition-all after:duration-500 hover:text-secondary hover:after:w-full"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 sm:col-span-6 sm:ml-auto max-sm:mt-4 max-sm:text-center">
                <p className="text-base font-medium text-bodytext">
                  © {new Date().getFullYear()}{" "}
                  <span className="font-bold text-primary">{footer.copyrightBrand}</span>.{" "}
                  {footer.copyrightText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
