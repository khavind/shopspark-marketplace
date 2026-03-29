import { supabase } from "./supabase";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

// Reviews API
export async function getProductReviews(productId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addReview(
  productId: string,
  userEmail: string,
  rating: number,
  comment: string
) {
  const { data, error } = await supabase
    .from("reviews")
    .upsert({
      product_id: productId,
      user_email: userEmail,
      rating,
      comment,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
}

// Wishlist API
export async function getWishlist(userEmail: string) {
  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_email", userEmail);

  if (error) throw error;
  return (data || []).map((item) => item.product_id);
}

export async function addToWishlist(userEmail: string, productId: string) {
  const { data, error } = await supabase
    .from("wishlists")
    .insert({
      user_email: userEmail,
      product_id: productId,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
}

export async function removeFromWishlist(userEmail: string, productId: string) {
  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_email", userEmail)
    .eq("product_id", productId);

  if (error) throw error;
}

export async function isInWishlist(
  userEmail: string,
  productId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_email", userEmail)
    .eq("product_id", productId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
}

// Orders API
export async function getUserOrders(userEmail: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function saveOrder(
  orderId: string,
  userEmail: string,
  items: any[],
  total: number,
  address: any
) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      id: orderId,
      user_email: userEmail,
      items,
      total,
      address,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
}

// Email API
export async function sendOrderConfirmationEmail(
  userEmail: string,
  orderId: string,
  items: any[],
  total: number
) {
  try {
    const itemsList = items
      .map((item) => `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`)
      .join("\n");

    const response = await resend.emails.send({
      from: "noreply@shopspark.com",
      to: userEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Thank you for your order.</p>
        <h3>Order ID: ${orderId}</h3>
        <h3>Items:</h3>
        <pre>${itemsList}</pre>
        <h3>Total: ₹${total.toFixed(2)}</h3>
        <p>You will receive shipping updates soon.</p>
      `,
    });

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
