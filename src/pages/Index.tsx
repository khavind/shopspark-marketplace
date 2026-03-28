import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonFooter from "@/components/AmazonFooter";
import { useState, useMemo } from "react";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  const filteredProducts = useMemo(() => {
    let result = products;
    const cat = searchParams.get("category") || selectedCategory;
    if (cat && cat !== "All") {
      result = result.filter((p) => p.category === cat);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, selectedCategory, searchParams]);

  const activeCategory = searchParams.get("category") || selectedCategory;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AmazonHeader />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-amazon-teal/20 to-background px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : activeCategory !== "All"
              ? activeCategory
              : "Today's Deals"}
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-4 flex-1 flex gap-6">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <h3 className="font-bold text-sm text-foreground mb-2">Category</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm w-full text-left px-2 py-1 rounded transition-colors ${
                    activeCategory === cat
                      ? "font-bold text-amazon-orange"
                      : "text-foreground hover:text-amazon-orange"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredProducts.length} results
          </p>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found.</p>
              <p className="text-sm text-muted-foreground">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <AmazonFooter />
    </div>
  );
};

export default Index;
