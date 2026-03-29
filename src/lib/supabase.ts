import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_email: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_email: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_email: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_email: string;
          product_id: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_email: string;
          items: any[];
          total: number;
          address: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_email: string;
          items: any[];
          total: number;
          address: any;
          created_at?: string;
        };
      };
    };
  };
};
