"use client";
import { useState, useEffect } from "react";
import VideoReel from "@/components/VideoReel";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/videos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading videos...</div>;
  }

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
