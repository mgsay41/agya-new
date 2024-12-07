import React from "react";
import FeaturedArticles from "../components/FeaturedArticles";
import SocialCard from "../components/SocialCard";
import BlurredCard from "../components/BlurredCard";
import LatestActivities from "../components/LatestActivities";
import { Link ,useNavigate } from "react-router-dom";

function Home() {
  const socialCards = [1, 2, 3, 4, 5, 6, 7]; // Example array, you can replace it with real data
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="w-fit">
        <BlurredCard />
        <FeaturedArticles />
          <h1 className="mb-7 text-left text-lg text-black ml-4">News Feed</h1>
        <div className="w-[100%] flex justify-center items-center flex-col">

          {/* Mapping through SocialCards and displaying them stacked */}
          <div className="space-y-6 flex flex-col justify-center items-center">
            {" "}
            {/* Adds space between each card */}
            {socialCards.map((card, index) => (
              <SocialCard key={index} onClick={()=> navigate(`/article/:name`) }  /> // Replace with actual data if necessary
            ))}
          </div>
        </div>
      </div>
      <LatestActivities/>
    </div>
  );
}

export default Home;
