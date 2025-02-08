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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    padding: "20px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40px",
    },
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
  photoCard: {
    padding: "10px",
    textAlign: "left",
  },
  poster: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  content: {
    padding: "10px",
  },
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  description: {
    marginTop: "10px",
  },
  thumbnailRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  thumbnail: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
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
  sliderContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  slide: {
    minWidth: "100%",
    transition: "transform 0.5s ease-in-out",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#c1872b",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  prevButton: {
    left: "10px",
  },
  nextButton: {
    right: "10px",
  },
}));

export default function Photography() {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const filteredPhotos = photos.filter(
    (photo) => currentCategory === "all" || photo.tag.toLowerCase() === currentCategory.toLowerCase()
  );

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className={classes.root}>
      <h1>Photography</h1>
   

      <div className={classes.sliderContainer}>
        {filteredPhotos.map((photo, index) => (
          <Slide
            key={photo.id}
            direction="left"
            in={index === currentSlide}
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <div className={classes.slide}>
              <div className={classes.photoCard}>
                <img src={photo.poster} alt={photo.TITLE} className={classes.poster} />
                <div className={classes.content}>
                  <h2 className={classes.title}>{photo.TITLE}</h2>
                  <p className={classes.description}>{photo.CAPTION}</p>
                  <div className={classes.thumbnailRow}>
                    {photo.images && photo.images.map((imgObj, index) => (
                      <img
                        key={index}
                        src={imgObj.url}
                        alt={`Photo ${index}`}
                        className={classes.thumbnail}
                        onClick={() => { setCurrentImage(imgObj.url); setShowModal(true); }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        ))}
        <Button className={`${classes.navButton} ${classes.prevButton}`} onClick={handlePrev}>
          Prev
        </Button>
        <Button className={`${classes.navButton} ${classes.nextButton}`} onClick={handleNext}>
          Next
        </Button>
      </div>

      {/* Image Modal */}
      <Dialog fullScreen={fullScreen} open={showModal} onClose={() => setShowModal(false)} TransitionComponent={Slide}>
        <div className={classes.dialogBg}>
          <IconButton onClick={() => setShowModal(false)} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogBg}>
          <img src={currentImage} alt="Selected" style={{ maxWidth: "80%", borderRadius: "8px" }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}