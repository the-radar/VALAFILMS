import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import Slider from 'react-slick';
import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Photography = () => {
  const [showModal, setModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentTag, setCurrentTag] = useState('all');
  const [photoData, setPhotoData] = useState(null);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: 'slides'
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
    setCurrentImages(project.images.map(img => img.url));
    setCurrentProject(project);
    setModal(true);
  };

  // Inline styles
  const styles = {
    pageContainer: {
      backgroundColor: 'black',
      minHeight: '100vh',
      color: 'white',
      padding: '20px'
    },
    filterSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '40px'
    },
    filterButton: {
      padding: '10px 20px',
      border: '1px solid #c1872b',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      color: '#eeeeee'
    },
    activeFilter: {
      backgroundColor: '#c1872b',
      color: 'black'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
      padding: '2rem'
    },
    projectCard: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      transition: 'transform 0.3s ease'
    },
    projectImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      cursor: 'pointer'
    },
    projectInfo: {
      padding: '20px',
      backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalContent: {
      backgroundColor: 'black',
      padding: '20px',
      position: 'relative'
    },
    modalImage: {
      width: '100%',
      height: '80vh',
      objectFit: 'contain'
    },
    closeButton: {
      position: 'absolute',
      right: '10px',
      top: '10px',
      zIndex: 1000,
      color: 'white'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.filterSection}>
        {['all', 'product', 'food', 'portraits', 'tinyduru'].map(tag => (
          <button
            key={tag}
            style={{
              ...styles.filterButton,
              ...(currentTag === tag && styles.activeFilter)
            }}
            onClick={() => setCurrentTag(tag)}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.projectsGrid}>
        {photoData && Object.entries(photoData).map(([key, project]) => (
          (currentTag === 'all' || project.tag === currentTag) && (
            <div 
              key={key} 
              style={styles.projectCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={project.poster}
                alt={project.TITLE}
                style={styles.projectImage}
                onClick={() => openGallery(project)}
              />
              <div style={styles.projectInfo}>
                <h3>{project.TITLE}</h3>
                {project.CAPTION.split('\\n').map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      <Dialog
        open={showModal}
        onClose={() => setModal(false)}
        maxWidth="xl"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <div style={styles.modalContent}>
          <IconButton 
            style={styles.closeButton}
            onClick={() => setModal(false)}
          >
            <CloseIcon />
          </IconButton>
          
          <Slider {...sliderSettings}>
            {currentImages?.map((imgUrl, index) => (
              <div key={index}>
                <img 
                  src={imgUrl} 
                  alt={`Slide ${index}`} 
                  style={styles.modalImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Dialog>
    </div>
  );
};

export default Photography;