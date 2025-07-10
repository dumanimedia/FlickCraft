import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="relative z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-black rounded-full relative">
                <div className="absolute inset-1 border border-black rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <span className="text-white text-xl font-bold">Filmagnet</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-yellow-500 transition-colors font-medium"
            >
              HOME
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-500 transition-colors font-medium"
            >
              MOVIE
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-500 transition-colors font-medium"
            >
              TV SHOW
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-yellow-500 transition-colors font-medium"
            >
              PREMIUM
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-500"
            >
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-yellow-500 flex items-center space-x-1"
                >
                  <span>EN</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 bg-transparent"
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
