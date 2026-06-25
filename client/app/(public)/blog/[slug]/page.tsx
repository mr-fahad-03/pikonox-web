export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, User, Clock, Share2, Tag } from "lucide-react";
import Link from "next/link";
import { getBlogBySlug, getBlogPosts } from "@/actions/blog";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";
import { DEFAULT_BLOGS } from "@/lib/default-blogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let blog = await getBlogBySlug(slug);
  
  if (!blog) {
    blog = DEFAULT_BLOGS.find((b) => b.slug === slug);
  }

  return buildEntityMetadata(
    blog ? {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      excerptOrDescription: blog.metaDescription || blog.excerpt,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      canonicalPath: blog.canonicalPath || `/blog/${slug}`,
      ogImage: blog.ogImage,
      image: blog.image,
    } : null,
    { path: `/blog/${slug}`, fallbackTitle: "Blog | PikoNox Insights" },
  );
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  let [blog, allBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getBlogPosts()
  ]);

  if (!blog) {
    blog = DEFAULT_BLOGS.find((b) => b.slug === slug);
  }

  if (!blog) notFound();

  const activeAllBlogs = allBlogs.length > 0 ? allBlogs : DEFAULT_BLOGS;
  const relatedBlogs = activeAllBlogs.filter((b: any) => b.slug !== slug).slice(0, 3);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.pikonox.com/blog/${blog.slug}`
    },
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",  
    "author": {
      "@type": "Person",
      "name": blog.author || "PikoNox Expert"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "PikoNox",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pikonox.com/logo.png"
      }
    },
    "datePublished": blog.publishedAt || new Date().toISOString()
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <article className="pt-32 pb-24 bg-white">
        {/* Article Header */}
        <div className="container max-w-4xl mx-auto mb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors mb-8 text-sm uppercase tracking-widest">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Insights
          </Link>
          
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
              {blog.category || "Technology"}
            </span>
            <div className="flex items-center gap-2 text-secondary/50 text-sm font-bold">
              <Clock className="w-4 h-4 text-primary" />
              5 Min Read
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-secondary leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 py-6 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-secondary">{blog.author || "PikoNox Expert"}</p>
                <p className="text-xs font-medium text-secondary/60">Software Engineer</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-secondary/70 text-sm font-bold">
              <Calendar className="w-4 h-4 text-primary" />
              {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recently Published"}
            </div>
          </div>
        </div>

        {/* Article Hero Image */}
        <div className="container max-w-5xl mx-auto mb-16">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[2/1] bg-slate-100">
            <img 
              src={blog.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content & Sidebar Grid */}
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-blue max-w-none text-secondary/80 font-medium leading-relaxed
                prose-h2:text-3xl prose-h2:font-black prose-h2:text-secondary prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:font-bold prose-h3:text-secondary prose-h3:mt-10 prose-h3:mb-4
                prose-p:mb-6 prose-strong:text-secondary prose-strong:font-black
                prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
              />

              {/* Tags & Sharing */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="w-5 h-5 text-secondary/40" />
                  {blog.metaKeywords?.split(',').slice(0, 3).map((keyword: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-secondary/70 text-sm font-bold hover:bg-white hover:border-primary/30 transition-colors cursor-pointer">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
                
                <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group">
                  <Share2 className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  Share Article
                </button>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 flex flex-col gap-8">
                
                {/* CTA Card */}
                <div className="bg-secondary rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-4">Build Your Next Big Idea</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
                      Our expert engineering team is ready to transform your vision into a scalable, high-performance digital product.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white hover:text-secondary transition-colors"
                    >
                      Start a Project <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                  <h3 className="font-black text-secondary text-xl mb-6">Related Articles</h3>
                  <div className="flex flex-col gap-6">
                    {relatedBlogs.map((related: any) => (
                      <Link href={`/blog/${related.slug}`} key={related.id} className="group flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                          <img src={related.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                            {related.title}
                          </h4>
                          <p className="text-xs font-bold text-secondary/50 uppercase tracking-wider">
                            {related.publishedAt ? new Date(related.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    </>
  );
}
