import { Search, ShoppingCart, MapPin, ChevronDown, Menu, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import amazonLogo from "@/assets/amazon-logo.png";

const subNavItems = [
  "Fresh", "MX Player", "Sell", "Bestsellers", "Mobiles", "Today's Deals",
  "Customer Service", "New Releases", "Prime", "Fashion", "Electronics",
  "Amazon Pay", "Home & Kitchen", "Computers", "Toys & Games", "Books",
  "Gift Cards", "Beauty & Personal Care", "Car & Motorbike",
];

const AmazonHeader = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header>
      {/* Top Nav */}
      <div className="bg-amazon-navy px-2 py-1 flex items-center gap-1">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded">
          <img src={amazonLogo} alt="Amazon.in" className="h-8 object-contain" />
        </Link>

        {/* Deliver to */}
        <div className="hidden md:flex items-center gap-1 text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded cursor-pointer">
          <MapPin size={18} className="text-secondary-foreground" />
          <div>
            <p className="text-secondary-foreground/70 text-[11px]">Delivering to Delhi 110008</p>
            <p className="font-bold text-sm">Update location</p>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex h-10 rounded-md overflow-hidden">
          <div className="hidden md:flex items-center bg-muted px-2 text-xs text-foreground rounded-l-md border-r border-border gap-0.5 cursor-pointer">
            <span className="text-muted-foreground text-[12px]">All</span>
            <ChevronDown size={12} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search Amazon.in"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 text-sm text-foreground bg-card outline-none"
          />
          <button type="submit" className="bg-amazon-orange hover:bg-amazon-orange-hover px-3 flex items-center rounded-r-md">
            <Search size={22} className="text-secondary" />
          </button>
        </form>

        {/* Language */}
        <div className="hidden lg:flex items-center gap-1 text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded cursor-pointer">
          <Globe size={16} />
          <span className="font-bold text-sm">EN</span>
          <ChevronDown size={10} />
        </div>

        {/* Account */}
        <div className="hidden md:block text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded cursor-pointer">
          <p className="text-secondary-foreground/70 text-[11px]">Hello, sign in</p>
          <p className="font-bold text-sm flex items-center gap-0.5">Account & Lists <ChevronDown size={10} /></p>
        </div>

        {/* Returns & Orders */}
        <Link to="/orders" className="hidden md:block text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded">
          <p className="text-secondary-foreground/70 text-[11px]">Returns</p>
          <p className="font-bold text-sm">& Orders</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-0 text-secondary-foreground px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded relative">
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 right-0 text-amazon-orange font-bold text-sm">{getCartCount()}</span>
          </div>
          <span className="hidden md:inline font-bold text-sm">Cart</span>
        </Link>
      </div>

      {/* Sub Nav */}
      <div className="bg-amazon-navy-light px-2 py-0.5 flex items-center gap-0 overflow-x-auto text-secondary-foreground text-sm">
        <Link
          to="/"
          className="flex items-center gap-1 whitespace-nowrap px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded font-bold"
        >
          <Menu size={18} />
          <span>All</span>
        </Link>
        {subNavItems.map((item) => (
          <Link
            key={item}
            to={`/?category=${encodeURIComponent(item)}`}
            className="whitespace-nowrap px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded text-[13px]"
          >
            {item}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default AmazonHeader;
