import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { v4 as uuid } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default function Teamsettings() {
  const [imageUrl, setImageUrl] = useState();
  const [image , setImage] = useState('');
  
  const [open, setOpen] = useState(false);
  const [name, setname] = useState('');
  const [twitter, settwitter] = useState('');
  const [role, setrole] = useState('');
 
  const [ig, setig] = useState('');
  const [gmail, setgmail] = useState('false');
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
const upload = ()=>{
  if(image == null)
    return;
  firebase.storage().ref(`/images/${image.name}`).put(image)
  .on("state_changed", alert("success"), alert, () => {

    // Getting Download Link
    firebase.storage().ref("images").child(image.name).getDownloadURL()
      .then((url) => {
        setImageUrl(url);
       
      }).then(()=>{

firebase.database().ref('/teammembers').push({
imageUrl,name,role,ig,twitter,gmail


})




      },alert('success update'))
  });
}

  
const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
   
    const storageRef = firebase.storage().ref('images').child(id);
    const imageRef = firebase.database().ref('filmpage').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };






  
  const deleteImage = (id) => {
    
    

  }
  const isInvalid =
  ig==="" ||
  role=== '' ||
  name === '' ||
  gmail === '' || 
  !imageUrl.length || twitter==='';

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="changes successfully uploaded"
        action={
          <div>
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
     />
     <br/>
    <div className='adminform'>
        
        <div style={{display:"flex",flexDirection:'column'}}><h1>Upload Member</h1>
        <input accept="image/*" type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
        <br/>
        <label htmlFor="title">Name:</label><br/>
<input type="text" name='title' placeholder='enter fullname' onChange={(e)=>{
setname(e.target.value)
}}/>
        <br/>
        <label htmlFor="title">Role:</label><br/>
<input type="text" name='title' placeholder='enter role' onChange={(e)=>{
setrole(e.target.value)
}}/> <br/>
<label htmlFor="title">ig link</label><br/>
<input type="text" name='title' placeholder='enter ig link' onChange={(e)=>{
setig(e.target.value)
}}/> <br/>
<label htmlFor="title">gmail link</label><br/>
<input type="text" name='title' placeholder='enter gmail address' onChange={(e)=>{
setgmail(e.target.value)
}}/>
<br/>
<label htmlFor="title">twitter link</label><br/>
<input type="text" name='title' placeholder='enter twitter link' onChange={(e)=>{
settwitter(e.target.value)
}}/>
<button onClick={()=>{upload()}}  disabled={isInvalid} > submit</button>
<br/>
       </div>
    </div>   </div>
  );
}