import { Compass, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
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

          {/* Tagline */}
          <p className="text-muted-foreground text-center md:text-left">
            Empowering students to make informed career choices with real data.
          </p>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for students
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Scope Hope. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
