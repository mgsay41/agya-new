import { React, useEffect, useState } from "react";

const FeaturedArticles = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const fetchFeaturedArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/FeaturedArticles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Check if data is an array before setting the state
      if (Array.isArray(data)) {
        setFeaturedArticles(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch featured articles:", error.message);
    }
  };

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  // Check if featuredArticles is an array before rendering
  return (
    <div className="w-full px-3 py-8">
      <h1 className="mb-7 text-left text-lg text-black">Featured Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(featuredArticles) &&
          featuredArticles.map((article, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg border border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={article.image} // Use dynamic image
                  alt={article.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="pt-2 px-4 flex-grow flex flex-col justify-between text-center">
                <h2 className="mb-1 text-xs font-bold leading-tight text-gray-900">
                  "{article.title}"
                </h2>
                <p className="text-gray-500 text-xs">{article.author}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
