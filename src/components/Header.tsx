import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Linkedin, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopContactBar = () => (
  <div className="bg-charcoal text-charcoal-foreground py-2 px-4">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
      <div className="flex items-center gap-6">
        <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Phone className="h-4 w-4" />
          <span>+1 (234) 567-890</span>
        </a>
        <a href="mailto:info@heavyhire.com" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Mail className="h-4 w-4" />
          <span>info@heavyhire.com</span>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
          <Facebook className="h-4 w-4" />
        </a>
        <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
          <Instagram className="h-4 w-4" />
        </a>
        <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Hire", href: "/hire" },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Team", href: "/team" },
      { label: "FAQ", href: "/faq" },
      { label: "Certifications", href: "/certifications" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full">
      <TopContactBar />
      <nav
        className={`w-full bg-background border-b border-border transition-all duration-300 ${
          isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="font-display text-xl font-bold text-primary-foreground">HH</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              HEAVY<span className="text-primary">HIRE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors focus:outline-none">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <Link
                          to={subItem.href}
                          className="w-full px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-primary text-primary-foreground hover:bg-accent font-semibold px-6">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="flex flex-col gap-2">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <div className="pl-4 flex flex-col gap-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Button className="bg-primary text-primary-foreground hover:bg-accent font-semibold w-full mt-2">
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
