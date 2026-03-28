import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AmazonHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-4">Add items to get started.</p>
            <Link to="/" className="amazon-btn-primary inline-block">Continue Shopping</Link>
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded p-6">
              <h1 className="text-2xl font-bold text-foreground mb-1">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-4">Price</p>

              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-4 border-b border-border">
                  <Link to={`/product/${product.id}`} className="w-24 h-24 flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`} className="text-foreground hover:text-amazon-orange text-sm font-medium line-clamp-2">
                      {product.name}
                    </Link>
                    <p className="text-xs text-amazon-teal mt-1">{product.inStock ? "In Stock" : "Out of Stock"}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border rounded overflow-hidden">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-muted">
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm bg-muted font-medium min-w-[36px] text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-muted">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-amazon-link text-sm flex items-center gap-1 hover:text-amazon-deal">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}

              <div className="text-right pt-4">
                <span className="text-lg">
                  Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
                  <span className="font-bold">₹{getCartTotal().toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded p-6 sticky top-4">
              <p className="text-lg mb-4">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):{" "}
                <span className="font-bold">₹{getCartTotal().toLocaleString()}</span>
              </p>
              <Link to="/checkout" className="amazon-btn-primary block text-center w-full py-2.5">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Cart;
