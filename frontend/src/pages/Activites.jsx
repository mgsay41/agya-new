import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Activity from "../components/activities";

function Activities() {
  
  const [user, setUser] = useState(null); // To store user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state


  return (
    <div className="w-full px-36">
      <Navbar />
        <Sidebar  /> 
          <Activity/> 
    </div>
  );
}

export default Activities;
