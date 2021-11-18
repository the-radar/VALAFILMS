import logo from './files/Logo_Low.png';
import React from 'react';
import ReactDOM from 'react-dom';

import Vid from '../src/files/video.mp4'
import Vid2 from '../src/files/vid.mp4'
import Vid3 from '../src/files/ad2.mp4'
import {useState,useEffect  } from "react";
import Home from "../src/components/homepage";
import Projects from "../src/components/projects"
import Collabs from "../src/components/collab"
import Admin from "../src/components/admin"
import Ad from "../src/components/Ad"
import Ab from "../src/main"
import Login from "../src/components/login"

import './App.css';
import rad from "../src/files/radar.png";
import { useWindowScroll } from "react-use";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter} from "react-router-dom";
import firebase from "firebase";


function App() {
  const [authentication, setAuthState] = useState({
    authenticated: false, //whether the user is allowed to access the protected routes
    initialized: true //if firebase is still being nitalized
  });
  
  
  const { y: pageYOffset } = useWindowScroll();
 const [styleCondition,setstyle]=useState(true);
 const [styleCondition2,setstyle2]=useState(true);
 const [styleCondition3,setstyle3]=useState(true);
 const [visible, setVisiblity] = useState("");
const[view,setview]=useState('home');

React.useEffect(()=>firebase.auth().onAuthStateChanged(user => {
  if (user) { //the user has been logged in
    setAuthState({
        authenticated: true, //the user is now authenticated
        initialized: false
      });
  } else { //the user has been logged out
    setAuthState({
      authenticated: false, //the user is no longer authenticated
      initialized: false
    });
  }
}), [setAuthState]);
if (authentication.initialized) { //if firebase is still being initialized, return a Loading component
  return <div>loading....</div>
}

return (

    
      <Router>
        <Switch>
        <Route path="/" exact component={Ab}/>
        <Route path="/login" exact component={Login}/>
      
        <PrivateRoute path= {"/admin"} component={(Admin)} authenticated={authentication.authenticated}/> //this is a dashboard page that only signed in users can access
            
     
             </Switch>
      </Router>
    
);

  
}

const PrivateRoute = ({ component: Component, authenticated: authenticated, ...rest }) => (
  <Route {...rest} render=
  {props => authenticated
    ?
    (<Component {...props} />)
    :
    (<Redirect to={{ pathname: "/login" }} /> )
  }
  />
);
export default App;
