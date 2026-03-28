import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import StarRating from "./StarRating";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <Link to={`/product/${product.id}`} className="amazon-card flex flex-col group">
      <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden bg-card rounded">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-amazon-deal text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded">
            {discount}% off
          </span>
        )}
      </div>
      <h3 className="text-sm text-foreground line-clamp-2 mb-1 group-hover:text-amazon-orange transition-colors">
        {product.name}
      </h3>
      <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
        )}
      </div>
      {!product.inStock && (
        <p className="text-amazon-deal text-xs mt-1">Currently unavailable</p>
      )}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="amazon-btn-primary mt-auto pt-2 mt-3 text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
