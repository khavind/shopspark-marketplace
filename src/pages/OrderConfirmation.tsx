import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders } = useCart();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-card rounded-lg p-8 max-w-lg w-full text-center shadow">
          <CheckCircle size={64} className="text-amazon-teal mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-4">Thank you for your order.</p>
          <div className="bg-muted rounded p-4 mb-6">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-lg font-bold text-amazon-orange">{orderId}</p>
          </div>
          {order && (
            <div className="text-left border-t border-border pt-4 mb-6">
              <h3 className="font-bold text-sm mb-2">Delivering to:</h3>
              <p className="text-sm text-muted-foreground">
                {order.address.fullName}<br />
                {order.address.addressLine1}{order.address.addressLine2 && `, ${order.address.addressLine2}`}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}<br />
                Phone: {order.address.phone}
              </p>
              <div className="mt-3 border-t border-border pt-3">
                <p className="font-bold text-sm">Total: ₹{order.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{order.items.reduce((s, i) => s + i.quantity, 0)} item(s)</p>
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <Link to="/orders" className="amazon-btn-primary">View Orders</Link>
            <Link to="/" className="amazon-btn-orange">Continue Shopping</Link>
          </div>
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default OrderConfirmation;
