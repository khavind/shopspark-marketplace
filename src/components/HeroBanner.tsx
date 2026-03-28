import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import banner3 from "@/assets/banner-3.png";
import banner4 from "@/assets/banner-4.png";

const banners = [banner1, banner2, banner3, banner4];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden bg-secondary">
      <div className="relative w-full" style={{ aspectRatio: "1560/400" }}>
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Deal banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            width={1560}
            height={400}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
        ))}
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-0 bottom-16 sm:bottom-24 w-10 sm:w-12 md:w-16 flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-0 bottom-16 sm:bottom-24 w-10 sm:w-12 md:w-16 flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
        aria-label="Next banner"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
      </button>
    </div>
  );
};

export default HeroBanner;
