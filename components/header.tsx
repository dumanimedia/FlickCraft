"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Globe, Menu, Search, X } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserButtons from "./user-buttons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="FlickCraft Logo"
            className="w-36 sm:w-48 h-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            MOVIE
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            TV SHOWS
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            PEOPLE
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            PREMIUM
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="link"
            size="sm"
            className="text-foreground hover:text-primary hidden sm:inline-flex"
          >
            <Search className="w-5 h-5" />
          </Button>

          <div className="relative hidden sm:inline-flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="text-foreground hover:text-primary flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">EN</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>German</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <UserButtons />
          {/* <Link href="/sign-in">
            <Button size="sm" className="border-primary">
              SIGN IN
            </Button>
          </Link> */}

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto max-w-7xl px-4 py-4 space-y-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50"
              />
            </form>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                HOME
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                MOVIE
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                TV SHOWS
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                PEOPLE
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                PREMIUM
              </Link>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-foreground"
                >
                  SIGN IN
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
