import React from "react";
import Navbar from "../components/Navbar";
import Article from "../components/Article";

function ArticleDetails() {
  return (
    <div className="w-full  px-[150px]"> {/* Full-width container */}
        <Navbar />
        <Article />
    </div>
  );
}

export default ArticleDetails;
