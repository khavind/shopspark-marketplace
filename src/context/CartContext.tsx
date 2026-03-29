import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";
import { saveOrder, sendOrderConfirmationEmail, getUserOrders } from "@/lib/api";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: ShippingAddress;
  date: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  placeOrder: (address: ShippingAddress) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("amazon_user");
    if (user) {
      const userData = JSON.parse(user);
      setUserEmail(userData.email);
      loadOrders(userData.email);
    }
  }, []);

  const loadOrders = async (email: string) => {
    try {
      const data = await getUserOrders(email);
      const formattedOrders = data.map((o: any) => ({
        id: o.id,
        items: o.items,
        total: o.total,
        address: o.address,
        date: o.created_at,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getCartTotal = useCallback(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const getCartCount = useCallback(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const placeOrder = useCallback(
    async (address: ShippingAddress) => {
      if (!userEmail) {
        throw new Error("User not authenticated");
      }

      const orderId = "ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      const total = getCartTotal();

      const order: Order = {
        id: orderId,
        items: [...items],
        total,
        address,
        date: new Date().toISOString(),
      };

      try {
        // Save to Supabase
        await saveOrder(orderId, userEmail, items, total, address);

        // Send email notification
        try {
          await sendOrderConfirmationEmail(
            userEmail,
            orderId,
            items.map(item => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            total
          );
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          // Don't throw - email error shouldn't block order placement
        }

        setOrders((prev) => [order, ...prev]);
        setItems([]);
        return orderId;
      } catch (error) {
        console.error("Error placing order:", error);
        throw error;
      }
    },
    [items, getCartTotal, userEmail]
  );

  return (
    <CartContext.Provider
      value={{ items, orders, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
