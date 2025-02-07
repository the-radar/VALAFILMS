import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Slider from "react-slick";
import "react-gallery-carousel/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function PhotographyGallery() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    const loadContent = () => {
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
    };
    loadContent();
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} onClick={() => { setCurrentPhoto(photo); setOpen(true); }}>
            <img src={photo.imageUrl} alt={photo.title} className="photo-slide" />
          </div>
        ))}
      </Slider>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="photo-dialog"
      >
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {currentPhoto && (
            <img src={currentPhoto.imageUrl} alt={currentPhoto.title} className="full-size-image" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
