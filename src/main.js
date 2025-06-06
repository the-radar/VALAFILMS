import React, { useState, useEffect } from 'react';
import logo from './files/Logo_Low.png';
import Vid from '../src/files/video.mp4';
import Vid2 from '../src/files/vid.mp4';
import Vid3 from '../src/files/ad2.mp4';
import Home from "../src/components/homepage";
import Projects from "../src/components/projects";
import Collabs from "../src/components/collab";
import Admin from "../src/components/admin";
import MailchimpForm from '../src/components/mailchimpform';
import Ad from "../src/components/Ad";
import Ab from "../src/components/about";
import Photography from '../src/components/photography';
import emailjs from 'emailjs-com';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import rad from "../src/files/radar.png";
import Modal from "react-animated-modal";
import 'rodal/lib/rodal.css';
import Rodal from 'rodal';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useWindowScroll } from "react-use";
import zIndex from '@material-ui/core/styles/zIndex';

function Appm() {
  const { y: pageYOffset } = useWindowScroll();
  const [styleCondition, setstyle] = useState(true);
  const [styleCondition2, setstyle2] = useState(true);
  const [styleCondition3, setstyle3] = useState(true);
  const [visible, setVisiblity] = useState("");
  const [view, setview] = useState('home');
  const [showModal, setmodal] = useState(false);
  const [showContactModal, setContactModal] = useState(false);

  function setpropsvalue() {
    setmodal(true);
  }

  function setviews(role) {
    switch(role) {
      case 'home':
        return <Home vid={Vid} joinusprop={setpropsvalue} />
      case 'projects':
        return <Projects vid={Vid2} />
      case 'collab':
        return <Collabs vid={Vid} />
      case 'adverts':
        return <Ad vid={Vid3} />
      case 'about':
        return <Ab />
      case 'team':
        return <Ab />
      case 'photography':
        return <Photography />
      default:
        return <p>Your current feed</p>
    }
  }

  useEffect(() => {
    if (pageYOffset > 100) {
      setVisiblity("black");
    } else {
      setVisiblity("");
    }
  }, [pageYOffset]);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_44a9us2', 'template_c1hvvvu', e.target, '8QiJyKaujovssckO3')
      .then((result) => {
        console.log(result.text);
        alert('form submitted');
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        setmodal(false);
      }, (error) => {
        console.log(error.text);
      });
  }

  function sendContactEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_44a9us2', 'template_43t2hpj', e.target, '8QiJyKaujovssckO3')
      .then((result) => {
        console.log(result.text);
        alert('form submitted');
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        setContactModal(false);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <div className="App">
      <div className={`navcontainer ${visible}`}></div>
      <div className="homecon">
        <img src={logo} style={{zIndex:"9000"}} alt="" onClick={()=>{setview('home');setmodal(false);
  setContactModal(false)}} />
        <h1 className="valatext" onClick={()=>{setview('home');setmodal(false);
  setContactModal(false)}} >V A L A   F I L M S</h1>
        <div style={{zIndex:"6000",color:"white"}}>
          <Rodal className="element" customMaskStyles={{backgroundColor:'#010101'}} customStyles={{backgroundColor:"#010101",padding:"10px",width:"80vw",height:"auto",overflowY:"auto"}} visible={showModal} enterAnimation="rotate" showCloseButton={false} onClose={()=>{setmodal(false)}}>
            <form action="https://formsubmit.co/info@valafilms.com" method="POST" onSubmit={sendEmail}>
            <div class="input-container">
              <input id="name" class="input" type="text" name="name" required placeholder=" " />
              <label for="name" class="placeholder">NAME</label>
            </div>
            <div class="input-container">
              <input id="email" class="input" type="text" name="email" required placeholder=" " />
              <label for="email" class="placeholder">EMAIL ADDRESS</label>
            </div>
            <div class="input-container">
              <input id="phone" class="input" type="text" name="phone" required placeholder=" " />
              <label for="phone" class="placeholder">PHONE</label>
            </div>
            <div class="input-container">
              <select required name="sex">
                <option selected disabled>GENDER</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="input-container">
              <input id="dob" class="input" type="text" name="dob" required placeholder=" " />
              <label for="dob" class="placeholder">DATE OF BIRTH (DD-MM-YYYY)</label>
            </div>
            <div class="input-container">
              <input id="address" class="input" type="text" name="address" required placeholder=" " />
              <label for="address" class="placeholder">ADDRESS</label>
            </div>
            
            {/* <input type="text" placeholder="NAME" name="name" required />
            <input type="text" placeholder="EMAIL ADDRESS" name="email" required   />
            <input type="text" placeholder="PHONE" name="phone" required /> */}
            <div class="input-container">
              <select required name="field">
                <option selected disabled>YOUR FIELD(S) OF SPECIALIZATION</option>
                <option value="Directing">Directing</option>
                <option value="Acting">Acting</option>
                <option value="Voice Acting">Voice Acting</option>
                <option value="Cinematography">Cinematography</option>
                <option value="Color Grading">Color Grading</option>
                <option value="Sound Design">Sound Design</option>
                <option value="Music Production/Scoring">Music Production/Scoring</option>
                <option value="Screenwriting">Screenwriting</option>
                <option value="Drone piloting">Drone piloting</option>
                <option value="Art Directing">Art Directing</option>
                <option value="Project Management">Project Management</option>
                <option value="Graphics">Graphics</option>
                <option value="Photography">Photography</option>
                <option value="Animating">Animating</option>
                <option value="Set Design">Set Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="input-container">
              <input id="fieldother" class="input" type="text" name="other_field" placeholder=" " />
              <label for="fieldother" class="placeholder">SPECIFY FIELD (OTHER)</label>
            </div>
            <div class="input-container">
              <input id="pw" class="input" type="text" name="previous_work" required placeholder=" " />
              <label for="pw" class="placeholder">LINK TO PREVIOUS WORK</label>
            </div>
            <div class="input-container">
              <input id="us" class="input" type="text" name=" hear_about_us" required placeholder=" " />
              <label for="us" class="placeholder">HOW DID YOU HEAR ABOUT US?</label>
            </div>
            <div class="textarea-container">
              <textarea id="message" class="input" name="message" required placeholder=" "></textarea>
              <label for="message" class="placeholder">YOUR COMMENT</label>
            </div>
            
            {/* <input type="text" placeholder="SPECIFY FIELD (OTHER)" name="fieldother"/>
            <input  type="text" placeholder="LINK TO PREVIOUS WORK" name="pw"/>
            <input required  type="text" placeholder="HOW DID YOU HEAR ABOUT US?" name="us" />
            <textarea placeholder="YOUR MESSAGE" name="message"></textarea> */}

              <input type="submit" value="SEND" />
            </form>
          </Rodal>
          <Rodal className="element" customMaskStyles={{backgroundColor:'#010101'}} customStyles={{backgroundColor:"#010101",padding:"10px",width:"80vw",height:"auto",overflowY:"auto"}} visible={showContactModal} enterAnimation="rotate" showCloseButton={false} onClose={()=>{setContactModal(false)}}>
            <form action="https://formsubmit.co/info@valafilms.com" method="POST" onSubmit={sendContactEmail}>
              <div class="input-container">
                <input id="contact-name" class="input" type="text" name="name" required placeholder=" " />
                <label for="contact-name" class="placeholder">NAME</label>
              </div>
              <div class="input-container">
                <input id="contact-email" class="input" type="text" name="email" required placeholder=" " />
                <label for="contact-email" class="placeholder">EMAIL ADDRESS</label>
              </div>
              <div class="textarea-container">
                <textarea id="contact-message" class="input" name="message" required placeholder=" "></textarea>
                <label for="contact-message" class="placeholder">YOUR MESSAGE</label>
              </div>
              <input type="submit" value="SEND" />
            </form>
          </Rodal>
        </div>
      </div>
      {setviews(view)}
      <div id="nav-icon2" className={styleCondition2 ? "spin circle": "spin circle open"} onClick={(e)=>{ e.preventDefault();setstyle2(!styleCondition2);setstyle3(!styleCondition3); setstyle(!styleCondition);setmodal(false);
  setContactModal(false)}}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styleCondition ? "nav" : "nav show"} style={{ 
  overflowY: 'auto',  
  maxHeight: '100vh' 
}}>
        <div className="navcontent">
          <div className="nav-content-container">
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{setview('home');setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>home</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{setview('projects');setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>films</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{setview('collab');setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>collaborations</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{setview('photography');setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>photography</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{setview('team');setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>creative junkies</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{ setmodal(true); setstyle2(!styleCondition2);setstyle(!styleCondition);setstyle3(!styleCondition3)}} style={{cursor:"pointer"}}>JOIN US</h1>
            <h1 className={styleCondition3 ? "slidedown" : "slideup"} onClick={()=>{ setContactModal(true); setstyle2(!styleCondition2);setstyle(!styleCondition);setstyle3(!styleCondition3)}} style={{cursor:"pointer"}}>CONTACT US</h1>
          
            <div className={styleCondition3 ? "slidedown " : "slideup "} onClick={()=>{setstyle2(!styleCondition2);setstyle(!styleCondition);setmodal(false);
  setContactModal(false);setstyle3(!styleCondition3)}}>
              <div className="aflex"> 
                <a href="https://twitter.com/valafilms?s=21" target="_blank" className="fa fa-twitter"></a>
                <a href="https://youtube.com/channel/UC-N-kXie3NtFqonao9Sbe8A" target="_blank" className="fa fa-youtube"></a>
                <a href="https://instagram.com/vala_films?utm_medium=copy_link" target="_blank" className="fa fa-instagram"></a>
              </div> 
            </div>
            <div className={styleCondition3 ? "slidedown" : "slideup"} style={{marginTop: '20px'}}>
        <MailchimpForm />
        <div style={{textAlign: 'center', fontSize: '14px', marginTop: '20px'}}> 
          <p className="gmail">
            Send us an email: info@valafilms.com
          </p>
          <p style={{margin: '10px 0'}}>
            © Copyright 2025 Vala Films
          </p>
          <p className="radar" style={{cursor:"pointer"}} onClick={()=>{window.open("https://the-radar.net",'_blank')}}>
            by, TheRadar
          </p>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appm;