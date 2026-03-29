import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import amazonLogo from "@/assets/amazon-logo.png";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      localStorage.setItem("amazon_user", JSON.stringify({ name, email }));
      toast.success("Account created successfully!");
    } else {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      const saved = localStorage.getItem("amazon_user");
      if (saved) {
        const user = JSON.parse(saved);
        if (user.email !== email) {
          toast.error("No account found with this email");
          return;
        }
      } else {
        localStorage.setItem("amazon_user", JSON.stringify({ name: email.split("@")[0], email }));
      }
      toast.success("Signed in successfully!");
    }
    navigate("/");
  };

  const inputClass =
    "w-full px-3 py-2 border border-border rounded text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amazon-orange/50 focus:border-amazon-orange";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-background border-b border-border py-4 flex justify-center">
        <Link to="/">
          <img src={amazonLogo} alt="Amazon.in" className="h-8 object-contain" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {isSignUp ? "Create account" : "Sign in"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Your name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last name"
                    className={inputClass}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">
                  Email or mobile phone number
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? "At least 6 characters" : ""}
                  className={inputClass}
                />
              </div>
              <button type="submit" className="amazon-btn-orange w-full py-2 text-sm">
                {isSignUp ? "Create your Amazon account" : "Sign in"}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              By continuing, you agree to Amazon's{" "}
              <span className="text-amazon-link cursor-pointer">Conditions of Use</span> and{" "}
              <span className="text-amazon-link cursor-pointer">Privacy Notice</span>.
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">
                {isSignUp ? "Already have an account?" : "New to Amazon?"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full border border-border rounded-lg py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            {isSignUp ? "Sign in" : "Create your Amazon account"}
          </button>
        </div>
      </div>

      <AmazonFooter />
    </div>
  );
};

export default SignIn;
