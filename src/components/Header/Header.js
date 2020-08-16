import React from "react";
import { auth } from "../../API/firebase";
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Input,
  OutlinedInput,
} from "@material-ui/core";
import {
  SearchOutlined,
  CloseOutlined,
  HomeOutlined,
  Home,
  NearMe,
  Favorite,
  Explore,
  ExploreOutlined,
  FavoriteOutlined,
  NearMeOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

const Header = ({ user, openSigIn, setOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      window.location.pathname = "/";
    });
  };
  return (
    <>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt
        />
        <div className="app__headerInput">
          <input
            placeholder="Search"
            className="app_headerInput"
            inputMode="text"
          />
        </div>
        <div className="app__headerRight">
          {window.location.pathname === "/home" ? (
            <IconButton onClick={() => (window.location.pathname = "/home")}>
              <Home />
            </IconButton>
          ) : (
            <IconButton onClick={() => (window.location.pathname = "/home")}>
              <HomeOutlined />
            </IconButton>
          )}
          {window.location.pathname === "/messages" ? (
            <IconButton
              onClick={() => (window.location.pathname = "/messages")}
            >
              <NearMe />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => (window.location.pathname = "/messages")}
            >
              <NearMeOutlined />
            </IconButton>
          )}
          {window.location.pathname === "/explorer" ? (
            <IconButton
              onClick={() => (window.location.pathname = "/explorer")}
            >
              <Explore />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => (window.location.pathname = "/explorer")}
            >
              <ExploreOutlined />
            </IconButton>
          )}
          <IconButton>
            <FavoriteBorderOutlined />
          </IconButton>
          <IconButton onClick={handleClick}>
            <Avatar
              className="post__avatar"
              alt="bvignal"
              src="/static/images/avatar/1.jpg"
            />
          </IconButton>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Header;
