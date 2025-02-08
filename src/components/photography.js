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
import Slider from "react-slick";
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';

function SampleNextArrow(props) {
  const { onClick } = props;
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white", zIndex: '10000' }}
      onClick={onClick}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "black",
    minHeight: "100vh",
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
  icon: {
    color: "white",
    width: "30px",
    height: "30px"
  }
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

  const filteredPhotos = photos.filter(
    (photo) => currentCategory === "all" || photo.tag.toLowerCase() === currentCategory.toLowerCase()
  );

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 15000,
    className: 'slides'
  };

  return (
    <div className={classes.root}>
      <h1>Photography</h1>

      <div id="filter" placeholder-text="CATEGORIES">
        <p onClick={() => setCurrentCategory("all")} style={{ color: currentCategory === "all" ? "#c1872b" : "#eeeeee" }}>ALL</p>
        <p onClick={() => setCurrentCategory("nature")} style={{ color: currentCategory === "nature" ? "#c1872b" : "#eeeeee" }}>NATURE</p>
        <p onClick={() => setCurrentCategory("portrait")} style={{ color: currentCategory === "portrait" ? "#c1872b" : "#eeeeee" }}>PORTRAITS</p>
        <p onClick={() => setCurrentCategory("street")} style={{ color: currentCategory === "street" ? "#c1872b" : "#eeeeee" }}>STREET</p>
      </div>

      <Slider {...settings}>
        {filteredPhotos.map((photo) => (
          <div className="flexcol" key={photo.id}>
            <div className="flexunder">
              <div className="content">
                <h2>{photo.TITLE}</h2>
                <br />
                {photo.CAPTION.split("\\n").map((text, index) => (
                  <p key={index}>{text}<br /><br /></p>
                ))}
                <br />
                <div className="thumbnailRow">
                  {photo.images && photo.images.map((imgObj, index) => (
                    <img
                      key={index}
                      src={imgObj.url}
                      alt={`Photo ${index}`}
                      className="thumbnail"
                      onClick={() => {
                        setCurrentImage(imgObj.url);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="poster-container">
                <img className="poster-img" src={photo.poster} alt={photo.TITLE} />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Dialog
        fullScreen={fullScreen}
        open={showModal}
        onClose={() => setShowModal(false)}
        TransitionComponent={Slide}
      >
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