import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchWikipedia = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=10`
      );
      const data = await response.json();
      setResults(data.pages || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 sm:p-8 flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-sm">
          Wikipedia Search Engine
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Instantly search Wikipedia articles
        </p>
      </header>
      <form
        onSubmit={searchWikipedia}
        className="flex justify-center items-center mb-8 w-full"
      >
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Wikipedia..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <button
          type="submit"
          className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      <main className="flex-1 flex flex-col items-center">
        {loading && (
          <div className="flex justify-center items-center h-32">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}
        {!loading && searched && results.length === 0 && (
          <div className="text-gray-500 text-lg mt-8">No results found.</div>
        )}
        <div className="space-y-6 w-full max-w-3xl">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition transform hover:scale-[1.02] hover:shadow-2xl hover:border-blue-200 group"
            >
              <a
                href={`https://en.wikipedia.org/?curid=${result.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-blue-700 group-hover:underline group-hover:text-blue-900 transition"
              >
                {result.title}
              </a>
              <p className="text-gray-700 mt-2 text-base">
                {result.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer className="backdrop-blur-md border-t border-blue-200/40 shadow-inner rounded-t-2xl mt-8 px-4 md:px-12 py-2 flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-0 text-gray-700">
        <div className="text-base md:text-lg font-semibold text-gray-800">
          © 2024 Subhadaya Bhatta. All rights reserved.
        </div>
        <div className="text-sm flex items-center gap-1 text-gray-600">
          Built with <span className="font-bold text-blue-700">ReactJs</span> &{" "}
          <span className="font-bold text-blue-700">Tailwind CSS</span>{" "}
          <span className="hidden md:inline">|</span>{" "}
          <span className="ml-1">
            Built with love <span className="text-pink-500">❤️</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
