import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { motion } from "framer-motion";

const UpvoteButton = ({ upvotes }) => {
  const [isUpvote, setIsUpvote] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes || 0);

  const handleUpvote = () => {
    setIsUpvote(!isUpvote);
    setUpvoteCount((prevCount) => (isUpvote ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleUpvote}
        className="rounded-full flex flex-col items-center gap-1 p-2 cursor-pointer bg-transparent hover:bg-zinc-400/50 duration-300 transition-all"
      >
        <GoArrowUp className="w-7 h-7 text-white  md:text-black" />
      </button>
      <motion.span
        key={upvoteCount}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-white md:text-black"
      >
        {upvoteCount}
      </motion.span>
    </div>
  );
};

export default UpvoteButton;
