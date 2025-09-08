import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { QueryProvider } from "@/lib/query-provider";

export const metadata: Metadata = {
  title: {
    default: "FlickCraft - Craft Your Watchlist. Discover the Best.",
    template: "%s - FlickCraft",
  },
  description:
    "Discover the best movies and TV shows tailored to your taste with personalized recommendations, trending content, and reviews.",
  keywords: [
    "Movie Discovery",
    "Discover Movies and TV Shows",
    "Movie Watchlist App",
    "Best Movies and Shows",
    "Film Recommendations",
    "Watchlist for Movies and TV Shows",
    "Top Movies to Watch",
    "Find Movies to Watch",
    "Personalized Movie Recommendations",
    "Custom Movie Watchlist",
    "Movie Collections",
    "Trending Movies Today",
    "Top Movie Recommendations for Movie Lovers",
    "Discover New Movies",
    "Personalized TV Show Recommendations",
    "Movies by Genre",
    "Best Movie Discovery App",
    "Movie Watchlist Generator",
    "Create Movie Watchlists",
    "Movies for Every Mood",
    "Curated Movie Watchlists",
    "TV Show Discovery Tool",
    "Watchlist Sharing",
    "Movie and TV Show Ratings",
    "Movies on Netflix, Hulu, Prime Video",
    "Trending TV Shows",
    "Discover Trending Movies",
    "Movie Database Search",
    "Binge-Watch TV Shows",
    "Watchlist for Families",
    "Movie Search and Filter",
    "Best Way to Discover Movies",
    "Discover Movies by Genre",
    "Top Picks for Movie Nights",
    "Best Movie Collections",
  ],
  authors: [{ name: "Dumani Media", url: "https://dumanimedia.com" }],
  creator: "Dumani Media",
  publisher: "Dumani Media",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flick-craft.vercel.app",
    title: "FlickCraft - Craft Your Watchlist. Discover the Best.",
    description:
      "Discover the best movies and TV shows tailored to your taste with personalized recommendations, trending content, and reviews.",
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "FlickCraft Social Preview Img",
      },
    ],
    siteName: "FlickCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlickCraft - Craft Your Watchlist. Discover the Best.",
    description:
      "Discover the best movies and TV shows tailored to your taste with personalized recommendations, trending content, and reviews.",
    images: ["/social-preview.jpg"],
  },
  alternates: {
    canonical: "https://flick-craft.vercel.app",
  },
  other: {
    "theme-color": "#E41E2D",
    "msapplication-TileColor": "#E41E2D",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        <NextTopLoader color="#E41E2D" showSpinner={false} />
        <QueryProvider>
          <Header /> {children} <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

// https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7
