import React, { useState } from "react";
import {
  MoreVertical,
  MessageCircle,
  Share2,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";
import SharePostModal from "./SharePostModal";

const SocialCard = ({onClick}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div  className="max-w-xl w-full rounded-3xl overflow-hidden shadow-md bg-SoftMain border border-main/50">
      {/* Header */}
      <div onClick={onClick} className="flex flex-row items-center cursor-pointer p-4 pb-2">
        <div className="flex items-center flex-1">
          <div className="h-12 w-12 mr-3 rounded-full overflow-hidden">
            <img
              src="/avatar.jpeg"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-base">John Snow</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-4">1d· 8:30AM</span>
        </div>
      </div>

      {/* Content */}
      <div onClick={onClick} className=" cursor-pointer px-4 pt-0">
        <p className="text-lg font-semibold mb-2">
          "Major Paleolithic Site Excavated in Central Asia"
        </p>
        <div className="relative w-full rounded-lg overflow-hidden mb-2">
          <img
            src="/Frame20.png"
            alt="Ancient site"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 flex items-center bg-SoftMain border-t border-main/50">
        <div className="flex items-center space-x-3">
          <div className="flex rounded-full border border-gray-200 divide-x bg-[#e0d1cc]">
            <button className="flex items-center space-x-1 px-3 py-1">
              <ArrowBigUp className="w-5 h-5 text-main" />
              <span className="text-sm text-main">Upvote</span>
            </button>
            <button className="px-3 py-1 hover:bg-[#d4c5c0] rounded-r-full">
              <ArrowBigDown className="w-5 h-5 text-main" />
            </button>
          </div>

          <button
            className="p-2 hover:bg-gray-50 rounded-full"
            onClick={handleShareClick}
          >
            <Share2 className="h-5 w-5 text-main" />
          </button>

          <button className="p-2 hover:bg-gray-50 rounded-full">
            <MessageCircle className="h-5 w-5 text-main" />
          </button>
        </div>

        <div className="ml-auto">
          <button className="p-2 hover:bg-gray-50 rounded-full">
            <MoreVertical className="h-5 w-5 text-main" />
          </button>
        </div>
      </div>

      {/* SharePostModal */}
      {isModalOpen && <SharePostModal onClose={handleCloseModal} />}
    </div>
  );
};

export default SocialCard;
