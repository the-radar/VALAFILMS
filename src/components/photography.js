import React, { useState, useEffect } from "react";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase"; // ensure your firebase config is imported correctly
import Slider from "react-slick"; // reusing the existing slider from your project

// Reuse your existing transition for dialogs
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Define your styles (feel free to adjust these to match your existing design)
const useStyles = makeStyles({
  bg: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  icon: {
    color: "white",
    width: "30px",
    height: "30px",
  },
  poster: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    cursor: "pointer",
  },
  photoContainer: {
    color: "white",
    textAlign: "center",
    margin: "20px 0",
  },
  viewGallery: {
    cursor: "pointer",
    color: "#c1872b",
    marginTop: "10px",
  },
  imgSlide: {
    width: "100%",
    maxHeight: "80vh",
    objectFit: "contain",
  },
});

export default function Photography() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  // State for loaded photography pages
  const [photos, setPhotos] = useState([]);
  // State for controlling the modal dialog and current photo selection
  const [open, setOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  // This state holds the slider settings; reusing the settings from your existing page.
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // initialSlide will be reset to 0 when opening the dialog
    initialSlide: 0,
  });

  // Load photography content from Firebase (from the "photopages" node)
  useEffect(() => {
    const photoRef = firebase.database().ref("photopages");
    photoRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedPhotos = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPhotos(formattedPhotos);
      }
    });
  }, []);

  // When a photography item is clicked, open the modal and set the current photo item.
  const openDialog = (photo) => {
    setCurrentPhoto(photo);
    // Reset the slider to the first image (or change if you wish)
    setSliderSettings({ ...sliderSettings, initialSlide: 0 });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  // Helper: Extract an array of image URLs from a photography item.
  // Your DB structure uses numeric keys for each image, plus a separate "poster" field.
  const getImageArray = (photo) => {
    if (!photo.images) return [];
    return Object.keys(photo.images)
      .filter((key) => key !== "poster" && !isNaN(key))
      .map((key) => photo.images[key].url);
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
      {photos.map((photo) => (
        <div key={photo.id} className={classes.photoContainer}>
          <h2>{photo.TITLE}</h2>
          <p>{photo.CAPTION}</p>
          {/* Use the "poster" image if available; otherwise use the first image */}
          <img
            src={
              photo.images && photo.images.poster
                ? photo.images.poster
                : getImageArray(photo)[0] || ""
            }
            alt={photo.TITLE}
            className={classes.poster}
            onClick={() => openDialog(photo)}
          />
          <p className={classes.viewGallery} onClick={() => openDialog(photo)}>
            View Gallery
          </p>
        </div>
      ))}

      {/* Modal dialog using your existing slider */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        TransitionComponent={Transition}
        PaperProps={{
          style: { backgroundColor: "black" },
        }}
      >
        <div style={{ display: "flex", backgroundColor: "black", padding: "10px" }}>
          <IconButton onClick={closeDialog} className={classes.icon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.bg}>
          {currentPhoto && (
            <Slider {...sliderSettings}>
              {getImageArray(currentPhoto).map((imgUrl, index) => (
                <div key={index}>
                  <img
                    src={imgUrl}
                    alt={`Slide ${index}`}
                    className={classes.imgSlide}
                  />
                </div>
              ))}
            </Slider>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
