import { React, useState, useEffect } from 'react'
import Slider from "react-slick";
import logovid from "../files/logo2.mp4"
import firebase from "./firebase"
import YouTube from 'react-youtube';
import Scrollbutton from "./scrolltobottom"
import VideoThumbnail from 'react-video-thumbnail';
import Logo from '../files/Logo_Low.png';

export default function Homepage({ vid ,joinusprop }) {
  const settings = {

    infinite: true,
    autoPlaySpeed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide:true



  }
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.mute();
    event.target.playVideo();
  }

  const _onEnd = (event) => {
    event.target.playVideo();
  }
  const videoOptions = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0
    }
  };
  const [link, setlink] = useState()
  const [thumblink,setthumblink] = useState()
  
  const loadContent = () => {
    const todoRef = firebase.database().ref();
    todoRef.on('value', (snapshot) => {
     
      setlink(snapshot.val().vala.settings.homepage.landingvideo)
      setthumblink(snapshot.val().vala.settings.homepage.thumb)
      console.log(link)

    });
  }

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await loadContent();
    }
    // Execute the created function directly
    anyNameFunction();
    console.log("")

  }, [link]);
  return (
    <div>{!!link ?

      <div style={{ paddingBottom: "120px" }}>
        <div className="vidcon ">
        <img
        src={thumblink}
        className="video-thumb tiny"
        alt="thumb"
        style={{ opacity: isVideoLoaded ? 0 : 1 }}
      />      
          <img className="middle" width="200px" src={Logo} />
          <div className="">

            <div className="" id="myVideo">
              <video autoPlay muted playsInline loop id="myVideo" style={{ opacity: isVideoLoaded ? 1 : 0, filter:"saturate(75%)" }} onLoadedData={onLoadedData}>
                <source src={`${link}`} type="video/mp4" />
              </video>
            </div>
          </div>


        </div> <br />
        <br />


        <Slider {...settings}>
        <div className="slidecontent">
            <div className="wrapper">
                <h2>Who We Are</h2>

                <p className="hometext"><font color = "#c1872b" style={{cursor:"pointer"}} onClick={()=>{joinusprop()}}>We</font> are a group of creatives just like you, seeking to create opportunities for
                for talented individuals who want to make a way for themselves in the film industry.</p>
                    </div>
          </div>
          <div className="slidecontent">
            <div className="wrapper">
              <h2>VALA FILMS</h2>
              <p className="hometext">In the ancient Persian Language of Farsi, <font color = "#c1872b">VALA</font> means “supreme”, 
              and we believe that there is no better reflection of what we at Vala Films represent!</p>

              <p className="hometext">We aim to go above and beyond each time, exceeding the expectation in whatever we produce, 
              taking your vision and our standards to new heights. Our goal is to be "Supreme" in every way!</p>
            </div> 
          </div>
          
          <div className="slidecontent">
            <div className="wrapper">
                <h2>OUR MISSION</h2>

                <p class="hometext">To connect creatives.</p>
                <p className="hometext">Enhance the quality of content.</p>
                <p className="hometext">Build teams of creators that assist each other to achieve respective goals.</p>
                <p className="hometext">Create and find opportunities that empower starter-ups in the industry.</p>
                <p className="hometext">Improve the entire entertainment space for future creators.</p>
              </div></div>
          <div className="slidecontent">
            <div className="wrapper">
              <h2>HOW YOU FIT IN</h2>

              <p className="hometext">Whether you are a writer, actor, cinematographer, or you are involved in any other aspects of film, 
              Vala films could be the platform you need for your next project.</p>
      
              <p className="hometext">If you are seeking opportunities to share your content with the world or you need the right team to help you execute your vision 
              in film and content, you’ve come to the right place!</p>
              
              <p className="hometext">Fill the form <font color = "#c1872b" style={{cursor:"pointer"}} onClick={()=>{joinusprop()}}>here </font> 
              or send us an email at <font color = "#c1872b">info@valafilms.com</font> and we'll be in touch.</p>
              
              <p className="hometext">We look forward to hearing about your creative ideas!</p>
            </div>
          </div>
          <div className="slidecontent">
            <div className="wrapper">
              <h2>WHAT WE DO</h2>

              <p class="hometext">At <font color = "#c1872b">Vala Films</font>, we provide the space for creatives in the film industry to connect, 
              collaborate and create. Using our platform, creatives and dreamers get a chance to hone their skills and 
              rise to the demands of the modern film and entertainment industry.</p>

              <p class="hometext">We work with a range of different creatives from filmmakers to actors, writers, or cinematographers. 
              With us, not only do you get the chance to discover your full untapped potential, you get to do so without restriction; 
              Vala films values creative freedom and diverse forms of expression.</p>

              <p class="hometext">Under our guidance, you can also be sure that your rights as a content producer will be protected!</p>
            </div> 
          </div>

        </Slider>

      </div> : <div className="moblepre" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '3%',
        minWidth: '100vw', backgroundColor: 'black'
      }} >   <video autoPlay muted loop id="loading" style={{ maxWidth: '35vw', zIndex: '4000' }}>
          <source src={logovid} type="video/mp4" />
        </video></div>}








      <Scrollbutton />
      <br />
      <br />
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Changed to dark background
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)", // Changed border color
          boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem",
          }}
        >
          <div
            className="logo-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {[
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118227/intc5wolqi29sumihkg6.png",
                alt: "Transcorp Hilton",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118238/kgr4899teiu00lbjavjv.png",
                alt: "USAID",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118241/aabmhzo8pwl8dv2skrlp.png",
                alt: "Johnnie Walker",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118244/aakadf0qwxkv78xzvod9.png",
                alt: "Fanta",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118250/bnnsqvj2gftgtkqkqn7m.png",
                alt: "Pad Up Africa",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118254/ukn0mftqo6idm82beuov.webp",
                alt: "Fayrouz",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118257/sim6dj8tyucn51milnbp.png",
                alt: "Evergreen Initiative",
              },
              {
                src: "https://res.cloudinary.com/dsrwsvsfn/image/upload/v1775118261/r9b0fmr1shubemcamhpt.jpg",
                alt: "Vanilla",
              },
            ].map((logo, index) => (
              <img
                key={index}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="partner-logo"
                style={{
                  height: "32px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "filter 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </footer>

      <style>
        {`
          .logo-container::-webkit-scrollbar {
            display: none;
          }
          .partner-logo {
            filter: grayscale(100%) brightness(200%);
          }
          .partner-logo:hover {
            filter: grayscale(0%) brightness(100%);
          }
        `}
      </style>
    </div>
  )
}
