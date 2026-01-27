import { Compass, Heart } from "lucide-react";

const Footer = () => {
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

        <div className="border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-background">
                Scope<span className="text-accent">Hope</span>
              </span>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for students
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scope Hope. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
