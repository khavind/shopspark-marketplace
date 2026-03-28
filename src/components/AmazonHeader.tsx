import { Search, ShoppingCart, MapPin, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";
import { useState } from "react";

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
      <div className="bg-amazon-navy px-4 py-2 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded">
          <span className="text-secondary-foreground text-xl font-bold tracking-tight">
            amazon<span className="text-amazon-orange">.in</span>
          </span>
        </Link>

        {/* Deliver to */}
        <div className="hidden md:flex items-center gap-1 text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded cursor-pointer">
          <MapPin size={18} className="text-secondary-foreground" />
          <div>
            <p className="text-secondary-foreground/70">Delivering to Delhi</p>
            <p className="font-bold text-sm">Update location</p>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex h-10 rounded-md overflow-hidden">
          <div className="hidden md:flex items-center bg-muted px-2 text-xs text-foreground rounded-l-md border-r border-border">
            <span>All</span>
            <ChevronDown size={14} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 text-sm text-foreground bg-card outline-none"
          />
          <button type="submit" className="bg-amazon-orange hover:bg-amazon-orange-hover px-3 flex items-center rounded-r-md">
            <Search size={22} className="text-secondary" />
          </button>
        </form>

        {/* Account */}
        <div className="hidden md:block text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded cursor-pointer">
          <p className="text-secondary-foreground/70">Hello, Sign in</p>
          <p className="font-bold text-sm flex items-center">Account & Lists <ChevronDown size={12} /></p>
        </div>

        {/* Orders */}
        <Link to="/orders" className="hidden md:block text-secondary-foreground text-xs px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded">
          <p className="text-secondary-foreground/70">Returns</p>
          <p className="font-bold text-sm">& Orders</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 text-secondary-foreground px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded relative">
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 right-0 text-amazon-orange font-bold text-sm">{getCartCount()}</span>
          </div>
          <span className="hidden md:inline font-bold text-sm">Cart</span>
        </Link>
      </div>

      {/* Sub Nav */}
      <div className="bg-amazon-navy-light px-4 py-1 flex items-center gap-1 overflow-x-auto text-secondary-foreground text-sm">
        {categories.slice(1).map((cat) => (
          <Link
            key={cat}
            to={`/?category=${encodeURIComponent(cat)}`}
            className="whitespace-nowrap px-2 py-1 border border-transparent hover:border-secondary-foreground/50 rounded"
          >
            {cat}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default AmazonHeader;
