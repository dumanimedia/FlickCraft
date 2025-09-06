import { Link } from '@tanstack/react-router'

import LogoImg from '@/logo.svg'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={LogoImg}
                alt="FlickCraft Logo"
                className="w-36 sm:w-48 h-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Discover & Craft Movies. Your ultimate destination for discovering
              the best movies and TV shows tailored to your taste.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Browse
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/movie"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Account
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 FlickCraft. All rights reserved. Built with Next.js and
            powered by TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}
