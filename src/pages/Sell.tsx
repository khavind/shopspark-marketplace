import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { Store, TrendingUp, Globe, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: Globe, title: "Reach crores of customers", desc: "Get access to Amazon.in's massive customer base across India" },
  { icon: TrendingUp, title: "Grow your business", desc: "Use Amazon's tools and services to expand your reach" },
  { icon: Store, title: "Easy to start", desc: "Register, list products, and start selling in minutes" },
  { icon: ShieldCheck, title: "Secure payments", desc: "Get paid directly to your bank account every 7 days" },
];

const Sell = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />
      <div className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-amazon-navy to-amazon-navy-light text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sell on Amazon.in</h1>
            <p className="text-lg text-white/80 mb-8">
              Join lakhs of businesses and reach crores of customers on Amazon.in
            </p>
            <button className="amazon-btn-orange px-12 py-3 text-lg font-bold">
              Start Selling
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why sell on Amazon?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-lg p-6 text-center">
                <b.icon size={36} className="text-amazon-orange mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-muted py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">How to start selling</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: 1, title: "Register", desc: "Create your seller account with your GST and bank details" },
                { step: 2, title: "List Products", desc: "Add your products with images, description and pricing" },
                { step: 3, title: "Start Selling", desc: "Receive orders and ship to customers across India" },
              ].map((s) => (
                <div key={s.step} className="bg-card rounded-lg p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-amazon-orange text-white font-bold flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default Sell;
