import React from 'react'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import logovid from "../files/logo2.mp4"
import 'react-gallery-carousel/dist/index.css';
import Scrollbutton from "./scrolltobottom"
import Slider from "react-slick";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Rodal from 'rodal';
import {useState,useEffect  } from "react";
import { teal, purple } from '@material-ui/core/colors';
import firebase from "./firebase"
import YoutubeEmbed from "./embed";
export default function Ads({vid}) {
  const [ind,setIndex]=useState(0)
  const [showModal,setmodal]= useState(false)
  const [showModal2,setmodal2]= useState(false)
  const [current,setcurrent]= useState("")
  const [currentitem,setcurrentitem]= useState()
  const [currentind,setcurrentind]= useState()
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
    }
  });
  const settings = {
    
    infinite: true,
 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 15000,
   
    className: 'slides',
    dots:false
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,

  };
  const settings3 = {
   
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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,

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
  const loadContent= ()=>{
    const todoRef = firebase.database().ref();
    todoRef.on('value', (snapshot) => {
     setobj(snapshot.val())
     console.log()
     if(snapshot.val().ad.slides!=null)
      setobj2(snapshot.val().ad.slides)
      setlink(snapshot.val().vala.settings.ads.landingvideo)


    }); }
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    const [obj,setobj]= useState()
    const [imgs,setimgs]= useState([])
   const[obj2,setobj2]=useState()
   const [link,setlink] = useState()
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
       <YoutubeEmbed embedId="rokGy0huYEA" />      
                </Rodal></div>
       
               
                </div>



                 <div className="vidcon">
                  
      <video autoPlay muted loop id="myVideo">
  <source src={`${link}`} type="video/mp4"/>
</video>
<div className="video-overlay"></div>
<div className="vidwriteup">
  <h1 className="slideup"> COMMERCIALS</h1>
<br />

</div>

</div>

<Slider {...settings}>
{ 
   !!obj2 && Object.keys(obj2).map((item, i) => (
      <div className="flexcol">
      <div className="flexunder">
<div className="content"> 
<h2>{obj2[item].TITLE}</h2>
<br />
<p>{obj2[item].CAPTION}</p>
{/* <h1 className="baulf2"  style={{width:'fit-content'}} onClick={()=>{setmodal(true)}}>Watch Trailer</h1> */}
<br />
<div className='' >
<Slider {...settings3}>
{obj2[item].supprtingimages.map((imgurl, index) => (
      <div  className="newimage">
  
      < img src={`${imgurl.url}`} alt="hey" key={index} onClick={()=>{
      
       // setsettings({...sett,initialSlide:index})
      //  setcurrentitem(item)
      //handleClickOpen()
        
      }}/>
<br />


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
