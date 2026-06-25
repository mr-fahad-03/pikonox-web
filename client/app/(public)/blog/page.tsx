export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getBlogPosts } from "@/actions/blog";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";
import { DEFAULT_BLOGS } from "@/lib/default-blogs";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-blog"), getSection("page-blog")]);
  return buildListingMetadata({
    metaTitle: seo?.metaTitle || page?.metaTitle || "PikoNox Insights | Tech Agency Blog",
    metaDescription: seo?.metaDescription || page?.metaDescription || "Explore our latest thoughts, guides, and industry news about the future of technology, software development, and business growth.",
    metaKeywords: seo?.metaKeywords || page?.metaKeywords || "tech blog, software development blog, UI/UX design trends, Next.js tutorials, Flutter development, Cloud computing insights",
    path: "/blog",
    fallbackTitle: "Blog | PikoNox Insights",
    fallbackDescription:
      "Stay updated with the latest trends in AI, cloud computing, and digital transformation.",
  });
}

export default async function BlogPage() {
  const [blogs] = await Promise.all([getBlogPosts()]);
  
  const activeBlogs = blogs.length > 0 ? blogs : DEFAULT_BLOGS;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "PikoNox Insights",
    "url": "https://www.pikonox.com/blog",
    "description": "Expert insights on modern software development, AI, and cloud architecture.",
    "blogPost": activeBlogs.map((post: any) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://www.pikonox.com/blog/${post.slug}`,
      "datePublished": post.publishedAt || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author || "PikoNox Expert"
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="pt-32 pb-24 bg-slate-50 relative overflow-hidden min-h-screen">
        <div className="container">
          
          {/* Giant SEO Header instead of Breadcrumb */}
          <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
            <span className="text-primary font-black tracking-[0.2em] uppercase text-sm mb-4 block">PikoNox Insights</span>
            <h1 className="text-5xl lg:text-7xl font-black text-secondary mb-8 leading-tight">Latest Technology & Business Trends</h1>
            <p className="text-xl text-secondary/80 leading-relaxed font-medium">
              Explore our latest thoughts, technical guides, and industry news. From Next.js architecture and Flutter mobile apps to Cloud DevOps and Artificial Intelligence, stay ahead of the digital curve.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {activeBlogs.map((post: any) => (
              <div key={post.id} className="col-span-12 md:col-span-6 lg:col-span-4 group flex flex-col h-full bg-white rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100">
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden h-64 w-full shrink-0 bg-slate-100">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-primary text-xs font-black uppercase tracking-widest shadow-sm">
                      {post.category || "General"}
                    </span>
                  </div>
                </Link>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-6 mb-5">
                    <div className="flex items-center gap-2 text-secondary/50 text-sm font-bold">
                      <Calendar className="w-4 h-4 text-primary" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </div>
                    <div className="flex items-center gap-2 text-secondary/50 text-sm font-bold">
                      <User className="w-4 h-4 text-primary" />
                      {post.author || "Admin"}
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-2xl font-black text-secondary mb-4 hover:text-primary transition-colors leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-secondary/70 font-medium mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group/btn"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
