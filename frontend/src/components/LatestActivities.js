import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import api from "../axios"; // Import the axios instance

const LatestActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the activities from the backend
    const fetchActivities = async () => {
      try {
        const response = await api.get("/activities"); // Call the backend to get all activities
        setActivities(response.data); // Set the activities state to the response data
      } catch (err) {
        setError("Failed to load activities"); // Handle error if fetching fails
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchActivities(); // Call the function to fetch the activities
  }, []);

  if (loading) {
    return (
      <div className="w-64 max-h-fit rounded-lg border border-gray-200 bg-white shadow p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 max-h-fit rounded-lg border border-gray-200 bg-white shadow p-4">
        <p>{error}</p>
      </div>
    );
  }

  // Sort activities from newest to oldest based on the createdAt field
  const sortedActivities = activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Get the latest 5 activities from the sorted list
  const latestActivities = sortedActivities.slice(0, 5);

  return (
    <div className="w-64 max-h-fit rounded-lg border border-gray-200 bg-white shadow">
      <div className="py-5 px-4">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Latest Activities
        </h2>

        <div className="space-y-3">
          {latestActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" style={{ color: "#8B1D1D" }} />
              <button
                className="text-[11px] underline text-main hover:underline"
                onClick={() => {
                  // Navigate to the activity page (You can use React Router for this)
                  window.location.href = `/activity/${activity._id}`; // Redirect to the activity details page by activity ID
                }}
              >
                {activity.activityName}
              </button>
            </div>
          ))}

          <div className="pt-2 text-center">
            <button className="text-sm text-main hover:underline underline">
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestActivities;
