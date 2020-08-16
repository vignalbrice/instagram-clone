import React from "react";
import { auth } from "firebase";
import "./Authentication.css";
import { Button } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Slide from "@material-ui/core/Slide";

const Authentication = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isSign, setIsSign] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        return createdUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser.user);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };
  const openSigIn = () => {
    setIsSign(!isSign);
    setChecked(!checked);
  };
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__image">
          <img src="./phone.png" />
        </div>
        {isSign ? (
          <Slide direction="down" in={isSign} mountOnEnter unmountOnExit>
            <div className="auth__rightContainer">
              <div className="auth__formSignup">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" />
                <div className="auth__registerSentence">
                  <p>Sign up to see your friends photos and videos.</p>
                </div>
                <div className="auth__fbAuthContained">
                  <Button
                    variant="contained"
                    startIcon={<Facebook />}
                    size="small"
                  >
                    Login with Facebook
                  </Button>
                </div>
                <div className="auth__separator">
                  <div className="separator">OR</div>
                </div>
                <form className="auth__signup">
                  <input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    onClick={signUp}
                    size="small"
                    disabled={
                      username.length > 0 &&
                      email.length > 0 &&
                      password.length > 0
                        ? false
                        : true
                    }
                  >
                    Sign Up
                  </Button>
                </form>
              </div>
              <div className="auth__haveAnAccount">
                <p>
                  Already have an account ?{" "}
                  <Link onClick={() => openSigIn()}>Sign in</Link>
                </p>
              </div>
            </div>
          </Slide>
        ) : (
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <div className="auth__rightContainer">
              <div className="auth__form">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" />
                <form className="auth__signup">
                  <input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={signIn}
                    size="small"
                    disabled={
                      email.length > 0 && password.length > 0 ? false : true
                    }
                  >
                    Sign In
                  </Button>
                </form>
                <div className="auth__separator">
                  <div className="separator">OR</div>
                </div>
                <div className="auth__fbAuth">
                  <Button variant="text" startIcon={<Facebook />}>
                    Login with Facebook
                  </Button>
                </div>
                <div className="auth__forgottenPassword">
                  <Link to="/home">Forgotten password ?</Link>
                </div>
              </div>
              <div className="auth__haveAnAccount">
                <p>
                  Don't have an account ?{" "}
                  <Link onClick={() => openSigIn()}>Sign up</Link>
                </p>
              </div>
            </div>
          </Slide>
        )}
      </div>
    </div>
  );
};

export default Authentication;
