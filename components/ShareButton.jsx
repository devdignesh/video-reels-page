import React, { useState } from "react";
import { PiShareFatLight } from "react-icons/pi";
import { motion } from "framer-motion";

const ShareButton = ({ url }) => {

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: url,
          title: "Check out this video!",
        });
      } 
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="rounded-full flex flex-col items-center gap-1 p-2 cursor-pointer bg-transparent hover:bg-zinc-400/50 duration-300 transition-all"
      >
        <PiShareFatLight className="w-7 h-7 text-white md:text-black" />
      </button>
    </div>
  );
};

export default ShareButton;
