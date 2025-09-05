// 'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Search, Menu, X, ChevronDown, Globe } from 'lucide-react'
import LogoImg from '@/logo.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={LogoImg} alt="FlickCraft Logo" />
          {/* <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
          <span className="font-heading font-bold text-xl text-white">
            FlickCraft
          </span>
          <span className="text-sm text-muted-foreground hidden sm:block">
            Discover & Craft Movies
          </span> */}
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-primary transition-colors"
          >
            HOME
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-primary transition-colors"
          >
            MOVIE
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-primary transition-colors"
          >
            TV SHOWS
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-primary transition-colors"
          >
            PEOPLE
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-primary transition-colors"
          >
            PREMIUM
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-primary"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                size="sm"
                className="text-white hover:text-primary flex items-center space-x-1"
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

          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            SIGN IN
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
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
                to="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors py-2"
              >
                HOME
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors py-2"
              >
                MOVIE
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors py-2"
              >
                TV SHOWS
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors py-2"
              >
                PEOPLE
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors py-2"
              >
                PREMIUM
              </Link>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  SIGN IN
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
