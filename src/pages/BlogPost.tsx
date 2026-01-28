import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Emerging Career Fields in 2026",
    excerpt:
      "Discover the fastest-growing career opportunities and what skills you need to succeed in them.",
    category: "Career Trends",
    date: "Jan 25, 2026",
    readTime: "5 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    content: `
      <p>The job market is evolving rapidly, and staying ahead of the curve is essential for career success. Here are the top 10 emerging career fields that are set to dominate in 2026 and beyond.</p>
      
      <h2>1. Artificial Intelligence & Machine Learning</h2>
      <p>AI continues to transform industries from healthcare to finance. Professionals with skills in machine learning, natural language processing, and computer vision are in high demand. Entry-level positions start around $80,000, with senior roles exceeding $200,000.</p>
      
      <h2>2. Sustainable Energy</h2>
      <p>As the world shifts toward renewable energy sources, careers in solar, wind, and battery technology are booming. Engineers and technicians in this field can expect steady growth and competitive salaries.</p>
      
      <h2>3. Cybersecurity</h2>
      <p>With increasing digital threats, cybersecurity experts are more valuable than ever. Organizations are investing heavily in protecting their data, creating numerous opportunities for security analysts and ethical hackers.</p>
      
      <h2>4. Healthcare Technology</h2>
      <p>The intersection of healthcare and technology is creating new roles in telemedicine, health informatics, and medical device development. This field combines technical skills with the rewarding aspect of improving patient care.</p>
      
      <h2>5. Data Science & Analytics</h2>
      <p>Companies are increasingly data-driven, making data scientists essential for business strategy. Skills in statistical analysis, Python, and data visualization are highly sought after.</p>
      
      <h2>6. Remote Work Infrastructure</h2>
      <p>The shift to remote work has created demand for professionals who can build and maintain virtual collaboration tools, cloud infrastructure, and remote team management systems.</p>
      
      <h2>7. Biotechnology</h2>
      <p>Advances in genetic engineering, drug development, and agricultural technology are opening new career paths for scientists and researchers passionate about biological innovation.</p>
      
      <h2>8. Digital Marketing & E-commerce</h2>
      <p>As businesses continue to expand online, digital marketing specialists and e-commerce managers are essential for driving growth and customer engagement.</p>
      
      <h2>9. Space Technology</h2>
      <p>The new space race is creating opportunities in satellite technology, space tourism, and interplanetary research. This exciting field offers unique challenges and rewards.</p>
      
      <h2>10. Mental Health Services</h2>
      <p>Growing awareness of mental health has increased demand for counselors, therapists, and wellness coaches. This field offers meaningful work with excellent job security.</p>
      
      <h2>Preparing for the Future</h2>
      <p>To succeed in these emerging fields, focus on continuous learning, building relevant skills, and staying adaptable. Consider online courses, certifications, and networking to position yourself for these exciting opportunities.</p>
    `,
  },
  {
    id: 2,
    title: "How to Choose a Career Without Regrets",
    excerpt:
      "A practical guide to making career decisions that align with your values and long-term goals.",
    category: "Career Guide",
    date: "Jan 20, 2026",
    readTime: "7 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    content: `
      <p>Choosing a career is one of the most significant decisions you'll make in your life. Here's a comprehensive guide to help you make a choice you won't regret.</p>
      
      <h2>Start with Self-Assessment</h2>
      <p>Before exploring career options, take time to understand yourself. Consider your interests, values, skills, and personality traits. What activities energize you? What problems do you enjoy solving? What environment do you thrive in?</p>
      
      <h2>Research Thoroughly</h2>
      <p>Once you have a sense of your preferences, research careers that align with them. Look at job descriptions, salary ranges, growth potential, and day-to-day responsibilities. Talk to professionals in fields that interest you.</p>
      
      <h2>Consider the Long-Term</h2>
      <p>Think about where you want to be in 10, 20, or 30 years. Some careers offer steady growth, while others may peak early. Consider how your choice will affect your lifestyle, family, and personal goals.</p>
      
      <h2>Don't Chase Money Alone</h2>
      <p>While financial stability is important, choosing a career solely for money often leads to dissatisfaction. Find a balance between earning potential and personal fulfillment.</p>
      
      <h2>Embrace Flexibility</h2>
      <p>Remember that career paths aren't linear. Many successful professionals have changed fields multiple times. Choose something that excites you now while keeping doors open for future opportunities.</p>
      
      <h2>Take Action</h2>
      <p>The best way to know if a career is right for you is to try it. Seek internships, part-time jobs, or volunteer opportunities in your field of interest. Real-world experience is invaluable.</p>
      
      <h2>Trust the Process</h2>
      <p>Career decisions can feel overwhelming, but trust that you'll figure things out along the way. Stay curious, keep learning, and be open to new possibilities.</p>
    `,
  },
  {
    id: 3,
    title: "The Truth About Competition in Popular Fields",
    excerpt:
      "Understanding what high competition really means and how to stand out in crowded industries.",
    category: "Industry Insights",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    content: `
      <p>When researching careers, you'll often hear that certain fields are "highly competitive." But what does that really mean, and should it deter you from pursuing your dreams?</p>
      
      <h2>Understanding Competition</h2>
      <p>High competition typically means there are more qualified candidates than available positions. However, this doesn't mean success is impossible—it means you need to be strategic.</p>
      
      <h2>Quality Over Quantity</h2>
      <p>In competitive fields, the difference between getting hired and being overlooked often comes down to the quality of your work and presentation. Focus on building a strong portfolio, gaining relevant experience, and developing unique skills.</p>
      
      <h2>Network Strategically</h2>
      <p>Many positions in competitive fields are filled through networking before they're even posted publicly. Build genuine relationships with professionals in your industry through events, social media, and mentorship programs.</p>
      
      <h2>Find Your Niche</h2>
      <p>Instead of competing for the same positions as everyone else, identify a specific niche where you can become an expert. Specialization can reduce competition while increasing your value.</p>
      
      <h2>Persistence Pays Off</h2>
      <p>In competitive fields, rejection is common. What separates successful professionals is their ability to learn from setbacks and keep pushing forward. Develop resilience and maintain a growth mindset.</p>
      
      <h2>The Hidden Opportunity</h2>
      <p>Competitive fields often attract the most talented people and offer the greatest rewards. If you're passionate about a field, don't let competition discourage you—use it as motivation to become the best.</p>
    `,
  },
  {
    id: 4,
    title: "Skills That Will Matter in the Next Decade",
    excerpt:
      "Future-proof your career by developing these essential skills that employers will value most.",
    category: "Skills Development",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    content: `
      <p>The skills that employers value are constantly evolving. Here are the key abilities that will be in high demand over the next decade.</p>
      
      <h2>Technical Skills</h2>
      <p>Regardless of your field, basic technical literacy is essential. This includes data analysis, understanding AI tools, and comfort with digital platforms. You don't need to be a programmer, but you should understand how technology impacts your industry.</p>
      
      <h2>Critical Thinking</h2>
      <p>As AI handles more routine tasks, human critical thinking becomes more valuable. The ability to analyze complex problems, evaluate information, and make sound decisions will be crucial.</p>
      
      <h2>Emotional Intelligence</h2>
      <p>Understanding and managing emotions—both your own and others'—is essential for leadership, teamwork, and customer relations. This skill is difficult to automate and increasingly valued.</p>
      
      <h2>Adaptability</h2>
      <p>The pace of change is accelerating. Professionals who can quickly learn new skills, adapt to new situations, and embrace change will thrive in the coming decade.</p>
      
      <h2>Communication</h2>
      <p>Clear, effective communication remains essential. This includes writing, speaking, and visual presentation skills. The ability to convey complex ideas simply is particularly valuable.</p>
      
      <h2>Creativity</h2>
      <p>Human creativity is irreplaceable. Whether you're solving problems, designing products, or developing strategies, creative thinking will set you apart from both competitors and AI.</p>
      
      <h2>Continuous Learning</h2>
      <p>Perhaps the most important skill is the ability and willingness to keep learning. Develop a habit of continuous improvement, and you'll stay relevant regardless of how your industry evolves.</p>
    `,
  },
  {
    id: 5,
    title: "From Student to Professional: A Transition Guide",
    excerpt:
      "Navigate the challenging transition from academic life to the professional world with confidence.",
    category: "Career Guide",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    content: `
      <p>The transition from student to professional can be challenging. Here's how to navigate this important phase successfully.</p>
      
      <h2>Mindset Shift</h2>
      <p>Academic success is about individual achievement, but professional success often depends on collaboration. Learn to work effectively in teams, share credit, and support your colleagues.</p>
      
      <h2>Time Management</h2>
      <p>Unlike school, work rarely has clear deadlines and assignments. You'll need to manage your time proactively, prioritize tasks, and balance multiple responsibilities.</p>
      
      <h2>Professional Communication</h2>
      <p>Workplace communication differs from academic writing. Practice being concise, clear, and professional in emails, meetings, and presentations.</p>
      
      <h2>Building Relationships</h2>
      <p>Your network is crucial for career growth. Make an effort to connect with colleagues, mentors, and industry peers. These relationships will support your career for years to come.</p>
      
      <h2>Managing Expectations</h2>
      <p>Entry-level roles may feel underwhelming compared to your academic achievements. Be patient—everyone starts somewhere. Focus on learning and proving yourself.</p>
      
      <h2>Work-Life Balance</h2>
      <p>Without the natural breaks of semesters and vacations, maintaining work-life balance requires intention. Set boundaries, prioritize self-care, and make time for activities outside work.</p>
      
      <h2>Embrace the Learning Curve</h2>
      <p>You'll make mistakes—everyone does. What matters is how you learn from them. Stay humble, seek feedback, and continuously improve.</p>
    `,
  },
  {
    id: 6,
    title: "Understanding Salary Expectations by Field",
    excerpt:
      "A comprehensive breakdown of salary ranges across different career fields and experience levels.",
    category: "Industry Insights",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    author: "ScopeHope Team",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    content: `
      <p>Understanding salary expectations is crucial for career planning. Here's a breakdown of what you can expect across different fields and experience levels.</p>
      
      <h2>Technology</h2>
      <p>Tech continues to offer some of the highest salaries. Entry-level software developers start around $70,000-$90,000, while senior engineers and architects can earn $150,000-$300,000+. Specialized roles in AI and machine learning command premium salaries.</p>
      
      <h2>Healthcare</h2>
      <p>Healthcare salaries vary widely. Nurses start around $60,000-$80,000, while physicians can earn $200,000-$400,000+. Specialized roles and those requiring advanced degrees typically pay more.</p>
      
      <h2>Business & Finance</h2>
      <p>Entry-level business roles start around $50,000-$70,000. Finance professionals can see significant growth, with senior positions in investment banking or private equity reaching $200,000-$500,000+.</p>
      
      <h2>Creative Fields</h2>
      <p>Creative careers often have lower starting salaries ($40,000-$60,000) but can be highly rewarding for top performers. Senior designers, creative directors, and successful freelancers can earn $100,000+.</p>
      
      <h2>Education</h2>
      <p>Teachers typically earn $45,000-$80,000 depending on location and experience. Higher education and administrative roles offer higher salaries, with professors earning $80,000-$150,000+.</p>
      
      <h2>Factors That Affect Salary</h2>
      <p>Location, company size, industry, and negotiation skills all impact your earning potential. Research specific roles in your target location for accurate expectations.</p>
      
      <h2>Beyond the Numbers</h2>
      <p>Remember that salary is just one factor in career satisfaction. Consider benefits, work-life balance, growth opportunities, and job fulfillment when evaluating career options.</p>
    `,
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id || "1");
  
  const post = blogPosts.find((p) => p.id === postId);
  const currentIndex = blogPosts.findIndex((p) => p.id === postId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header alwaysVisible />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header alwaysVisible />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video overflow-hidden rounded-xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12
              prose-headings:font-display prose-headings:text-foreground
              prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Navigation */}
          <nav className="border-t pt-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prevPost ? (
                <Link to={`/blog/${prevPost.id}`} className="flex-1">
                  <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground mb-1">Previous</div>
                      <div className="text-sm font-medium line-clamp-1">{prevPost.title}</div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              
              {nextPost ? (
                <Link to={`/blog/${nextPost.id}`} className="flex-1">
                  <Button variant="outline" className="w-full justify-end gap-2 h-auto py-4">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">Next</div>
                      <div className="text-sm font-medium line-clamp-1">{nextPost.title}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
