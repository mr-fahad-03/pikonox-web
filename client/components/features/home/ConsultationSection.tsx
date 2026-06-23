"use client";

import { submitContact } from "@/actions/contact";
import { useState, useCallback } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactData {
  heading?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  services?: string[];
}

export default function ConsultationSection({ data }: { data?: ContactData }) {
  const services = data?.services?.length
    ? data.services
    : [
        "AI & Machine Learning",
        "Cloud Infrastructure",
        "Custom Software Development",
        "Dedicated Tech Teams",
        "Other Inquiry",
      ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submitContact(formData);
    if (res.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      alert("Thanks! Your inquiry has been submitted.");
    } else {
      alert(res.error ?? "Submission failed");
    }
  }, [formData]);

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="contact">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-100/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left - Information */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Let&apos;s Connect
              </span>
              <h2 className="text-[38px] md:text-[50px] font-extrabold text-secondary mb-6 leading-[1.1] tracking-tight">
                {data?.heading ?? "Ready to Accelerate Your Growth?"}
              </h2>
              <p className="text-secondary/60 text-lg leading-relaxed">
                {data?.description ??
                  "Whether you need elite AI engineering, robust cloud infrastructure, or a dedicated software team, our experts are ready to turn your vision into reality."}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              {/* Contact item */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md shadow-gray-200/50 flex items-center justify-center shrink-0 border border-gray-50">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-secondary/50 uppercase tracking-wider mb-1">Call Us Directly</h4>
                  <a href={`tel:${data?.phone ?? "+11234567890"}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors">
                    {data?.phone ?? "+1 (123) 456-7890"}
                  </a>
                </div>
              </div>
              
              {/* Contact item */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md shadow-gray-200/50 flex items-center justify-center shrink-0 border border-gray-50">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-secondary/50 uppercase tracking-wider mb-1">Email Our Team</h4>
                  <a href={`mailto:${data?.email ?? "hello@pikonox.com"}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors">
                    {data?.email ?? "hello@pikonox.com"}
                  </a>
                </div>
              </div>

              {/* Contact item */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md shadow-gray-200/50 flex items-center justify-center shrink-0 border border-gray-50">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-secondary/50 uppercase tracking-wider mb-1">Global Headquarters</h4>
                  <p className="text-xl font-bold text-secondary">
                    {data?.address ?? "Silicon Valley, CA"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-7 relative">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/[0.04] border border-gray-100/80">
              <h3 className="text-2xl font-bold text-secondary mb-8">
                Tell us about your project
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[14px] font-semibold text-secondary mb-1.5 block">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-semibold text-secondary mb-1.5 block">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[14px] font-semibold text-secondary mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-semibold text-secondary mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[14px] font-semibold text-secondary mb-1.5 block">Service of Interest</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="" disabled>Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[14px] font-semibold text-secondary mb-1.5 block">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little bit about what you're trying to build..."
                    rows={4}
                    className="w-full py-2.5 px-4 rounded-lg border border-gray-200 bg-white text-secondary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none shadow-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group flex w-full md:w-auto items-center justify-center gap-2 bg-primary hover:bg-green-600 text-white font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-300 shadow-md shadow-primary/30 hover:shadow-green-500/45"
                  >
                    <span>Send Inquiry</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-green-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Soft shadow accent below form */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/10 via-transparent to-green-200/20 rounded-[2rem] -z-10 blur-xl"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
