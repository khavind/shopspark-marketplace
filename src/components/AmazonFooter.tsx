import { Link } from "react-router-dom";

const AmazonFooter = () => {
  return (
    <footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-amazon-footer-mid text-secondary-foreground text-sm py-3 hover:bg-amazon-navy-light transition-colors"
      >
        Back to top
      </button>
      <div className="bg-amazon-footer text-secondary-foreground py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/" className="hover:underline">About Us</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/sell" className="hover:underline">Sell on Amazon</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/sell" className="hover:underline">Sell on Amazon</Link></li>
              <li><Link to="/sell" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="/sell" className="hover:underline">Advertise Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/account" className="hover:underline">Your Account</Link></li>
              <li><Link to="/orders" className="hover:underline">Returns Centre</Link></li>
              <li><Link to="/customer-service" className="hover:underline">Customer Service</Link></li>
              <li><Link to="/customer-service" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-amazon-navy text-secondary-foreground/50 text-xs text-center py-4">
        © 2026 Amazon Clone. Built with Lovable.
      </div>
    </footer>
  );
};

export default AmazonFooter;
