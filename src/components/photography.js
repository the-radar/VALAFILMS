import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  filterItem: {
    cursor: "pointer",
    color: "#eeeeee",
    "&.active": {
      color: "#c1872b",
    },
  },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  photoCard: {
    width: "200px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  photoThumbnail: {
    width: "100%",
    borderRadius: "8px",
  },
  dialogBg: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    color: "white",
    position: "absolute",
    top: 10,
    right: 10,
  },
}));

export default function Photography() {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const loadContent = () => {
      const photoRef = firebase.database().ref("photopages");
      photoRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedPhotos = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          setPhotos(formattedPhotos);
        }
      });
    };
    loadContent();
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <div className={classes.root}>
      <h1>Photography</h1>
      
      <div className={classes.filter}>
        {["all", "product", "food", "portraits", "tinyduru"].map((category) => (
          <p
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`${classes.filterItem} ${currentCategory === category ? "active" : ""}`}
          >
            {category.toUpperCase()}
          </p>
        ))}
      </div>

      <div className={classes.gallery}>
        {photos.map((photo) => (
          (photo.category === currentCategory || currentCategory === "all") && (
            photo.images && photo.images.map((imgObj, index) => (
              <div key={index} className={classes.photoCard} onClick={() => { setCurrentImage(imgObj.url); setShowModal(true); }}>
                <img src={imgObj.url} alt={`Photo ${index}`} className={classes.photoThumbnail} />
              </div>
            ))
          )
        ))}
      </div>

      {/* Image Modal */}
      <Dialog fullScreen={fullScreen} open={showModal} onClose={() => setShowModal(false)} TransitionComponent={Slide}>
        <div className={classes.dialogBg}>
          <IconButton onClick={() => setShowModal(false)} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogBg}>
          <img src={currentImage} alt="Selected" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
