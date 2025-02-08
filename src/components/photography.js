import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Slider from "react-slick";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  sliderContainer: {
    width: "100%",
    height: "auto",
  },
  slide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "500px",
    padding: theme.spacing(2),
  },
  poster: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
    marginRight: theme.spacing(2),
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: theme.spacing(1),
  },
  description: {
    fontSize: "1rem",
    marginBottom: theme.spacing(2),
  },
  thumbnailRow: {
    display: "flex",
    flexWrap: "wrap",
  },
  thumbnail: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    cursor: "pointer",
    borderRadius: "8px",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  prevButton: {
    left: theme.spacing(2),
  },
  nextButton: {
    right: theme.spacing(2),
  },
  dialogBg: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: theme.spacing(2),
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "white",
  },
}))

export default function Photography() {
  const classes = useStyles()
  const [photos, setPhotos] = useState([])
  const [currentCategory, setCurrentCategory] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

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

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"))

  const filteredPhotos = photos.filter(
    (photo) => currentCategory === "all" || photo.tag.toLowerCase() === currentCategory.toLowerCase(),
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: (
      <Button className={`${classes.navButton} ${classes.prevButton}`}>
        <NavigateBeforeTwoToneIcon />
      </Button>
    ),
    nextArrow: (
      <Button className={`${classes.navButton} ${classes.nextButton}`}>
        <NavigateNextTwoToneIcon />
      </Button>
    ),
  }

  return (
    <div className={classes.root}>
      <h1>Photography</h1>
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className={classes.slide}>
              <img src={photo.poster || "/placeholder.svg"} alt={photo.TITLE} className={classes.poster} />
              <div className={classes.content}>
                <h2 className={classes.title}>{photo.TITLE}</h2>
                <p className={classes.description}>{photo.CAPTION}</p>
                <div className={classes.thumbnailRow}>
                  {photo.images &&
                    photo.images.map((imgObj, index) => (
                      <img
                        key={index}
                        src={imgObj.url || "/placeholder.svg"}
                        alt={`Photo ${index}`}
                        className={classes.thumbnail}
                        onClick={() => {
                          setCurrentImage(imgObj.url)
                          setShowModal(true)
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Image Modal */}
      <Dialog fullScreen={fullScreen} open={showModal} onClose={() => setShowModal(false)} TransitionComponent={Slide}>
        <div className={classes.dialogBg}>
          <IconButton onClick={() => setShowModal(false)} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogBg}>
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Selected"
            style={{ maxWidth: "80%", borderRadius: "8px" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
