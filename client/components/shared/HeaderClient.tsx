"use client";

import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

type HeaderData = {
  brand?: {
    prefix?: string;
    suffix?: string;
    href?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  cta?: {
    label?: string;
    href?: string;
  };
  nav?: NavItem[];
  socialLinks?: Array<{
    label?: string;
    href?: string;
    icon?: string;
  }>;
};

const DEFAULT_DATA: Required<HeaderData> = {
  brand: {
    prefix: "Web",
    suffix: "Xprt",
    href: "/",
  },
  contact: {
    phone: "+1 (123) 456-78-90",
    email: "info@pikonox.com",
  },
  cta: {
    label: "Let's Connect",
    href: "/contact",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [],
};

function socialIcon(name?: string) {
  const value = (name || "").toLowerCase();
  if (value.includes("instagram")) return FaInstagram;
  if (value.includes("linkedin")) return FaLinkedinIn;
  if (value.includes("facebook")) return FaFacebookF;
  return FaTwitter;
}

function matchesRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeaderClient({ data }: { data?: HeaderData }) {
  const header = {
    ...DEFAULT_DATA,
    ...data,
    brand: { ...DEFAULT_DATA.brand, ...data?.brand },
    contact: { ...DEFAULT_DATA.contact, ...data?.contact },
    cta: { ...DEFAULT_DATA.cta, ...data?.cta },
    nav: data?.nav?.length ? data.nav : DEFAULT_DATA.nav,
    socialLinks: data?.socialLinks ?? DEFAULT_DATA.socialLinks,
  };

  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = useMemo(() => header.nav, [header.nav]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-[999] w-full transition-all duration-500 ease-out",
        isScrolled ? "bg-secondary/90 py-2 shadow-lg backdrop-blur-xl" : "py-5",
      )}
    >
      <div className="container px-4 sm:px-10 2xl:px-17">
        <div className="flex items-center justify-between">
          <Link
            href={header.brand.href || "/"}
            className="group flex items-center gap-1 text-3xl font-extrabold tracking-tight"
          >
            <span className="text-primary transition-colors group-hover:text-blue-400">
              {header.brand.prefix}
            </span>
            <span className="text-white transition-colors group-hover:text-gray-200">
              {header.brand.suffix}
            </span>
            <span className="mb-1 ml-0.5 h-2 w-2 rounded-full bg-green-500" />
          </Link>

          <nav className="hidden xl:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => {
                const itemActive =
                  matchesRoute(pathname, item.href) ||
                  item.children?.some((child) => matchesRoute(pathname, child.href));

                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href || "#"}
                      className={cn(
                        "relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-semibold transition-all duration-300",
                        itemActive ? "text-primary" : "text-white/90 hover:text-primary",
                      )}
                    >
                      <span>{item.label}</span>
                      {item.children?.length ? (
                        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                      ) : null}
                    </Link>

                    {item.children?.length ? (
                      <ul className="invisible absolute left-0 top-full mt-2 w-64 translate-y-2 overflow-hidden rounded-2xl border border-gray-100 bg-white opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href || "#"}
                              className={cn(
                                "block border-b border-gray-50 px-6 py-3.5 text-[14px] font-medium transition-colors last:border-0",
                                matchesRoute(pathname, child.href)
                                  ? "bg-blue-50 text-primary"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-primary",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${header.contact.phone}`}
              className="hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[15px] font-bold text-white transition-colors hover:text-primary lg:flex"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="tracking-wide">{header.contact.phone}</span>
            </a>

            <Link
              href={header.cta.href || "/contact"}
              className="group hidden items-center rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-blue-600 sm:inline-flex"
            >
              <span className="mr-3 text-[14px] font-bold tracking-wide">{header.cta.label}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:scale-105">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>

            <button
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors hover:bg-white/20 xl:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="flex w-6 flex-col gap-1.5">
                <span className="block h-0.5 w-full rounded-full bg-white" />
                <span className="ml-auto block h-0.5 w-2/3 rounded-full bg-white" />
                <span className="block h-0.5 w-full rounded-full bg-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        onClick={closeMobileMenu}
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-[1001] h-full w-[85%] bg-white shadow-2xl transition-transform duration-500 ease-out sm:w-[400px] xl:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <Link
              href={header.brand.href || "/"}
              className="flex items-center gap-1 text-2xl font-bold tracking-tight"
              onClick={closeMobileMenu}
            >
              <span className="text-primary">{header.brand.prefix}</span>
              <span className="text-secondary">{header.brand.suffix}</span>
              <span className="mb-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
            </Link>
            <button
              onClick={closeMobileMenu}
              className="flex size-10 items-center justify-center rounded-full bg-gray-50 text-secondary transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label} className="group">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href || "#"}
                      className={cn(
                        "py-2 text-lg font-bold transition-colors",
                        matchesRoute(pathname, item.href) ? "text-primary" : "text-secondary hover:text-primary",
                      )}
                      onClick={() => {
                        if (!item.children?.length || item.href !== "#") closeMobileMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <button
                        onClick={() =>
                          setActiveAccordion((value) => (value === item.label ? null : item.label))
                        }
                        className={cn(
                          "flex size-8 items-center justify-center rounded-lg bg-gray-50 transition-all duration-300",
                          activeAccordion === item.label ? "rotate-180 bg-primary text-white" : "text-gray-400",
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {item.children?.length ? (
                    <div
                      className={cn(
                        "overflow-hidden pl-4 transition-all duration-300 ease-in-out",
                        activeAccordion === item.label ? "mt-2 max-h-[300px] opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      <ul className="space-y-3 border-l-2 border-primary/10 py-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href || "#"}
                              className={cn(
                                "block pl-4 text-[15px] font-medium transition-colors",
                                matchesRoute(pathname, child.href)
                                  ? "text-primary"
                                  : "text-gray-500 hover:text-primary",
                              )}
                              onClick={closeMobileMenu}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-gray-100 pt-10">
              <h4 className="mb-6 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                Contact Us
              </h4>
              <div className="space-y-5">
                <a href={`mailto:${header.contact.email}`} className="group flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-gray-400">Official Mail</p>
                    <p className="text-[15px] font-bold text-secondary">{header.contact.email}</p>
                  </div>
                </a>
                <a href={`tel:${header.contact.phone}`} className="group flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-gray-400">Quick Support</p>
                    <p className="text-[15px] font-bold text-secondary">{header.contact.phone}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-gray-500">Follow us:</p>
              <div className="flex items-center gap-3">
                {header.socialLinks.map((social, index) => {
                  const Icon = socialIcon(social.icon || social.label);
                  return (
                    <a
                      key={`${social.label}-${index}`}
                      href={social.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-9 items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
