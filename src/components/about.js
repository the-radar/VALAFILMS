"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import InfiniteScroll from "react-infinite-scroll-component"
import firebase from "./firebase"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"

export default function About() {
  const [items, setItems] = useState()
  const [hasMore, setHasMore] = useState(true)
  const [myArray, setMyArray] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const fetchMoreData = () => {
    if (myArray.length === 0) {
      setHasMore(false)
      return
    }
    // Implement your pagination logic here
  }

  const convert = (it) => {
    const arrayResult = Object.keys(it).map((room) => ({
      id: room,
      ...it[room],
    }))
    setMyArray(arrayResult)
  }

  const loadContent = () => {
    const todoRef = firebase.database().ref("/teammembers")
    todoRef.on("value", (snapshot) => {
      setItems(snapshot.val())
      convert(snapshot.val())
    })
  }

  useEffect(() => {
    loadContent()
  }, [firebase]) // Added firebase as a dependency

  const handleOpen = (member) => {
    setSelectedMember(member)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="teampage">
      <div className="teamtext">
        <h1>OUR TEAM</h1>
        <br />
        <p>
          Here at ValaFilms, our people are our greatest asset. Collaboration is a big part of our culture and we have a
          team of young, talented and passionate creatives who bring fresh perspectives and infectious energy to
          actualize impactful projects. Our emphasis on teamwork and embracing diversity of opinions and voices,
          encouraging independent thinking and innovation, gives us the platform to grow as story tellers. We align
          expertise and experience with knowledge, empower creative talent and strive to approach our work in a fun and
          stimulating manner. Our goal is to develop stories that push boundaries, entertain and create lasting social
          and cultural impact. We believe that together we can shape and define the future of media in Africa.
        </p>
      </div>
      <div className="teammembers">
        <InfiniteScroll
          dataLength={myArray.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={"80vh"}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
        >
          {myArray.map((member, index) => (
            <motion.div
              key={member.id}
              className="teamcontent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpen(member)}
            >
              <img src={member.imageUrl || "/placeholder.svg"} alt={member.name} width="300" height="420" />
              <h4>{`${member.name} : ${member.role}`}</h4>
              <div className="ics">
                <div className="lk">
                  {member.fb && (
                    <a href={member.fb} target="_blank" rel="noopener noreferrer" className="fa fa-facebook"></a>
                  )}
                  {member.tw && (
                    <a href={member.tw} target="_blank" rel="noopener noreferrer" className="fa fa-twitter"></a>
                  )}
                  {member.ggl && (
                    <a href={member.ggl} target="_blank" rel="noopener noreferrer" className="fa fa-google"></a>
                  )}
                  {member.ytb && (
                    <a href={member.ytb} target="_blank" rel="noopener noreferrer" className="fa fa-youtube"></a>
                  )}
                  {member.ig && (
                    <a href={member.ig} target="_blank" rel="noopener noreferrer" className="fa fa-instagram"></a>
                  )}
                  {member.ln && (
                    <a href={member.ln} target="_blank" rel="noopener noreferrer" className="fa fa-linkedin"></a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </InfiniteScroll>
      </div>
      <AnimatePresence>
        {open && selectedMember && (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            PaperComponent={motion.div}
            PaperProps={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 50 },
              transition: { duration: 0.3 },
            }}
          >
            <DialogContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="member-details"
              >
                <motion.img
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  width="300"
                  height="420"
                  layoutId={`member-image-${selectedMember.id}`}
                />
                <h2>{selectedMember.name}</h2>
                <h3>{selectedMember.role}</h3>
                <p>{selectedMember.about}</p>
              </motion.div>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

