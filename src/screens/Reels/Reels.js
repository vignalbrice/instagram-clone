import React from "react";
import "./Reels.css";
import VideoCard from "../../components/VideoCard/VideoCard";
const Reels = () => {
  return (
    <div className="reels">
      <div className="app__top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
          className="app__logo"
        />
        <h1>Reels</h1>
      </div>
      <div className="app__videos">
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
};

export default Reels;
