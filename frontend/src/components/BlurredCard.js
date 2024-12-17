import {useState, useEffect,useContext}  from "react";
import { GlobalContext } from "../context/GlobelContext.js";
const BlurredCard = () => {
const [article, setArticle] = useState();
  const { setIsAuthUser, isAuthUser } = useContext(GlobalContext);
  useEffect(() => {
    setIsAuthUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [setIsAuthUser]);

  useEffect(() => {
    const fetchTopArticle = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/articles/top-article");
        if (response.ok) {
          const data = await response.json();
          setArticle(data)
          console.log("Top Article of the Day:", data);
          // Use data to display the article on the frontend
        } else {
          console.log("No featured article found.");
        }
      } catch (error) {
        console.error("Error fetching top article:", error);
      }
    };
    fetchTopArticle();
  }, []);
  


  return (
    <div className="relative w-[100%] max-w-xl h-64 overflow-hidden rounded-lg mx-auto">
      {/* Background Image with Grayscale and Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter grayscale blur-sm"
        style={{
          backgroundImage:  "./avatar.jpeg"//article.image, // Replace with your image URL
        }}
      ></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black/40">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
         eddddddddddddddddd {/*article.title*/}
        </h2>
        <p className="text-sm md:text-base">
          tag line first line in article afteer title
        </p>
        <p className="text-xs md:text-sm mt-2"> ddddddddddddd{/*{article.createdAt }- {isAuthUser.firstname} {isAuthUser.secondname}*/}</p>
      </div>
    </div>
  );
};

export default BlurredCard;
