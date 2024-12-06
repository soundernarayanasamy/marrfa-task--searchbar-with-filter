"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export function Searchbar() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Latest News");

  const API_KEY = "pub_614794285d29b6bae3f0e5f118b378de0849c";

  const fetchNews = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${searchQuery}`
      );
      const data = await response.json();

      if (response.ok) {
        setArticles(data.results || []);
      } else {
        throw new Error(data.message || "Failed to fetch news");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(filter.toLowerCase());
  }, [filter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 mt-32">
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b mb-8 from-neutral-50 to-neutral-400 bg-opacity-50">
        Search Bōx
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-3xl">
        <PlaceholdersAndVanishInput
          placeholders={["Search the News", "World News"]}
          onChange={handleChange}
          onSubmit={() => fetchNews(query)}
        />
      </div>

      {/* Dropdown Filter - Below Search Bar */}
      <div className="mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-transparent text-white border border-white rounded-lg px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              {filter}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            sideOffset={8}
            className="bg-black bg-opacity-50 text-white rounded-lg shadow-md py-2"
          >
            <DropdownMenuItem
  className="cursor-pointer hover:bg-gray-700 px-4 py-2 focus:bg-gray-700 focus:outline-none active:bg-gray-700"
  onSelect={() => handleFilterChange("Latest News")}
>
  Latest News
</DropdownMenuItem>
<DropdownMenuItem
  className="cursor-pointer hover:bg-gray-700 px-4 py-2 focus:bg-gray-700 focus:outline-none active:bg-gray-700"
  onSelect={() => handleFilterChange("World News")}
>
  World News
</DropdownMenuItem>
<DropdownMenuItem
  className="cursor-pointer hover:bg-gray-700 px-4 py-2 focus:bg-gray-700 focus:outline-none active:bg-gray-700"
  onSelect={() => handleFilterChange("Sports")}
>
  Sports
</DropdownMenuItem>
<DropdownMenuItem
  className="cursor-pointer hover:bg-gray-700 px-4 py-2 focus:bg-gray-700 focus:outline-none active:bg-gray-700"
  onSelect={() => handleFilterChange("Entertainment")}
>
  Entertainment
</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading && <p className="mt-4 text-lg">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* News Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {articles.length > 0 &&
          articles
            .filter(
              (article) =>
                article.title &&
                article.description &&
                article.image_url
            )
            .map((article, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow hover:shadow-lg transition flex flex-col h-full"
              >
                {/* Image */}
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {truncateText(article.description, 120)}
                  </p>
                </div>

                {/* Link */}
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-4"
                >
                  Read more
                </a>
              </div>
            ))}
      </div>

      {!loading && !error && articles.length === 0 && (
        <p className="mt-4">No articles found.</p>
      )}
    </div>
  );
}
