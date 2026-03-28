import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { Package } from "lucide-react";

const Orders = () => {
  const { orders } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded p-8">
            <Package size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-lg text-muted-foreground mb-2">No orders yet</p>
            <Link to="/" className="amazon-btn-primary inline-block">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded overflow-hidden">
                <div className="bg-muted px-4 py-3 flex flex-wrap gap-4 justify-between items-center text-sm">
                  <div>
                    <span className="text-muted-foreground">ORDER PLACED: </span>
                    <span className="text-foreground">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">TOTAL: </span>
                    <span className="text-foreground font-bold">₹{order.total.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ORDER # </span>
                    <span className="text-amazon-link">{order.id}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 items-center">
                      <Link to={`/product/${product.id}`} className="w-16 h-16 flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`} className="text-sm text-amazon-link hover:text-amazon-orange line-clamp-1">
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Orders;
