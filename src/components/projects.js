import React from 'react'
import Slide from '@material-ui/core/Slide'
import logovid from "../files/logo2.mp4"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'react-gallery-carousel/dist/index.css';
import Slider from "react-slick";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Scrollbutton from "./scrolltobottom"
import Rodal from 'rodal';
import {useState,useEffect  } from "react";
import { teal, purple } from '@material-ui/core/colors';
import firebase from "./firebase"
import YoutubeEmbed from "./embed";
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import ReactPlayer from 'react-player/lazy'


function SampleNextArrow(props) {
  const {  onClick } = props;
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char = props.type === "next" ? <NavigateNextTwoToneIcon/>: <NavigateNextTwoToneIcon/> ;
  return (
    <div
      className={className}
     
      onClick={onClick}
    />
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" ,zIndex:'10000'}}
      onClick={onClick}
    />
  );
}
export default function Projects({vid}) {
  const [ind,setIndex]=useState(0)
  const [showModal,setmodal]= useState(false)
  const [showModal2,setmodal2]= useState(false)
  const [current,setcurrent]= useState("")
  const [currentitem,setcurrentitem]= useState()
  const [currentind,setcurrentind]= useState()
  const [currenttag,setcurrenttag]= useState("all")
  const [embed,setembed]= useState("")
  const [embed2,setembed2]= useState("")
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const useStyles = makeStyles({
    root: {
     backgroundColor:"black",
     zIndex:8000
    },
    bg:{
      backgroundColor:'black',
      zIndex:8000,
      display:"flex",
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    icon:{
      color:"white",
      width:"30px",
      height:"30px"
    },
    button:{

    }
  });
  const settings = {
    
    infinite: true,
 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 15000,
   
    className: 'slides'
    
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,

  };
  const settings3 = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:3500,
    arrows:false,

  };

  const [sett,setsettings]=React.useState({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide:2

  });
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let images=[]
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  
  const loadContent= ()=>{
    const todoRef = firebase.database().ref();
    todoRef.on('value', (snapshot) => {
     setobj(snapshot.val())
     console.log()
      setobj2(snapshot.val().filmpages.slides)
      setlink(snapshot.val().vala.settings.film.landingvideo)
      setthumblink(snapshot.val().vala.settings.film.thumb)
      setAds(snapshot.val().ad.slides) // Load ads content
      setAdsLink(snapshot.val().vala.settings.ads.landingvideo) // Load ads landing video

    }); }
    const [obj,setobj]= useState()
    const [imgs,setimgs]= useState([])
   const[obj2,setobj2]=useState()
   const [link,setlink] = useState()
   const [thumblink,setthumblink] = useState()
   const [imgarr,setarr] = useState([])
   const [ads, setAds] = useState([]) // State for ads content
   const [adsLink, setAdsLink] = useState("") // State for ads landing video
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(teal[500]),
      backgroundColor: teal[500],
      '&:hover': {
        backgroundColor: teal[700],
      },
    },
  }))(Button);

 
