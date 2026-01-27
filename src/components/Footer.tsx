import { Compass, Heart, Twitter, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Explore Fields", href: "#explore" },
    { name: "Statistics", href: "#stats" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "/contact" },
  ];

  const resources = [
    { name: "Career Guide", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Support", href: "#" },
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  ];

  return (
    <footer id="about" className="bg-foreground text-background py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-background mb-4">
            About Scope<span className="text-accent">Hope</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Many students choose courses due to pressure, trends, or lack of information—and later regret their decision. 
            Scope Hope helps students understand the real scope of any field with accurate, data-based insights 
            so they can make career choices with confidence, not blindly.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-background">
                Scope<span className="text-accent">Hope</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to make informed career choices with real data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-background mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-background mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted-foreground/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for students
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Scope Hope. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
