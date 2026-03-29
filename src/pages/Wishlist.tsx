import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "@/lib/api";
import { products } from "@/data/products";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("amazon_user");
    if (user) {
      const userData = JSON.parse(user);
      setUserEmail(userData.email);
      loadWishlist(userData.email);
    } else {
      setLoading(false);
    }
  }, []);

  const loadWishlist = async (email: string) => {
    try {
      setLoading(true);
      const ids = await getWishlist(email);
      setWishlistProductIds(ids);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const wishlistProducts = products.filter((p) => wishlistProductIds.includes(p.id));

  if (!userEmail) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AmazonHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <Heart size={64} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Please sign in</h2>
            <p className="text-muted-foreground mb-4">Sign in to view your wishlist</p>
            <Link to="/signin" className="amazon-btn-primary inline-block">Sign In</Link>
          </div>
        </div>
        <AmazonFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
        <div className="flex items-center gap-2 mb-6">
          <Heart size={32} className="text-amazon-deal" />
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading wishlist...</p>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-card rounded p-8">
            <Heart size={48} className="text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-lg text-muted-foreground mb-2">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-4">Add items to your wishlist to see them here</p>
            <Link to="/" className="amazon-btn-primary inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-4">{wishlistProducts.length} item(s) in your wishlist</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Wishlist;
