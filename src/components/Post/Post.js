import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { firestore, timestamp } from "../../API/firebase";
import { Button, IconButton } from "@material-ui/core";
import {
  TrafficRounded,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  NearMeOutlined,
  Favorite,
} from "@material-ui/icons";
const Post = ({ username, user, imageUrl, caption, postId, nbLikes }) => {
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [usersPosts, setUsersPosts] = React.useState([]);
  const [nbLikesNumber, setNbLikesNumber] = React.useState(1);
  const [isLiked, setIsLiked] = React.useState(false);
  const commentRef = React.useRef(null);
  React.useEffect(() => {
    let unsuscribe;
    let unsuscribePosts;
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
    unsuscribePosts = firestore
      .collection("users")
      .doc(user.uid)
      .onSnapshot((querySnapshot) => {
        setUsersPosts(querySnapshot.data().posts);
      });
    return () => {
      unsuscribe();
      unsuscribePosts();
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
  const onToggleCommentRef = () => {
    commentRef.current.focus();
  };
  const onToggleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked === true) {
      if (nbLikes === undefined) {
        firestore
          .collection("posts")
          .doc(postId)
          .update({
            nbLikes: 0 + 1,
          });
      } else {
        firestore
          .collection("posts")
          .doc(postId)
          .update({
            nbLikes: nbLikes - 1,
          });
      }
    } else if (isLiked === false) {
      firestore
        .collection("posts")
        .doc(postId)
        .update({
          nbLikes: nbLikes + 1,
        });
    }
  };
  console.log(nbLikes);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="bvignal"
          src="/static/images/avatar/1.jpg"
        />
        <p>{username}</p>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <div className="post__iconsItems">
        {isLiked ? (
          <IconButton onClick={onToggleLike} className="post__like">
            <Favorite />
          </IconButton>
        ) : (
          <IconButton onClick={onToggleLike}>
            <FavoriteBorderOutlined />
          </IconButton>
        )}
        <IconButton onClick={onToggleCommentRef}>
          <ChatBubbleOutlineOutlined />
        </IconButton>
        <IconButton>
          <NearMeOutlined />
        </IconButton>
      </div>
      {nbLikes > 0 && <div className="post__likes">{nbLikes} likes</div>}
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
            ref={commentRef}
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
