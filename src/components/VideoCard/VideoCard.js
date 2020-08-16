import React from "react";
import "./VideoCard.css";
import VideoHeader from "../VideoHeader/VideoHeader";
import VideoFooter from "../VideoFooter/VideoFooter";
const VideoCard = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className="videoCard">
      <VideoHeader />
      <video
        ref={videoRef}
        onClick={onVideoPress}
        src="https://www.youtube.com/watch?v=e6ny0x77l3s"
        alt="IG reel video"
        loop
        className="videoCard__player"
        crossOriginLoading
        crossOrigin="true"
      />
      <VideoFooter />
    </div>
  );
};

export default VideoCard;
