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
import Rodal from "rodal"
import firebase from "./firebase"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PhotographyProjects() {
  const [photos, setPhotos] = useState([])
  const [showModal, setModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentTag, setCurrentTag] = useState("all")
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState("")
  const [thumbLink, setThumbLink] = useState("")

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

  const settings3 = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
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

      const settingsRef = firebase.database().ref("vala/settings/photography")
      settingsRef.on("value", (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setLink(data.landingvideo)
          setThumbLink(data.thumb)
        }
      })
    }
    loadContent()
  }, [])

  const onLoadedData = () => {
    setIsVideoLoaded(true)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

  return (
    <div>
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
            <Slider {...settings3}>
              {currentItem &&
                currentItem.images.map((imgUrl, index) => (
                  <div key={index}>
                    <img
                      src={imgUrl.url || "/placeholder.svg"}
                      alt={`Supporting image ${index + 1}`}
                      className="imgslide"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </DialogContent>
      </Dialog>

      <div className="vidcon">
        <img
          src={thumbLink || "/placeholder.svg"}
          className="video-thumb tiny"
          alt="thumb"
          style={{ display: isVideoLoaded ? "none" : "block" }}
        />
        <video autoPlay muted loop id="myVideo" style={{ opacity: isVideoLoaded ? 1 : 0 }} onLoadedData={onLoadedData}>
          <source src={link} type="video/mp4" />
        </video>
        <div className="vidwriteup">
          <h1 className="slideup">PHOTOGRAPHY</h1>
          <br />
          <h4
            className="baulf2 mdf"
            onClick={() => {
              window.open("https://your-photography-portfolio-url.com", "_blank")
            }}
          >
            VIEW PORTFOLIO
          </h4>
        </div>
      </div>

      <div id="filter" placeholder-text="CATEGORIES">
        <p
          onClick={() => {
            setCurrentTag("all")
          }}
          style={{ color: currentTag == "all" ? "#c1872b" : "#eeeeee" }}
        >
          ALL
        </p>
        <p
          onClick={() => {
            setCurrentTag("portrait")
          }}
          style={{ color: currentTag == "portrait" ? "#c1872b" : "#eeeeee" }}
        >
          PORTRAIT
        </p>
        <p
          onClick={() => {
            setCurrentTag("landscape")
          }}
          style={{ color: currentTag == "landscape" ? "#c1872b" : "#eeeeee" }}
        >
          LANDSCAPE
        </p>
        <p
          onClick={() => {
            setCurrentTag("event")
          }}
          style={{ color: currentTag == "event" ? "#c1872b" : "#eeeeee" }}
        >
          EVENT
        </p>
      </div>

      <Slider {...settings}>
        {photos.map(
          (photo, i) =>
            (photo.tag == currentTag || currentTag == "all") && (
              <div className="flexcol" key={photo.id}>
                <div className="flexunder">
                  <div className="content">
                    <h2>{photo.TITLE}</h2>
                    <br />
                    {photo.CAPTION.split("\\n").map((text, index) => (
                      <p key={index}>
                        {text}
                        <br />
                        <br />
                      </p>
                    ))}
                    <br />
                    <h1
                      className="baulf2"
                      style={{ width: "fit-content" }}
                      onClick={() => {
                        setModal(true)
                        setCurrentItem(photo)
                      }}
                    >
                      View Gallery
                    </h1>
                    <br />
                    <div className="">
                      <Slider {...settings3}>
                        {photo.images.map((imgUrl, index) => (
                          <div className="newimage" key={index}>
                            <img
                              src={imgUrl.url || "/placeholder.svg"}
                              className=""
                              alt={`Gallery image ${index + 1}`}
                              onClick={() => {
                                setCurrentItem(photo)
                                handleClickOpen()
                              }}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div className="poster-container">
                    <img
                      className="poster-img"
                      src={photo.poster || "/placeholder.svg"}
                      alt={`${photo.TITLE} poster`}
                    />
                  </div>
                </div>
                <br />
                <br />
              </div>
            ),
        )}
      </Slider>

      <Rodal
        customMaskStyles={{ backgroundColor: "black" }}
        customStyles={{ backgroundColor: "black", padding: "0", zIndex: "6000" }}
        visible={showModal}
        width={1000}
        height={1000}
        enterAnimation="rotate"
        showMask={true}
        onClose={() => {
          setModal(false)
        }}
      >
        {currentItem && (
          <Slider {...settings3}>
            {currentItem.images.map((imgUrl, index) => (
              <div key={index}>
                <img
                  src={imgUrl.url || "/placeholder.svg"}
                  alt={`Full size image ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </Slider>
        )}
      </Rodal>

      <Scrollbutton />
    </div>
  )
}

