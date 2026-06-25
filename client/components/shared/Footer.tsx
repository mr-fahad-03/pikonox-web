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
  locations: ["Punjab, Pakistan"],
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

const COUNTRIES = [
  { name: "Bangladesh", subtitle: "Dhaka, Bangladesh", code: "bd" },
  { name: "UAE", subtitle: "Dubai, UAE", code: "ae" },
  { name: "Saudi Arabia", subtitle: "Riyadh, KSA", code: "sa" },
  { name: "Qatar", subtitle: "Doha, Qatar", code: "qa" },
  { name: "Indonesia", subtitle: "Jakarta, Indonesia", code: "id" },
  { name: "Nigeria", subtitle: "Lagos, Nigeria", code: "ng" },
  { name: "Pakistan", subtitle: "Punjab, Pakistan", code: "pk" },
  { name: "United Kingdom", subtitle: "London, UK", code: "gb" },
  { name: "United States", subtitle: "New York, USA", code: "us" },
  { name: "Canada", subtitle: "Toronto, Canada", code: "ca" },
];

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
      <div className="relative w-full h-[420px] md:h-[500px] lg:h-[580px] bg-black overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="none" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        >
          <source src="https://www.xiomtech.net/footer_globe.mp4" type="video/mp4" />
        </video>
        
        {/* Top gradient fade overlay */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-white via-transparent to-transparent h-32 z-10 pointer-events-none" />
        
        {/* Bottom gradient fade overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-transparent to-transparent h-32 z-10 pointer-events-none" />

        {/* Glassmorphic Country Cards Grid */}
        <div className="absolute inset-x-0 bottom-12 md:bottom-16 flex justify-center z-20 px-5">
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-3 md:gap-4 max-w-7xl w-full">
            {COUNTRIES.map((country) => (
              <div 
                key={country.code} 
                className="bg-black/5 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-4 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  alt={`${country.name} flag`} 
                  loading="lazy" 
                  width="40" 
                  height="30" 
                  className="mx-auto mb-2 rounded-sm" 
                  src={`/flags/${country.code}.png`} 
                />
                <p className="text-white font-bold text-sm">{country.name}</p>
                <p className="text-white/60 text-xs mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis px-1">{country.subtitle}</p>
              </div>
            ))}
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
