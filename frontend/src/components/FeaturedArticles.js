import React from "react";

const FeaturedArticles = () => {
  const articles = [
    {
      title: "Tracking Humans' First Footsteps in North America",
      author: "Ahmed Sayed",
      image: "article.png",
    },
    {
      title: "Site Linked to King Arthur Older Than Previously Known",
      author: "Mohamed Anwar",
      image: "article.png",
    },
    {
      title: "Middle Kingdom Tomb Discovered in Necropolis at Thebes",
      author: "Salma Nofal",
      image: "article.png",
    },
  ];

  return (
    <div className=" w-full  px-3 py-8">
      <h1 className="mb-7 text-left text-lg text-black">Featured Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-lg border border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col"
          >
            <div className="overflow-hidden">
              <img
                src={article.image}
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
