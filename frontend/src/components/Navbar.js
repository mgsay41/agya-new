import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Plus,
  ListFilter,
  Bell,
  FileText,
  Calendar,
  FilePlus,
} from "lucide-react";
import { GlobalContext } from "../context/GlobelContext"; // Adjust import based on your structure

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState("");
  const { setIsAuthUser, isAuthUser } = useContext(GlobalContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsAuthUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [setIsAuthUser]);

  const newPost = async () => {
    try {
      const postBody = {
        userId: isAuthUser.id,
        content: postText,
        authorName: isAuthUser.firstname,
      };

      const response = await fetch(`http://localhost:4000/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new post");
      }

      const data = await response.json();
      console.log("Post created:", data);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {postOpen && (
        <div className="z-[1000] absolute bg-black/40 w-[1340px] h-[110vh] left-0 -top-[4px]">
          <div className="bg-white flex flex-col py-4 px-4 justify-center top-[25%] absolute left-[30%] items-center">
            <div className="relative border-main border p-4">
              <div
                onClick={() => setPostOpen(false)}
                className="my-2 w-fit cursor-pointer text-right float-right bg-main rounded-full py-[4px] px-3 text-white"
              >
                X
              </div>
              <h3 className="text-xl font-medium mt-10 text-center">New Post</h3>
              <textarea
                className="border border-black mt-4 resize-none w-[500px] h-32"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              ></textarea>
              <div className="flex justify-center items-center">
                <button
                  className="block bg-main text-white py-2 px-10 my-4 rounded-xl"
                  onClick={newPost}
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
              {err && <p className="text-red-500">{err}</p>}
            </div>
          </div>
        </div>
      )}
      <header className="w-full py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-main"></div>
              <span className="text-main font-semibold hidden sm:block">
                logo-ipsum
              </span>
            </div>
          </a>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-main placeholder-gray-500"
              />
            </div>
            {/* Menu Button */}
            <button className="p-3 rounded-xl bg-main text-white hover:bg-opacity-90">
              <ListFilter className="w-8 h-5" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 relative">
            {/* New Button */}
            <button
              className="hidden sm:flex items-center px-9 py-[10px] bg-main text-white rounded-xl hover:bg-opacity-90 relative"
              onClick={toggleDropdown}
            >
              <Plus className="w-5 h-5" />
              <span>New</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-14 pb-4 right-0 w-48 bg-main text-white rounded-xl shadow-lg z-50">
                <div className="absolute -top-2 right-24 w-4 h-4 bg-main transform rotate-45"></div>
                <div
                  className="flex items-center cursor-pointer gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                  onClick={() => setPostOpen(true)}
                >
                  <FileText className="w-5 h-5" />
                  <span>New Post</span>
                </div>
                <hr className="border-t border-gray-300 w-11/12 mx-auto" />
                <a
                  href="/new-article"
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>New Article</span>
                </a>
                <hr className="border-t border-gray-300 w-11/12 mx-auto" />
                <a
                  href="/activity/new-activity"
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                >
                  <Calendar className="w-5 h-5" />
                  <span>New Activity</span>
                </a>
              </div>
            )}

            <button className="p-3 rounded-xl bg-main text-white hover:bg-opacity-90">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
