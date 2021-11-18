import React from 'react'
import lsp from "../files/LSP.jpeg"
import lsp1 from "../files/LSP1.jpeg"
import lsp2 from "../files/LSP2.png"
import lsp3 from "../files/LSP3.jpeg"
import lsp4 from "../files/LSP4.png"
import lsp5 from "../files/LSP5.jpeg"
import lsp6 from "../files/LSP6.jpeg"
import lsp7 from "../files/LSP7.png"
import sf from "../files/sf.jpeg"
import sf1 from "../files/sf1.jpeg"
import sf2 from "../files/sf2.jpeg"
import sf3 from "../files/sf3.jpeg"
import sf4 from "../files/sf4.jpeg"
import sf5 from "../files/sf5.jpeg"
import sf6 from "../files/sf6.jpeg"
import sf7 from "../files/sf7.jpeg"
import sf8 from "../files/sf8.jpeg"
import ScriptTag from 'react-script-tag';
import Slide from '@material-ui/core/Slide'
import logovid from "../files/logo2.mp4"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import Slider from "react-slick";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Scrollbutton from "./scrolltobottom"

import Rodal from 'rodal';
import {useState,useEffect  } from "react";
import { teal, purple } from '@material-ui/core/colors';
import firebase from "./firebase"
import YoutubeEmbed from "./embed";

import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';
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

    }); }
    const [obj,setobj]= useState()
    const [imgs,setimgs]= useState([])
   const[obj2,setobj2]=useState()
   const [link,setlink] = useState()
   const [thumblink,setthumblink] = useState()
   const [imgarr,setarr] = useState([])
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
  let movies=[{"header":"LOUD SILENCE",
"desc":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, atque distinctio dolor blanditiis natus asperiores explicabo quo sequi quod at deleniti aspernatur vel possimus dolores aliquam, velit tempore, quidem odio error debitis voluptas. Velit doloribus adipisci numquam, tenetur hic labore?"},{"header":"STILL FALLING",
"desc":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, atque distinctio dolor blanditiis natus asperiores explicabo quo sequi quod at deleniti aspernatur vel possimus dolores aliquam, velit tempore, quidem odio error debitis voluptas. Velit doloribus adipisci numquam, tenetur hic labore?"}]
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
        style={{ opacity: isVideoLoaded ? 0 : 1 }}
      />      
      <video autoPlay muted loop id="myVideo" style={{ opacity: isVideoLoaded ? 1 : 0 }} onLoadedData={onLoadedData}>
  <source src={`${link}`} type="video/mp4"/>
</video>

<div className="vidwriteup">
  <h1 className="slideup">FILMS </h1>

<br />
<h4 className="baulf2 mdf" onClick={()=>{window.location.href="https://youtube.com/channel/UC-N-kXie3NtFqonao9Sbe8A"}}>WATCH NOW</h4>
</div>

</div>


<div id="filter" placeholder-text="SHORTS">
<p onClick={()=>{setcurrenttag("all")} } style={{color:currenttag=="all"?"#c1872b":"#eeeeee"}}>ALL</p>
    <p onClick={()=>{setcurrenttag("short")}} style={{color:currenttag=="short"?"#c1872b":"#eeeeee"}}>SHORTS</p>
    <p onClick={()=>{setcurrenttag("fashion")}} style={{color:currenttag=="fashion"?"#c1872b":"#eeeeee"}}>FASHION</p>
   { //<p onClick={()=>{setcurrenttag("documentary")}} style={{color:currenttag=="documentary"?"#c1872b":"#eeeeee"}}>DOCUMENTARIES</p>
    } <p onClick={()=>{setcurrenttag("real estate")}} style={{color:currenttag=="real estate"?"#c1872b":"#eeeeee"}}>REAL ESTATE</p>

</div>
         
        
<Slider {...settings}  >
{ 
   !!obj2 && Object.keys(obj2).map((item, i) => (

    (obj2[item].tag==currenttag || currenttag=="all")   &&
<div className="flexcol">
  <div className="flexunder">

    <div className="content"> 

      <h2>{obj2[item].TITLE}</h2>
      <br />
      <p>{obj2[item].CAPTION}</p>
      <br />
      <h1 className="baulf2"  style={{width:'fit-content'}}  onClick={()=>{setmodal(true);setembed(obj2[item].vidlink)
    if(!!obj2[item].storedvidlink) {
      setembed2(obj2[item].storedvidlink)
    } 
    
    }
    }>Watch Content</h1>
      <br />
      <div className='' >
   <Slider {...settings3}>
     {obj2[item].supprtingimages.map((imgurl, index) => (
      <div className="newimage">
     
      < img src={`${imgurl.url}`} className="" alt="hey" key={index} onClick={()=>{
      
        setsettings({...sett,initialSlide:index})
        setcurrentitem(item)
        // handleClickOpen()
        // Bobs: I took it out for now because it seems like we don't need it again. 
      }}/>



      </div>
    ))

    }
</Slider>
    


   


  </div>
    </div>
    <div className="poster">
    <img src={obj2[item].poster} alt=""/>
    </div>
  </div>
  <br/>
  <br/>
  

   
<Rodal  customMaskStyles={{backgroundColor:'black'}} customStyles={{backgroundColor:"black",padding:"0",zIndex:'6000'}} visible={showModal2} width={1000} height={1000} enterAnimation="rotate" showMask={true} onClose={()=>{setmodal2(false)}}>


                </Rodal>

</div>
    ))

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
