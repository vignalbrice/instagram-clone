import React from "react";
import { auth } from "../../API/firebase";
import { Button, Grid } from "@material-ui/core";

const Header = ({ user, openSigIn, setOpen }) => {
  return (
    <>
      <div className="app__header">
        <Grid container xs={6}>
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt
          />
          {user ? (
            <Button onClick={() => auth.signOut()}>Logout</Button>
          ) : (
            <div className="app__loginContainer">
              <Button onClick={openSigIn}>Sign In</Button>
              <Button onClick={() => setOpen()}>Sign Up</Button>
            </div>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Header;
