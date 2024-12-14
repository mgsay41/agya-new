import {React,useState,useEffect} from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestActivities = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    fetchActivities();
  }, []);
  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/activities/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setActivities(data); // Assuming the response contains a list of activities
    } catch (error) {
      console.error("Failed to fetch activities:", error.message);
    }
  };
  

  return (
    <div className="w-64 max-h-fit rounded-lg border border-gray-200 bg-white shadow">
      <div className="py-5 px-4">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Latest Activities
        </h2>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" style={{ color: "#8B1D1D" }} />
              <button
                className="text-[11px] underline text-main hover:underline"
                onClick={() => {
                  navigate(`/activity/${activity.activityName}`)
                }}
              >
                {activity.activityName}
              </button>
            </div>
          ))}

          <div className="pt-2 text-center">
            <button 
            className="text-sm text-main hover:underline underline"
            onClick={()=>navigate(`/activities`) }
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestActivities;
