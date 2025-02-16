"use client";
import { useState, useEffect } from "react";
import VideoReel from "@/components/VideoReel";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {videos.map((video) => (
        <div key={video.id} className="snap-center">
          <VideoReel video={video} />
        </div>
      ))}
    </div>
  );
};

export default Home;
