import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import { firestore } from "./API/firebase";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Input,
} from "@material-ui/core";
import { auth } from "firebase";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import InstagramEmbed from "react-instagram-embed";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [isSign, setIsSign] = React.useState(false);
  React.useEffect(() => {
    const unsuscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in ..
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out..
        setUser(null);
      }
    });
    return () => {
      //perform cleanup action with authentication
      unsuscribe();
    };
  }, [user, username]);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((p) => ({
            id: p.id,
            post: p.data(),
          }))
        );
      });
  }, []);
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
    setOpen(!open);
  };
  const openSigIn = () => {
    setIsSign(true);
    setOpen(true);
  };
  return (
    <div className="app">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="app__modal">
          <DialogContentText id="alert-dialog-slide-description">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt
              />
              {isSign ? (
                <form className="app__signup">
                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signIn}>
                    Sign In
                  </Button>
                </form>
              ) : (
                <form className="app__signup">
                  <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signUp}>
                    Sign Up
                  </Button>
                </form>
              )}
            </center>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Header user={user} setOpen={() => setOpen(true)} openSigIn={openSigIn} />
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map((p) => (
            <Post
              key={p.id}
              postId={p.id}
              user={user}
              imageUrl={p.post.imageUrl}
              username={p.post.username}
              caption={p.post.caption}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
      {user && user.displayName && <ImageUpload username={user.displayName} />}
    </div>
  );
}

export default App;
