import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSeo from "@/hooks/useSeo";

const NotFound = () => {
  useSeo({
    title: "404 — Page Not Found — Ingenuity",
    description: "Page not found. Ingenuity Specialized Engineering Works Ltd — mining services Zambia, PPE supplier Zambia, industrial hardware Zambia, construction company Zambia, mining supply Copperbelt."
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-6">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found — Ingenuity Specialized Engineering Works Ltd
          </h2>
          <h3 className="text-sm text-muted-foreground mb-4">Find mining services Zambia, PPE supplier Zambia and industrial hardware in our main menu.</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 hover:bg-charcoal hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
