# 🛒 Amazon Clone — Full-Stack E-Commerce Platform

A fully functional e-commerce web application that closely replicates **Amazon India's** design, user experience, and core functionality. Built as a modern single-page application with product browsing, cart management, wishlist, and order placement features.

![Amazon Clone Banner](screenshots/banner.png)

---

## 🌐 Live Demo

🔗 **Deployed URL:** [https://amazon-five-zeta.vercel.app/](https://amazon-five-zeta.vercel.app/)

---

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Product Listing with Category Sidebar
![Category Page](screenshots/category-page.png)

### Product Detail Page
![Product Detail](screenshots/product-detail.png)

### Shopping Cart
![Cart](screenshots/cart.png)

### Checkout Flow
![Checkout](screenshots/checkout.png)

### Order Confirmation
![Order Confirmation](screenshots/order-confirmation.png)

### Sign In / Sign Up
![Sign In](screenshots/signin.png)

### My Account
![Account](screenshots/account.png)

### Side Navigation Menu
![Side Menu](screenshots/side-menu.png)

### Mobile Responsive View
![Mobile View](screenshots/mobile-view.png)

---

## 🚀 Tech Stack

| Layer        | Technology                                                                 |
|-------------|---------------------------------------------------------------------------|
| **Frontend** | React 18, TypeScript, Vite                                               |
| **Styling**  | Tailwind CSS, shadcn/ui component library                                |
| **Routing**  | React Router DOM v6                                                      |
| **State**    | React Context API (Cart, Wishlist)                                       |
| **Data**     | TanStack React Query                                                     |
| **Icons**    | Lucide React                                                             |
| **Carousel** | Embla Carousel                                                           |
| **Forms**    | React Hook Form + Zod validation                                        |
| **Testing**  | Vitest, Playwright                                                       |
| **Build**    | Vite + SWC                                                               |

---

## ✨ Features

### Core Functionality
- 🔍 **Product Search** — Real-time search with URL-based query persistence
- 🛒 **Cart Management** — Add, remove, update quantities with persistent state
- ❤️ **Wishlist** — Save products for later with dedicated wishlist page
- 📦 **Order Placement** — Full checkout flow with order confirmation
- 👤 **User Authentication** — Sign in / Sign up with localStorage persistence
- 📂 **Category Browsing** — Filter products by category with sidebar navigation

### UI/UX Features
- 🎠 **Hero Banner Carousel** — Auto-rotating promotional banners
- 📱 **Fully Responsive** — Mobile-first design with adaptive layouts
- 🍔 **Slide-out Side Menu** — Amazon-style "All" navigation panel
- ⭐ **Star Ratings** — Visual product rating display
- 🏷️ **Deal Cards** — Category-specific deal sections with pricing
- 🔗 **Sub-navigation Bar** — Quick category access links

### Pages
| Page               | Route                        | Description                          |
|--------------------|------------------------------|--------------------------------------|
| Home               | `/`                          | Hero banners, deals, product sliders |
| Category Browse    | `/?category=Electronics`     | Filtered products with sidebar       |
| Product Detail     | `/product/:id`               | Full product info, specs, reviews    |
| Cart               | `/cart`                      | Shopping cart with quantity controls  |
| Checkout           | `/checkout`                  | Address & payment form               |
| Order Confirmation | `/order-confirmation/:id`    | Order success with details           |
| Orders             | `/orders`                    | Order history                        |
| Wishlist           | `/wishlist`                  | Saved items                          |
| Sign In            | `/signin`                    | Login / Register                     |
| My Account         | `/account`                   | Account dashboard                    |
| Customer Service   | `/customer-service`          | Help center                          |
| Sell on Amazon     | `/sell`                      | Seller registration info             |

---

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** or **bun** package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/amazon-clone.git
cd amazon-clone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:8080
```

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npx playwright test
```

---

## 📁 Project Structure

```
src/
├── assets/             # Static assets (logo, banner images)
├── components/         # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── AmazonHeader.tsx
│   ├── AmazonFooter.tsx
│   ├── HeroBanner.tsx
│   ├── ProductCard.tsx
│   ├── ProductSlider.tsx
│   ├── CategorySidebar.tsx
│   ├── CategoryDealCards.tsx
│   ├── SideMenu.tsx
│   ├── StarRating.tsx
│   └── NavLink.tsx
├── context/            # React Context providers
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
├── data/               # Static product & category data
│   └── products.ts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route-level page components
│   ├── Index.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   ├── Orders.tsx
│   ├── Wishlist.tsx
│   ├── SignIn.tsx
│   ├── Account.tsx
│   ├── CustomerService.tsx
│   ├── Sell.tsx
│   └── NotFound.tsx
└── App.tsx             # Root component with routing
```

---

## 💡 Assumptions Made

1. **No Backend Server** — The app uses static product data and `localStorage` for user sessions, cart, and orders. No external API or database is required to run the project.
2. **Authentication is Simulated** — Sign-in stores user info in `localStorage` for demonstration purposes; no real authentication provider is used.
3. **Product Images** — Product images are sourced from Unsplash and placeholder URLs; in a production app these would come from a CDN or database.
4. **Payment Processing** — The checkout flow is UI-only; no real payment gateway (Stripe, Razorpay, etc.) is integrated.
5. **Single Currency** — All prices are displayed in Indian Rupees (₹) to match the Amazon India theme.
6. **Static Data** — Product catalog is hardcoded in `src/data/products.ts` with 80+ products across 15+ categories.
7. **Responsive Design** — Optimized for desktop and mobile viewports; tablet layouts adapt fluidly.

---

## 📄 License

This project is built for educational/demonstration purposes only. Amazon branding and design patterns are property of Amazon.com, Inc.

---

## 👨‍💻 Author

Built with ❤️ using [Lovable](https://lovable.dev)
