import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import StarRating from "@/components/StarRating";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AmazonHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Product not found.</p>
        </div>
        <AmazonFooter />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-4 py-2 text-sm text-muted-foreground">
        <Link to="/" className="amazon-link">Home</Link>
        <span className="mx-1">›</span>
        <Link to={`/?category=${product.category}`} className="amazon-link">{product.category}</Link>
        <span className="mx-1">›</span>
        <span className="text-foreground">{product.name.slice(0, 40)}...</span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-4 flex-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-4">
              <div className="relative aspect-square flex items-center justify-center mb-4">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-1 rounded-r shadow"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-1 rounded-l shadow"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-14 h-14 rounded border-2 overflow-hidden flex items-center justify-center ${
                      i === currentImage ? "border-amazon-orange" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <h1 className="text-xl font-medium text-foreground mb-2">{product.name}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />

            <div className="border-t border-border mt-3 pt-3">
              {discount > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amazon-deal text-secondary-foreground text-sm font-bold px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    M.R.P.: ₹{product.originalPrice?.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-foreground align-top">₹</span>
                <span className="text-3xl font-medium text-foreground">{product.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
            </div>

            <div className="border-t border-border mt-4 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-amazon-teal" />
                <span>FREE Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={18} className="text-amazon-teal" />
                <span>7 Day Replacement</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck size={18} className="text-amazon-teal" />
                <span>1 Year Warranty</span>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <h3 className="font-bold text-sm mb-2">About this item</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {Object.keys(product.specifications).length > 0 && (
              <div className="border-t border-border mt-4 pt-4">
                <h3 className="font-bold text-sm mb-2">Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-border/50">
                        <td className="py-1.5 pr-4 text-muted-foreground font-medium">{key}</td>
                        <td className="py-1.5 text-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-xs align-top">₹</span>
                <span className="text-2xl font-medium">{product.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-amazon-teal">FREE Delivery</p>
              <p className={`text-sm font-bold ${product.inStock ? "text-amazon-teal" : "text-amazon-deal"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="amazon-btn-primary w-full py-2.5 disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="amazon-btn-orange w-full py-2.5 disabled:opacity-50"
              >
                Buy Now
              </button>
              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p>Ships from: Amazon Clone</p>
                <p>Sold by: Amazon Clone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AmazonFooter />
    </div>
  );
};

export default ProductDetail;
