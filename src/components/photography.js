"use client"

import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Slide from "@material-ui/core/Slide"
import { makeStyles } from "@material-ui/core/styles"
import Slider from "react-slick"
import NavigateNextTwoToneIcon from "@material-ui/icons/NavigateNextTwoTone"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function SampleNextArrow(props) {
  const { onClick } = props
  let className = props.type === "next" ? "nextArrow" : "prevArrow"
  className += " arrow"
  const char =
    props.type === "next" ? (
      <NavigateNextTwoToneIcon />
    ) : (
      <NavigateNextTwoToneIcon style={{ transform: "rotate(180deg)" }} />
    )
  return (
    <div className={className} onClick={onClick}>
      {char}
    </div>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <div className="prevArrow arrow" onClick={onClick}>
      <NavigateNextTwoToneIcon style={{ transform: "rotate(180deg)" }} />
    </div>
  )
}

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
    height: "100vh",
    objectFit: "cover",
    borderRadius: "8px",
  },
  content: {
    padding: "10px",
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    background: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "white",
  },
  description: {
    marginTop: "10px",
    color: "white",
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
}))

export default function Photography() {
  const classes = useStyles()
  const [photos, setPhotos] = useState([])
  const [currentCategory, setCurrentCategory] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  useEffect(() => {
    const loadContent = () => {
      const photoRef = firebase.database().ref("photopages")
      photoRef.on("value", (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const formattedPhotos = Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          setPhotos(formattedPhotos)
        }
      })
    }
    loadContent()
  }, [])

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"))

  const filteredPhotos = photos.filter(
    (photo) => currentCategory === "all" || photo.tag.toLowerCase() === currentCategory.toLowerCase(),
  )

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    nextArrow: <SampleNextArrow type="next" />,
    prevArrow: <SamplePrevArrow />,
    className: "slides",
  }

  return (
    <div className={classes.root}>
      <h1>Photography</h1>
      <div className={classes.filter}>
        {["all", "portrait", "landscape", "street"].map((category) => (
          <span
            key={category}
            className={`${classes.filterItem} ${currentCategory === category ? "active" : ""}`}
            onClick={() => setCurrentCategory(category)}
          >
            {category.toUpperCase()}
          </span>
        ))}
      </div>
      <Slider {...settings}>
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className={classes.photoCard}>
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

      {/* Image Modal */}
      <Dialog
        fullScreen={fullScreen}
        open={showModal}
        onClose={() => setShowModal(false)}
        TransitionComponent={Transition}
      >
        <div className={classes.dialogBg}>
          <IconButton onClick={() => setShowModal(false)} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogBg}>
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Selected"
            style={{ maxWidth: "80%", maxHeight: "80vh", borderRadius: "8px" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

