import { X, ChevronRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const trendingItems = [
  { label: "Bestsellers", link: "/?category=Bestsellers" },
  { label: "New Releases", link: "/?category=New Releases" },
  { label: "Movers and Shakers", link: "/?category=Bestsellers" },
];

const digitalItems = [
  { label: "Echo & Alexa", link: "/?category=Electronics" },
  { label: "Fire TV", link: "/?category=Electronics" },
  { label: "Kindle E-Readers & eBooks", link: "/?category=Books" },
  { label: "Audible Audiobooks", link: "/?category=Books" },
  { label: "Amazon Prime Video", link: "/" },
  { label: "Amazon Prime Music", link: "/" },
];

const shopByCategory = [
  { label: "Mobiles, Computers", link: "/?category=Mobiles" },
  { label: "TV, Appliances, Electronics", link: "/?category=Electronics" },
  { label: "Men's Fashion", link: "/?category=Fashion" },
  { label: "Women's Fashion", link: "/?category=Fashion" },
  { label: "Home, Kitchen, Pets", link: "/?category=Home %26 Kitchen" },
  { label: "Beauty, Health, Grocery", link: "/?category=Beauty %26 Personal Care" },
  { label: "Sports, Fitness, Bags", link: "/?category=Fresh" },
  { label: "Toys, Baby Products", link: "/?category=Toys %26 Games" },
  { label: "Car, Motorbike, Industrial", link: "/?category=Car %26 Motorbike" },
  { label: "Books", link: "/?category=Books" },
];

const programsItems = [
  { label: "Gift Cards & Mobile Recharges", link: "/?category=Gift Cards" },
  { label: "Amazon Launchpad", link: "/" },
  { label: "Amazon Business", link: "/" },
  { label: "Sell on Amazon", link: "/sell" },
];

const helpItems = [
  { label: "Your Account", link: "/account" },
  { label: "Customer Service", link: "/customer-service" },
  { label: "Sign in", link: "/signin" },
];

const SideMenu = ({ open, onClose }: SideMenuProps) => {
  const user = JSON.parse(localStorage.getItem("amazon_user") || "null");

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[365px] max-w-[85vw] bg-white z-[101] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <Link
          to={user ? "/account" : "/signin"}
          onClick={onClose}
          className="bg-amazon-navy-light px-6 py-3 flex items-center gap-3 hover:opacity-90"
        >
          <User className="text-white" size={24} />
          <span className="text-white font-bold text-lg">
            Hello, {user ? user.name : "sign in"}
          </span>
        </Link>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-[-44px] text-white p-2 hover:bg-white/10 rounded-full z-[102]"
        >
          <X size={28} />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Trending */}
          <Section title="Trending">
            {trendingItems.map((item) => (
              <MenuLink key={item.label} label={item.label} link={item.link} onClose={onClose} />
            ))}
          </Section>

          <Divider />

          {/* Digital Content and Devices */}
          <Section title="Digital Content and Devices">
            {digitalItems.map((item) => (
              <MenuLink key={item.label} label={item.label} link={item.link} onClose={onClose} expandable />
            ))}
          </Section>

          <Divider />

          {/* Shop by Category */}
          <Section title="Shop by Category">
            {shopByCategory.map((item) => (
              <MenuLink key={item.label} label={item.label} link={item.link} onClose={onClose} />
            ))}
          </Section>

          <Divider />

          {/* Programs & Features */}
          <Section title="Programs & Features">
            {programsItems.map((item) => (
              <MenuLink key={item.label} label={item.label} link={item.link} onClose={onClose} />
            ))}
          </Section>

          <Divider />

          {/* Help & Settings */}
          <Section title="Help & Settings">
            {helpItems.map((item) => (
              <MenuLink key={item.label} label={item.label} link={item.link} onClose={onClose} />
            ))}
          </Section>

          <div className="h-6" />
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-2">
    <h3 className="px-6 py-2 font-bold text-lg text-foreground">{title}</h3>
    {children}
  </div>
);

const MenuLink = ({
  label,
  link,
  expandable,
  onClose,
}: {
  label: string;
  link: string;
  expandable?: boolean;
  onClose: () => void;
}) => (
  <Link to={link} onClick={onClose}>
    <div className="flex items-center justify-between px-6 py-2.5 hover:bg-muted cursor-pointer text-sm text-foreground">
      <span>{label}</span>
      {expandable && <ChevronRight size={16} className="text-muted-foreground" />}
    </div>
  </Link>
);

const Divider = () => <div className="border-t border-border mx-0" />;

export default SideMenu;
