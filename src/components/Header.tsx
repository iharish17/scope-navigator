import { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isScrolled ? 'bg-primary' : 'bg-primary-foreground/10'
            }`}>
              <Compass className={`w-5 h-5 ${isScrolled ? 'text-primary-foreground' : 'text-accent'}`} />
            </div>
            <span className={`font-display font-bold text-xl ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}>
              Scope<span className="text-accent">Hope</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#explore"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              Explore Fields
            </a>
            <a
              href="#stats"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              Statistics
            </a>
            <a
              href="#about"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              About
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button variant={isScrolled ? "default" : "hero"} size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#explore" className="text-sm font-medium text-foreground hover:text-primary">
                Explore Fields
              </a>
              <a href="#stats" className="text-sm font-medium text-foreground hover:text-primary">
                Statistics
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary">
                About
              </a>
              <Button className="w-full mt-2">Get Started</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
