import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { v4 as uuid } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default function UploadImage({path}) {
  const [imageUrl, setImageUrl] = useState([]);
  const [posterurl,setsposter]= useState("")
  const [slide,setslide]= useState()
  var slideobject={}
  const [caption,setcaption]=useState("")
  const [title,settitle]=useState("")
  const [trailerlink,settrailer]=useState("")
  const[supporting,setsupporting]=useState("")
  const [open, setOpen] = useState(false);

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
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const save =async () => {
   const si={supprtingimages:imageUrl}
  const id=uuid()
  const slideref = firebase.database().ref(path).child("slides").child(id);
   
    const slideobject=Object.assign({poster:posterurl,TITLE:title,CAPTION:caption,vidlink:trailerlink},si)
    
    
     await slideref.set(slideobject);
     setOpen(true)
     window.location.reload();
  
  };
  const readposter = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref('poster').child(id);
    const imageRef = firebase.database().ref('poster').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      setsposter(url)
     
    });
  };

  
  const deleteImage = (id) => {
    
    const imageRef =     firebase.database().ref('filmpage').child(id);
    
      imageRef.remove();
      console.log(imageUrl)
    
       const newstate=imageUrl.filter(person => person.id != id);
       console.log(newstate)
     //  if(index!=-1)
       setImageUrl(newstate)
    

  }
  const isInvalid =
  title==="" ||
  posterurl=== '' ||
  trailerlink === '' ||
  caption === '' || 
  !imageUrl.length;

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
    <div className='adminform'>
        <div style={{display:"flex",flexDirection:'column'}}><h1>Upload poster</h1>
        <input type="file" accept="image/*" onChange={readposter} />
        
        </div>
        <br/>
        <label htmlFor="title">TITLE</label><br/>
<input type="text" name='title' placeholder='enter title' onChange={(e)=>{
settitle(e.target.value)
}}/> <br/>
<label htmlFor="title">Trailer/video</label><br/>
<input type="text" name='title' placeholder='enter youtube embed id' onChange={(e)=>{
settrailer(e.target.value)
}}/> <br/>
<label htmlFor="desc">DESCRIPTION</label> <br/>
<textarea name="desc" id="" cols="30" rows="10" onChange={(e)=>{
setcaption(e.target.value)
}}></textarea> <br/>
      <h1>Upload images (one by one)</h1>
      <input type="file" accept="image/*" onChange={readImages} />
      {imageUrl
        ? imageUrl.map(({ id, url }) => {
            return (
              <div key={id}>
                <img style={{maxWidth:"50px"}} src={url} alt="" />
               
                <button onClick={() => deleteImage(id)}>Delete</button>
              </div>
            );
          })
        : ''}
        
        {
       
        console.log(slideobject)
        }
        <button onClick={()=>{save()}} disabled={isInvalid}>Save slide</button>
    </div>
    </div>
  );
}