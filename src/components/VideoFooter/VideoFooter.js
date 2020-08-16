import React from "react";
import "./VideoFooter.css";
import { Avatar, Button } from "@material-ui/core";
import { MusicNote } from "@material-ui/icons";
import Ticker from "react-ticker";
const VideoFooter = ({ channel, song, likes, shares, avatarSrc }) => {
  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <Avatar src={avatarSrc} />
      </div>
      <h3>
        {channel} * <Button>Follow</Button>
      </h3>
      <div className="videoFooter__ticker">
        <MusicNote className="videoFooter__icon" />
        <Ticker mode="smooth">
          {({ index }) => (
            <>
              <h1>{song}</h1>
            </>
          )}
        </Ticker>
        <div className="videoFooter__actions">
          <div className="videoFooter__actionsLeft"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoFooter;
