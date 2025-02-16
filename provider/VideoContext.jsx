"use client";
import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [isGloballyMuted, setIsGloballyMuted] = useState(true);

  const toggleGlobalMute = () => {
    setIsGloballyMuted(!isGloballyMuted);
  };

  return (
    <VideoContext.Provider value={{ isGloballyMuted, toggleGlobalMute }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}