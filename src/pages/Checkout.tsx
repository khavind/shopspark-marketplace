import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, ShippingAddress } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { toast } from "sonner";

const Checkout = () => {
  const { items, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AmazonHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">No items to checkout</h2>
            <Link to="/" className="amazon-btn-primary inline-block">Continue Shopping</Link>
          </div>
        </div>
        <AmazonFooter />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const orderId = placeOrder(address);
    navigate(`/order-confirmation/${orderId}`);
  };

  const inputClass = "w-full px-3 py-2 border border-border rounded text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amazon-orange/50 focus:border-amazon-orange";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Address Form */}
            <div className="lg:col-span-2 bg-card rounded p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Shipping Address</h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                <input name="fullName" value={address.fullName} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
                <input name="phone" value={address.phone} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address Line 1 *</label>
                <input name="addressLine1" value={address.addressLine1} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address Line 2</label>
                <input name="addressLine2" value={address.addressLine2} onChange={handleChange} className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">City *</label>
                  <input name="city" value={address.city} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">State *</label>
                  <input name="state" value={address.state} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Pincode *</label>
                  <input name="pincode" value={address.pincode} onChange={handleChange} className={inputClass} required />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded p-6 sticky top-4">
                <h2 className="text-lg font-bold text-foreground border-b border-border pb-2 mb-3">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between">
                      <span className="text-muted-foreground truncate max-w-[180px]">{product.name} × {quantity}</span>
                      <span className="text-foreground font-medium">₹{(product.price * quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between text-sm">
                  <span>Delivery</span>
                  <span className="text-amazon-teal font-medium">FREE</span>
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between text-lg font-bold text-foreground">
                  <span>Order Total</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <button type="submit" className="amazon-btn-orange w-full py-2.5 mt-4">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Checkout;
