import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.webp"
          alt="Spider-Man: No Way Home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Spider man
            <br />
            No Way Home
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                IMDb
              </div>
              <span className="text-white font-semibold">8.2</span>
              <span className="text-white/60">(12,827)</span>
            </div>
            <span className="text-white/60">•</span>
            <span className="text-white/80">2021</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">1 hour 55 minutes</span>
            <span className="text-white/60">•</span>
            <Badge variant="outline" className="border-white/30 text-white/80">
              Sci-fi
            </Badge>
          </div>

          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-xl">
            Scelerisque sed ultricies tristique. Mi in vivamus aliquam varius eu
            felis. Id ultricies diam turpis mi tincidunt. Ut morbi sed urna
            tempor imperdiet eu scelerisque egestas. Interdum mi orci
            suspendisse in s...{" "}
            <button className="text-yellow-500 hover:text-yellow-400 transition-colors">
              See more
            </button>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
            >
              Watch trailer
            </Button>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
