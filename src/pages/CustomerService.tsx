import { Link } from "react-router-dom";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { Package, RotateCcw, CreditCard, Truck, ShieldCheck, HelpCircle, MessageCircle, Phone } from "lucide-react";

const helpTopics = [
  { icon: Package, title: "Your Orders", desc: "Track packages, edit or cancel orders", link: "/orders" },
  { icon: RotateCcw, title: "Returns & Refunds", desc: "Return or exchange items, print return labels", link: "/orders" },
  { icon: CreditCard, title: "Payment & Pricing", desc: "Managing payment methods, promotions, coupons", link: "/account" },
  { icon: Truck, title: "Shipping & Delivery", desc: "Delivery rates, tracking, missing packages", link: "/orders" },
  { icon: ShieldCheck, title: "Account & Security", desc: "Update account settings, password, email", link: "/account" },
  { icon: HelpCircle, title: "Kindle & Digital", desc: "Digital content, devices, apps", link: "/" },
];

const CustomerService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">Customer Service</h1>
        <p className="text-muted-foreground mb-8">What would you like help with today?</p>

        {/* Help Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              to={topic.link}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-amazon-orange/30 transition-all flex gap-4 items-start"
            >
              <topic.icon size={28} className="text-amazon-link flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground text-sm">{topic.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{topic.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse help topics */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Recommended for you</h2>
          <div className="space-y-3">
            <Link to="/orders" className="block text-sm text-amazon-link hover:text-amazon-orange hover:underline">
              ▸ Where's my order?
            </Link>
            <Link to="/orders" className="block text-sm text-amazon-link hover:text-amazon-orange hover:underline">
              ▸ Return or replace items
            </Link>
            <Link to="/account" className="block text-sm text-amazon-link hover:text-amazon-orange hover:underline">
              ▸ Manage your account
            </Link>
            <Link to="/" className="block text-sm text-amazon-link hover:text-amazon-orange hover:underline">
              ▸ Track your package
            </Link>
            <Link to="/account" className="block text-sm text-amazon-link hover:text-amazon-orange hover:underline">
              ▸ Change your password
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <MessageCircle size={36} className="text-amazon-link mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-1">Chat with us</h3>
            <p className="text-sm text-muted-foreground mb-4">Available 24/7</p>
            <button className="amazon-btn-primary px-8 py-2">Start chatting</button>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Phone size={36} className="text-amazon-link mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-1">Call us</h3>
            <p className="text-sm text-muted-foreground mb-4">Toll-free: 1800-3000-9009</p>
            <button className="amazon-btn-orange px-8 py-2">Call now</button>
          </div>
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default CustomerService;
