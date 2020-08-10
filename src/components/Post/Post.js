import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { firestore, timestamp } from "../../API/firebase";
import { Button } from "@material-ui/core";
import { TrafficRounded } from "@material-ui/icons";
const Post = ({ username, user, imageUrl, caption, postId }) => {
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  React.useEffect(() => {
    let unsuscribe;
    if (postId) {
      unsuscribe = firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((c) => c.data()));
        });
    }
    return () => {
      unsuscribe();
    };
  }, [postId]);
  const postComment = (e) => {
    e.preventDefault();
    firestore.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: timestamp,
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="bvignal"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post__comments">
        {comments.map((c) => {
          return (
            <p>
              <b>{c.username}</b> {c.text}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post__form">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post__button"
            type="submit"
            onClick={postComment}
            disabled={comment.length > 0 ? false : true}
          >
            Publish
          </Button>
        </form>
      )}
    </div>
  );
};

export default Post;
