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
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Products</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/orders" className="hover:underline">Your Account</Link></li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">Help</li>
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
