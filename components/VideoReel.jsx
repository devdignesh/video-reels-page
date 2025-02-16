"use client";
import { useVideo } from "@/provider/VideoContext";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaPlay } from "react-icons/fa";
import { GoArrowUp, GoMute, GoUnmute } from "react-icons/go";
import { PiShareFatLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import LikeButton from "./LikeButton";
import UpvoteButton from "./UpvoteButton";

const VideoReel = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isGloballyMuted, toggleGlobalMute } = useVideo();

  const fallbackVideo = {
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    tags: ["sample", "video", "placeholder"],
    likes: 0,
    shares: 0,
    product: {
      title: "Sample Product",
      description: "This is a placeholder product description. Real product information will be displayed here when available",
      upvotes: 0
    }
  };

  const videoData = video ?? fallbackVideo;

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6,
    });

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  
  return (
    <div className="relative md:max-w-[500px] m-auto  h-[100vh] max-h-[100vh] md:max-h-[91vh] flex items-center justify-center md:first:mt-5">
      <div className="relative w-full h-full  md:rounded-md overflow-hidden  mt-5 mb-10 md:shadow-[0_0_15px_rgba(0,0,0,0.25)]  ">
        <button
          onClick={() => window.history.back()}
          className="absolute left-4 top-5 z-20 md:hidden bg-black/40 rounded-full p-2 cursor-pointer hover:bg-black/70 transition-all"
        >
          <IoIosArrowBack className="w-5 h-5 text-white" />
        </button>

        <video
          ref={videoRef}
          src={videoData.url}
          className="w-full h-full object-cover"
          loop
          muted={isGloballyMuted}
          onClick={togglePlay}
        />

        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-fit h-fit bg-black/50 rounded-full p-6 cursor-pointer hover:bg-black/70 transition-all"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <FaPlay className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={toggleGlobalMute}
          className="absolute right-4 top-5 z-20 bg-black/40 rounded-full p-2 cursor-pointer hover:bg-black/70 transition-all"
        >
          {isGloballyMuted ? (
            <GoMute className="w-5 h-5 text-white" />
          ) : (
            <GoUnmute className="w-5 h-5 text-white" />
          )}
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="space-y-2 mb-3">
            <h3 className="text-white font-semibold text-2xl">
              {videoData.product.title}
            </h3>

            <p className="text-white/90 text-sm">{videoData.product.description}</p>

            <div className="flex flex-wrap gap-2 pt-2 pb-4">
              {videoData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-white bg-zinc-800/40 rounded-full px-3 py-1 text-sm   cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              href={"https://www.toastd.in/"}
              className=" w-full md:w-auto bg-white text-black font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-all"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-4 md:right-[-60px] bottom-32 md:bottom-24 md:top-auto z-20 flex flex-col gap-2 md:gap-3">
        <LikeButton likes={videoData.likes} />
        <button className="rounded-full p-2 cursor-pointer justify-center items-center content-center text-center bg-transparent hover:bg-zinc-400/50">
          <PiShareFatLight className="w-7 h-7 text-white  md:text-black" />
        </button>
        <UpvoteButton upvotes={videoData.product.upvotes} />
      </div>
    </div>
  );
};

export default VideoReel;
