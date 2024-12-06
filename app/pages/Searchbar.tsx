"use client";
import React, { useState, useEffect } from "react";
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
        const uniqueArticles = data.results
          ? data.results.filter(
            (article: any, index: number, self: any[]) =>
              index === self.findIndex((a: any) => a.link === article.link)
          )
          : [];

        setArticles(uniqueArticles);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 mt-32">
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b  from-neutral-50 to-neutral-400 bg-opacity-50">
        News Search Bōx
      </h1>
      <p className="mt-4 font-normal  text-[18px] text-neutral-400 max-w-lg text-center mx-auto">
        This is the assignment for Marraf, where we can search world news with filter options.
      </p>

      <div className="w-full max-w-3xl flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
        <div className="flex-grow">
          <PlaceholdersAndVanishInput
            placeholders={["Search the News", "World News"]}
            onChange={handleChange}
            onSubmit={() => fetchNews(query)}
          />
        </div>

        <div className="mt-4 ml-2 md:mt-0 md:w-32 sm:w-24 w-[200px] ">
          <div className="relative">
            <select
              className="w-full p-2 text-sm font-medium text-white bg-[#101010] border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none backdrop-blur-md bg-opacity-70 md:w-32 sm:w-24"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="All News" className="bg-[#101010] text-white hover:bg-gray-700">All News</option>
              <option value="Latest News" className="bg-[#101010] text-white hover:bg-gray-700">Latest News</option>
              <option value="India" className="bg-[#101010] text-white hover:bg-gray-700">India</option>
              <option value="Sports" className="bg-[#101010] text-white hover:bg-gray-700">Sports</option>
              <option value="Entertainment" className="bg-[#101010] text-white hover:bg-gray-700">Entertainment</option>
              <option value="Weather" className="bg-[#101010] text-white hover:bg-gray-700">Weather</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {loading && <p className="mt-4 text-lg">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {articles.length > 0 &&
          articles
            .filter(
              (article) =>
                article.title && article.description && article.image_url
            )
            .map((article, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow hover:shadow-lg transition flex flex-col h-full"
              >

                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />

                <div className="flex-grow">
                  <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {truncateText(article.description, 120)}
                  </p>
                </div>

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
      <div className="flex mt-20 mb-10 justify-center ">
        <footer className="text-neutral-400">
          <a href="mailto:soundernarayanasamy3663@gmail.com">soundernarayanasamy3663@gmail.com</a>
        </footer>
      </div>
    </div>
  );
}
