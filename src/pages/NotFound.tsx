import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-amazon-orange mb-4">404</h1>
          <p className="text-xl text-foreground mb-2">Looking for something?</p>
          <p className="text-muted-foreground mb-6">
            We're sorry. The page you're looking for can't be found.
          </p>
          <Link to="/" className="amazon-btn-primary inline-block px-8 py-2.5">
            Go to Amazon.in's Home Page
          </Link>
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default NotFound;
