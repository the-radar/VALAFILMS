import { React, useState, useEffect } from 'react'
import Slider from "react-slick";
import logovid from "../files/logo2.mp4"
import firebase from "./firebase"
import YouTube from 'react-youtube';
import Scrollbutton from "./scrolltobottom"
import VideoThumbnail from 'react-video-thumbnail';
import Logo from '../files/Logo_Low.png';
export default function Homepage({ vid }) {
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

      <div>
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
              <video autoPlay muted playsInline loop id="myVideo" style={{ opacity: isVideoLoaded ? 1 : 0 }} onLoadedData={onLoadedData}>
                <source src={`${link}`} type="video/mp4" />
              </video>
            </div>
          </div>


        </div> <br />
        <br />


        <Slider {...settings}>
        <div className="slidecontent">
            <div className="wrapper">
                <h2>Who We ARE</h2>

                <p className="hometext"><font color = "#c1872b">We</font> are a group of creatives just like you, seeking to create opportunities for
people like us in the film industry.</p>
                    </div>
          </div>
          <div className="slidecontent">
            <div className="wrapper">
                <h2>VALAFILMS</h2>
<p><font color = "#c1872b">VALA</font> in the Persian language Farsi, means “supreme”, and how do we
identify with this word, you may wonder? Here at Vala films, our aim is to
deliver the highest quality, in all we do and produce. This word not only
defines our values as a company, but the true essence we portray in all that
we do. Here at Vala, we go beyond the expected standard, to give our
consumers authenticity.</p>
                   </div> 
          </div>
          
          <div className="slidecontent">
            <div className="wrapper">
                <h2>OUR MISSION</h2>

                <p class="hometext">To connect creatives.</p>
                <p className="hometext">Enhance the quality of content.</p>
                <p className="hometext">Connect creators with the best suited teams.</p>
                <p className="hometext">Create and find opportunities that empower.</p>
                <p className="hometext">Improve the entire entertainment space.</p>
              </div></div>
          <div className="slidecontent">
            <div className="wrapper">
                <h2>HOW YOU FIT IN</h2>

                <p className="hometext">Are you involved in any aspect of film, and seeking opportunities to share
your content with the world? Do you have ideas that require the best teams
to execute?
Simply mail us here: <font color = "#c1872b">info@valafilms@gmail.com</font>.
We look forward to having you on our team!</p>
                  </div>
          </div>
          <div className="slidecontent">
            <div className="wrapper">
              <h2>WHAT WE DO</h2>

              <p class="hometext"><font color = "#c1872b">Valafilms</font> is a bridge for creatives in the film industry to connect,
collaborate and create. We provide a space designed to cater
predominantly for creatives in the all over Africa. Through the platforms we
provide, creatives are given the pedestal to hone their skills and abilities, in
order to produce art that will spread across the globe. Through our
platform, your rights as a content producer is protected, along with your
ability to exercise your creative freedom, as we do not prohibit the creatives
under us the right to express their passion in their own ways.</p>
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
    </div>
  )
}
