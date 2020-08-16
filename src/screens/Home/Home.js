import React from "react";
import "../../App.css";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { firestore } from "../../API/firebase";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Input,
} from "@material-ui/core";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import InstagramEmbed from "react-instagram-embed";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = ({ user }) => {
  const [posts, setPosts] = React.useState([]);
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
  return (
    <div className="app">
      <Header user={user} />
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
              nbLikes={p.post.nbLikes}
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
};

export default Home;
