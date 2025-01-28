import React from 'react';
import firebase from './firebase';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "react-slick";

export default function Photography() {
  const [showModal, setModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentTag, setCurrentTag] = useState("all");
  const [photoData, setPhotoData] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = firebase.database().ref('photopages');
      dbRef.on('value', (snapshot) => {
        setPhotoData(snapshot.val());
      });
    };
    fetchData();
  }, []);

  const openGallery = (project) => {
    // Extract just the URLs from the images array
    const imageUrls = project.images.map(img => img.url);
    setCurrentImages(imageUrls);
    setCurrentProject(project);
    setModal(true);
  };

  return (
    <div className="page-container">
      <div className="filter-section">
        {['all', 'product', 'food', 'portraits', 'tinyduru'].map(tag => (
          <button 
            key={tag}
            className={currentTag === tag ? 'active' : ''}
            onClick={() => setCurrentTag(tag)}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {photoData && Object.entries(photoData).map(([key, project]) => (
          (currentTag === 'all' || project.tag === currentTag) && (
            <div key={key} className="project-card">
              <img 
                src={project.poster} 
                alt={project.TITLE}
                onClick={() => openGallery(project)}
              />
              <div className="project-info">
                <h3>{project.TITLE}</h3>
                <p>{project.CAPTION.replace(/\\n/g, '\n')}</p>
              </div>
            </div>
          )
        ))}
      </div>

      <Dialog
        open={showModal}
        onClose={() => setModal(false)}
        maxWidth="xl"
      >
        <div className="modal-header">
          <IconButton onClick={() => setModal(false)}>
            <CloseIcon />
          </IconButton>
          <h2>{currentProject?.TITLE}</h2>
        </div>
        
        <Slider {...sliderSettings}>
  {currentImages?.map((imgUrl, index) => (
    <div key={index} className="modal-slide">
      <img src={imgUrl} alt={`Slide ${index}`} />
    </div>
  ))}
</Slider>
      </Dialog>
    </div>
  );
}