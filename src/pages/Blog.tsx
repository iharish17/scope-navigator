import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Emerging Career Fields in 2026",
      excerpt:
        "Discover the fastest-growing career opportunities and what skills you need to succeed in them.",
      category: "Career Trends",
      date: "Jan 25, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "How to Choose a Career Without Regrets",
      excerpt:
        "A practical guide to making career decisions that align with your values and long-term goals.",
      category: "Career Guide",
      date: "Jan 20, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Truth About Competition in Popular Fields",
      excerpt:
        "Understanding what high competition really means and how to stand out in crowded industries.",
      category: "Industry Insights",
      date: "Jan 15, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Skills That Will Matter in the Next Decade",
      excerpt:
        "Future-proof your career by developing these essential skills that employers will value most.",
      category: "Skills Development",
      date: "Jan 10, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "From Student to Professional: A Transition Guide",
      excerpt:
        "Navigate the challenging transition from academic life to the professional world with confidence.",
      category: "Career Guide",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Understanding Salary Expectations by Field",
      excerpt:
        "A comprehensive breakdown of salary ranges across different career fields and experience levels.",
      category: "Industry Insights",
      date: "Dec 28, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, guides, and tips to help you navigate your career journey with confidence.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <h2 className="font-display text-lg font-semibold leading-tight hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
                    Read <ArrowRight className="w-3 h-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
