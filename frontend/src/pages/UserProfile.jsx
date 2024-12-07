import React from "react";
import {
  Edit3,
  ChevronLeft,
  ChevronRight,
  Users,
  Tickets,
  FileX2,
  Clock2,
  Globe,
} from "lucide-react";
import SocialCard from "../components/SocialCard";
import { Link ,useNavigate } from "react-router-dom";


const UserProfile = () => {
  const navigate = useNavigate();
  // Example activities data with isFree and appliedNumber
  const activities = [
    {
      image: "https://via.placeholder.com/150",
      title: "Patterns in History, The Annual Conference 2025",
      date: "Mon, Dec 2 | 8:00 AM",
      location: "The Getty Conservation Institute",
      LocationDetails: "(Los Angeles, USA)",
      status: "Rejected by Admin",
      isFree: true, // Added "isFree" field
      appliedNumber: 30, // Added "appliedNumber" field
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Rural History 2025",
      date: "Mon, Dec 2 | 8:00 AM",
      location: "The Getty Conservation Institute",
      LocationDetails: "(Los Angeles, USA)",
      status: "Passed",
      isFree: false, // Added "isFree" field
      appliedNumber: 50, // Added "appliedNumber" field
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Cultural Heritage Insights",
      date: "Mon, Dec 2 | 10:00 AM",
      location: "The Getty Conservation Institute",
      LocationDetails: "(Los Angeles, USA)",
      status: null,
      isFree: true, // Added "isFree" field
      appliedNumber: 20, // Added "appliedNumber" field
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-3xl text-gray-500">S</span>
          </div>
          <button className="absolute top-0 right-0 w-6 h-6 bg-main text-white rounded-full flex items-center justify-center">
            <Link to={"/edit-profile"} ><Edit3 size={14}  /></Link>
          </button>
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-lg font-semibold">Salma Nofal</h2>
          <p className="text-sm text-gray-600 max-w-[250px]">
            UI/UX Designer | CS Graduate | Archaeology Enthusiast
          </p>
        </div>
      </div>

      {/* Section Title with Navigation Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Shared Activities</h3>
        <div className="flex gap-4">
          <button className="bg-SoftMain text-white p-2 rounded-full">
            <ChevronLeft />
          </button>
          <button className="bg-main text-white p-2 rounded-full">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Scrollable Activity Cards */}
      <div className="relative">
        {/* Cards Container */}
        <div className="flex cursor-pointer gap-4 overflow-x-auto p-4 w-full">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="w-64 bg-white border rounded-xl overflow-hidden shadow-md"
              onClick={ ()=> navigate(`/activity/${activity.title}`)}
            >
              {/* Background Image */}
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-40 object-cover"
                />
                {/* Status Label */}
                {activity.status && (
                  <div
                    className={` absolute top-12 ${activity.status === "Rejected by Admin" ?  "left-4": " left-14"} p-4 text-sm flex justify-center items-center gap-2 font-medium text-white rounded-lg bg-white`}
                  >
                    {activity.status === "Rejected by Admin" ? (
                      <FileX2 className="w-5 h-5 text-red-600" />
                    ) : (
                      <Clock2 className="w-5 h-5 text-green-600" />
                    )}
                    <span
                      className={
                        activity.status === "Rejected by Admin"
                          ? "text-red-600 font-bold"
                          : "text-green-600 font-bold"
                      }
                    >
                      {activity.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-base font-bold mb-1">{activity.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{activity.date}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {activity.location}
                </p>

                {/* Free/Not Free and Applied Number */}
                <div className="mt-3 text-sm text-gray-600 flex flex-col gap-2 ">
                  <div className="flex gap-2 items-center">
                    <Globe className="w-4 h-4 text-main" />
                    <span>{activity.LocationDetails}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Tickets className="w-4 h-4 text-main" />
                    <span>{activity.isFree ? "Free" : "Paid"}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Users className="w-4 h-4 text-main" />
                    <span>{activity.appliedNumber} Applied</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Your Activities</h3>
      <div className="flex justify-center items-center">
        <SocialCard />
      </div>
    </div>
  );
};

export default UserProfile;