useEffect(() => {
  const script = document.createElement("script");    script.async = true;    script.src = "./scri.js"; 
  // Create an scoped async function in the hook
  async function anyNameFunction() {
    await loadContent();
  }
  // Execute the created function directly
  anyNameFunction();
  
 
}, []);
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
     <div style ={{display:'flex',backgroundColor:'black'}}>
          <IconButton  onClick={handleClose} className={classes.icon}>
          <CloseIcon/>
          </IconButton>
          </div>
     
        <DialogContent  className={classes.bg}>
        <div className="slideimg">
       
        <Slider {...sett}>
        {!!obj2 && !!currentitem && obj2[currentitem].supprtingimages.map((imgurl, index) => (
      <div>
    
      < img src={`${imgurl.url}`} alt="hey" className="imgslide" key={index} />
<br />


     </div>
    ))

    }
        </Slider>
      </div>
        </DialogContent>
        
      </Dialog>
        
         {!!obj?
        <div>
 <div style={{zIndex:"6000",color:"white"}}>
  
   <div>{ showModal && <div className='tint' style={{backgroundColor:'black',minWidth:'100vw',minHeight:'100vh',zIndex:'400'}}></div>}
   <Rodal customMaskStyles={{backgroundColor:'black'}} customStyles={{backgroundColor:"black",padding:"0"}} visible={showModal} width={800} height={400} enterAnimation="rotate" showMask={true} onClose={()=>{setmodal(false)}}>
       {(embed!=""||!!embed)?<YoutubeEmbed embedId={embed} /> :<div >
       
         <ReactPlayer url={`${embed2}`}  controls={true} volume={1} playing={true} muted={true}/> 
          
       </div> }    
                </Rodal></div>
                </div>
                 <div className="vidcon">
                 <img
        src={thumblink}
        className="video-thumb tiny"
        alt="thumb"
        style={{ display: isVideoLoaded ? 'none' : 'block' }}
      />      
      <video autoPlay muted loop id="myVideo" style={{ opacity: isVideoLoaded ? 1 : 0 }} onLoadedData={onLoadedData}>
  <source src={`${link}`} type="video/mp4"/>
</video>

<div className="vidwriteup">
  <h1 className="slideup">FILMS </h1>

<br />
<h4 className="baulf2 mdf" onClick={()=>{window.open("https://youtube.com/channel/UC-N-kXie3NtFqonao9Sbe8A",'_blank')}}>WATCH NOW</h4>
</div>

</div>


<div id="filter" placeholder-text="SHORTS">
  <p onClick={()=>{setcurrenttag("all")} } style={{color:currenttag=="all"?"#c1872b":"#eeeeee"}}>ALL</p>
  <p onClick={()=>{setcurrenttag("short")}} style={{color:currenttag=="short"?"#c1872b":"#eeeeee"}}>SHORTS</p>
  <p onClick={()=>{setcurrenttag("ads")}} style={{color:currenttag=="ads"?"#c1872b":"#eeeeee"}}>ADS</p>
  <p onClick={()=>{setcurrenttag("documentary")}} style={{color:currenttag=="documentary"?"#c1872b":"#eeeeee"}}>DOCUMENTARIES</p> 
  
</div> 
         
        
<Slider {...settings}  >
{ 
   currenttag === "ads" ? (
     !!ads && Object.keys(ads).map((item, i) => (
       <div className="flexcol">
         <div className="flexunder">
           <div className="content"> 
             <h2>{ads[item].TITLE}</h2>
             <br />
             {ads[item].CAPTION.split("\\n").map((text, index) => (
               <p key={index}>{text}<br /><br /></p>
             ))}
             <br />
              {/* Only show Watch Content if vidlink exists and is not empty */}
              {(ads[item].vidlink && ads[item].vidlink !== "") && (
                    <>
                      <h1 className="baulf2" style={{width:'fit-content'}} onClick={()=>{
                        setmodal(true);
                        setembed(ads[item].vidlink);
                        if(!!ads[item].storedvidlink) {
                          setembed2(adsLink);
                        }
                      }}>Watch Content</h1>
                      <br />
                    </>
                  )}
             <div className=''>
               <Slider {...settings3}>
                 {ads[item].supprtingimages.map((imgurl, index) => (
                   <div className="newimage">
                     <img src={`${imgurl.url}`} className="" alt="hey" key={index} onClick={()=>{
                       setsettings({...sett, initialSlide: index});
                       setcurrentitem(item);
                     }}/>
                   </div>
                 ))}
               </Slider>
             </div>
           </div>
           <div className="poster">
             <img src={ads[item].poster} alt=""/>
           </div>
         </div>
         <br/>
         <br/>
         <Rodal customMaskStyles={{backgroundColor:'black'}} customStyles={{backgroundColor:"black",padding:"0",zIndex:'6000'}} visible={showModal2} width={1000} height={1000} enterAnimation="rotate" showMask={true} onClose={()=>{setmodal2(false)}}>
         </Rodal>
       </div>
     ))
   ) : (
     !!obj2 && Object.keys(obj2).map((item, i) => (
       (obj2[item].tag == currenttag || currenttag == "all") && (
         <div className="flexcol">
           <div className="flexunder">
             <div className="content"> 
               <h2>{obj2[item].TITLE}</h2>
               <br />
               {obj2[item].CAPTION.split("\\n").map((text, index) => (
                 <p key={index}>{text}<br /><br /></p>
               ))}
               <br />
               {(obj2[item].vidlink && obj2[item].vidlink !== "") && (
                      <>
                        <h1 className="baulf2" style={{width:'fit-content'}} onClick={()=>{
                          setmodal(true);
                          setembed(obj2[item].vidlink);
                          if(!!obj2[item].storedvidlink) {
                            setembed2(obj2[item].storedvidlink);
                          }
                        }}>Watch Content</h1>
                        <br />
                      </>
                    )}
               <div className=''>
                 <Slider {...settings3}>
                   {obj2[item].supprtingimages.map((imgurl, index) => (
                     <div className="newimage">
                       <img src={`${imgurl.url}`} className="" alt="hey" key={index} onClick={()=>{
                         setsettings({...sett, initialSlide: index});
                         setcurrentitem(item);
                       }}/>
                     </div>
                   ))}
                 </Slider>
               </div>
             </div>
             <div className="poster-container">
               <img className="poster-img" src={obj2[item].poster} alt=""/>
             </div>
           </div>
           <br/>
           <br/>
           <Rodal customMaskStyles={{backgroundColor:'black'}} customStyles={{backgroundColor:"black",padding:"0",zIndex:'6000'}} visible={showModal2} width={1000} height={1000} enterAnimation="rotate" showMask={true} onClose={()=>{setmodal2(false)}}>
           </Rodal>
         </div>
       )
     ))
   )
}       
        </Slider>
<br/>
<br/>
</div>:<div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'3%',
     minWidth:'100vw',backgroundColor:'black'}} >   <video autoPlay muted loop id="loading"  style={{maxWidth:'35vw',zIndex:'4000'}}>
     <source src={logovid} type="video/mp4"/>
   </video></div>}
    
   <Scrollbutton/>
  
</div>
       
    )
}