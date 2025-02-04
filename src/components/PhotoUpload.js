import React, { useState } from 'react';
import firebase from './firebase';
import { v4 as uuid } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px',
    marginTop: '10px',
  },
  imageWrapper: {
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  deleteButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'rgba(255, 0, 0, 0.7)',
    color: '#fff',
    padding: '3px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    '&:disabled': {
      background: '#ccc',
      cursor: 'not-allowed',
    },
  },
}));

const PhotoUpload = () => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState([]);
  const [posterUrl, setPosterUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref('photos').child(id);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    setImageUrl([...imageUrl, { url }]);
  };

  const readPoster = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref('photoPoster').child(id);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    setPosterUrl(url);
  };

  const deleteImage = (indexToDelete) => {
    setImageUrl(imageUrl.filter((_, index) => index !== indexToDelete));
  };

  const saveProject = async () => {
    const projectId = `project${Date.now()}`;
    const projectRef = firebase.database().ref('photopages').child(projectId);
    
    const projectData = {
      TITLE: title,
      CAPTION: caption,
      poster: posterUrl,
      tag: tag,
      images: imageUrl
    };

    try {
      await projectRef.set(projectData);
      alert('Project saved successfully!');
      setImageUrl([]);
      setPosterUrl("");
      setTitle("");
      setCaption("");
      setTag("");
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  const isInvalid = !title || !posterUrl || !tag || imageUrl.length === 0 || !caption;

  return (
    <div className={classes.container}>
      <h2>Upload Cover Photo</h2>
      <input type="file" accept="image/*" onChange={readPoster} className={classes.input} />
      {posterUrl && <img src={posterUrl} alt="Cover" className={classes.image} style={{ width: '150px', height: '150px' }} />}

      <label>Project Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={classes.input} placeholder="Enter project title" />
      
      <label>Tag</label>
      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className={classes.input} placeholder="Enter tag" />

      <label>Description</label>
      <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className={classes.input} rows={3} placeholder="Enter description" />

      <h2>Upload Project Images</h2>
      <input type="file" accept="image/*" onChange={readImages} className={classes.input} />
      <div className={classes.imageGrid}>
        {imageUrl.map((img, index) => (
          <div key={index} className={classes.imageWrapper}>
            <img src={img.url} alt="" className={classes.image} />
            <IconButton onClick={() => deleteImage(index)} className={classes.deleteButton}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      <button onClick={saveProject} disabled={isInvalid} className={classes.button}>
        Save Project
      </button>
    </div>
  );
};

export default PhotoUpload;
