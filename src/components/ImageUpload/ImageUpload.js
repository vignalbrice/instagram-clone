import React from "react";
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  Input,
  IconButton,
  TextField,
} from "@material-ui/core";
import { storage, firestore, timestamp } from "../../API/firebase";
import { CameraAltRounded, ImageOutlined } from "@material-ui/icons";
import "./ImageUpload.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ImageUpload = ({ username }) => {
  const [caption, setCaption] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [value, setValue] = React.useState("Pictures");
  const [openImageUpload, setImageUpload] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState("");
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firestore.collection("posts").add({
              timestamp: timestamp,
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setImageUpload(false);
            setProgress(0);
            setCaption("");
            setImage(null);
            setImagePreview("");
          });
      }
    );
  };
  return (
    <>
      <BottomNavigation
        value={value}
        showLabels
        className="imageUpload__bottomNav"
      >
        <BottomNavigationAction
          label="Pictures"
          icon={<CameraAltRounded />}
          onClick={() => setImageUpload(true)}
        />
      </BottomNavigation>

      <Dialog
        open={openImageUpload}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth={imagePreview.length > 0 ? "md" : "xs"}
        onClose={() => setImageUpload(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="app__modal"
          >
            <img
              className="imageUpload__header"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt
            />
            <TextField
              type="text"
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              fullWidth
              variant="outlined"
            />
            <input type="file" onChange={handleChange} id="imageUpload" />
            {imagePreview.length > 0 ? (
              <div className="imageUpload__boxImagePreview">
                <img
                  src={imagePreview}
                  alt={imagePreview}
                  className="imageUpload__imagePreview"
                />
              </div>
            ) : (
              <IconButton>
                <label htmlFor="imageUpload">
                  <ImageOutlined />
                </label>
              </IconButton>
            )}
            <Button
              onClick={handleUpload}
              disabled={
                imagePreview.length > 0 && caption.length ? false : true
              }
            >
              Save
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUpload;
