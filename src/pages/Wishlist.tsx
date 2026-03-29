import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (productId: string) => {
    const product = items.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast.success("Moved to cart!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-16 bg-card rounded p-8">
            <Heart size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-lg text-muted-foreground mb-2">Your wishlist is empty</p>
            <Link to="/" className="amazon-btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {items.map((product) => (
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
