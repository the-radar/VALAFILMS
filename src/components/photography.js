"use client"

import React, { useState, useEffect } from "react"
import Slide from "@material-ui/core/Slide"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import "react-gallery-carousel/dist/index.css"
import Slider from "react-slick"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import Scrollbutton from "./scrolltobottom"
import firebase from "./firebase"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PhotographyProjects() {
  const [photos, setPhotos] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"))

  const useStyles = makeStyles({
    root: {
      backgroundColor: "black",
      zIndex: 8000,
    },
    bg: {
      backgroundColor: "black",
      zIndex: 8000,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: "white",
      width: "30px",
      height: "30px",
    },
  })

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 15000,
    className: "slides",
  }

  const supportingImagesSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

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

  const handleClickOpen = (item) => {
    setCurrentItem(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
      >
        <div style={{ display: "flex", backgroundColor: "black" }}>
          <IconButton onClick={handleClose} className={classes.icon}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.bg}>
          <div className="slideimg">
            <img
              src={currentItem?.poster || "/placeholder.svg"}
              alt="Full size poster"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Slider {...settings}>
        {photos.map((photo, i) => (
          <div key={photo.id} className="photo-slide" style={{ position: "relative" }}>
            <div
              className="poster-background"
              style={{
                backgroundImage: `url(${photo.poster || "/placeholder.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                filter: "brightness(50%)",
              }}
            />
            <div className="content" style={{ position: "relative", zIndex: 1, padding: "4rem 2rem" }}>
              <h1 className="photo-title" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                {photo.TITLE}
              </h1>
              <p className="photo-caption" style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
                {photo.CAPTION}
              </p>

              <div className="supporting-images" style={{ marginTop: "2rem" }}>
                <Slider {...supportingImagesSettings}>
                  {photo.images.map((imgUrl, index) => (
                    <div className="supporting-image" key={index} style={{ padding: "0 0.5rem" }}>
                      <img
                        src={imgUrl.url || "/placeholder.svg"}
                        alt={`Supporting image ${index + 1}`}
                        style={{ width: "100%", height: "auto", cursor: "pointer" }}
                        onClick={() => handleClickOpen(photo)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Scrollbutton />
    </div>
  )
}

