import React, { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const LikeButton = ({ likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        onClick={handleLike}
        className="rounded-full flex flex-col items-center gap-1 p-2 cursor-pointer bg-transparent hover:bg-zinc-400/50 duration-300 transition-all"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: isLiked ? [1, 1.2, 1] : 1,
            transition: { duration: 0.35 },
          }}
        >
          {isLiked ? (
            <IoHeartSharp className={`w-7 h-7 md:text-black fill-red-500`} />
          ) : (
            <IoHeartOutline className={`w-7 h-7 md:text-black text-white`} />
          )}
        </motion.div>
      </motion.button>
      <motion.span
        key={likeCount}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-white md:text-black"
      >
        {likeCount}
      </motion.span>
    </div>
  );
};

export default LikeButton;
