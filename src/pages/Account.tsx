import { Link } from "react-router-dom";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { Package, MapPin, Shield, CreditCard, Bell, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const accountSections = [
  {
    icon: Package,
    title: "Your Orders",
    desc: "Track, return, or buy things again",
    link: "/orders",
  },
  {
    icon: Shield,
    title: "Login & Security",
    desc: "Edit login, name, and mobile number",
    link: "/signin",
  },
  {
    icon: MapPin,
    title: "Your Addresses",
    desc: "Edit addresses for orders and gifts",
    link: "/checkout",
  },
  {
    icon: CreditCard,
    title: "Payment Options",
    desc: "Edit or add payment methods",
    link: "#",
  },
  {
    icon: Bell,
    title: "Communication Preferences",
    desc: "Choose what notifications to receive",
    link: "#",
  },
  {
    icon: User,
    title: "Your Profiles",
    desc: "Manage, add, or remove user profiles",
    link: "#",
  },
];

const Account = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("amazon_user") || "null");

  const handleSignOut = () => {
    localStorage.removeItem("amazon_user");
    toast.success("Signed out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Your Account</h1>
          {user && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-amazon-link hover:text-amazon-orange hover:underline"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          )}
        </div>

        {!user && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6 text-center">
            <p className="text-muted-foreground mb-3">Sign in to access your account</p>
            <Link to="/signin" className="amazon-btn-orange inline-block px-8 py-2">
              Sign In
            </Link>
          </div>
        )}

        {user && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amazon-navy flex items-center justify-center text-white font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-bold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accountSections.map((section) => (
            <Link
              key={section.title}
              to={section.link}
              className="bg-card border border-border rounded-lg p-5 hover:bg-muted/50 transition-colors flex gap-4 items-start"
            >
              <section.icon size={32} className="text-amazon-link flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Account;
