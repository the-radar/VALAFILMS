import React, { useState } from 'react';
import firebase from './firebase';
import { v4 as uuid } from 'uuid';
import { IconButton } from '@/components/ui/button';
import { X } from 'lucide-react';

const PhotoUpload = () => {
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
      // Reset form
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
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Upload Cover Photo</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={readPoster}
          className="w-full p-2 border rounded"
        />
        {posterUrl && (
          <img src={posterUrl} alt="Cover" className="w-32 h-32 object-cover rounded" />
        )}
      </div>

      <div className="space-y-2">
        <label className="block">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter project title"
        />
      </div>

      <div className="space-y-2">
        <label className="block">Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter tag (e.g. Food, Portrait, etc.)"
        />
      </div>

      <div className="space-y-2">
        <label className="block">Description</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Enter project description"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Upload Project Images</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={readImages}
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-3 gap-4">
          {imageUrl.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.url} alt="" className="w-full h-32 object-cover rounded" />
              <IconButton
                onClick={() => deleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1 rounded-full"
              >
                <X className="w-4 h-4 text-white" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={saveProject}
        disabled={isInvalid}
        className={`w-full p-2 rounded ${
          isInvalid ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Save Project
      </button>
    </div>
  );
};

export default PhotoUpload;