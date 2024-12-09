import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Activity from "../components/activities";

function Activities({ userId = "67519246c9f4f04ffb6e11e0" }) {
  const [user, setUser] = useState(null); // To store user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const fetchUser = async () => {
    try {
      setLoading(true);  // Set loading to true before the request
      // Debug: log the userId
      const response = await fetch(`http://localhost:5000/api/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json(); // Extract JSON data from response
      setUser(data); // Set the user data
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.message || "An error occurred");
      console.log(err.message);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  useEffect(() => {
    fetchUser(); // Call the function to fetch data on mount
  }, []); // Empty dependency array to avoid rerendering when userId changes

  return (
    <div className="w-full px-36">
      <Navbar />
      <div className="flex flex-row gap-4">
        <Sidebar user={user} /> 
        {loading ? (
          <div>Loading...</div> 
        ) : error ? (
          <div className="text-red-500">{error}</div> 
        ) : (
          <Activity user={user} /> 
        )}
      </div>
    </div>
  );
}

export default Activities;
