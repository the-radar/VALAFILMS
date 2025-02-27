import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { v4 as uuid } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formSection: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
  },
  memberList: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
  },
  memberItem: {
    border: '1px solid #f0f0f0',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  memberImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    marginRight: '10px',
  },
  formField: {
    marginBottom: '15px',
  },
  formInput: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  formLabel: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  }
}));

export default function Teamsettings() {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [twitter, setTwitter] = useState('');
  const [role, setRole] = useState('');
  const [ig, setIg] = useState('');
  const [gmail, setGmail] = useState('');
  const [projects, setProjects] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    // Load team members for the list
    const fetchTeamMembers = () => {
      const teamRef = firebase.database().ref('/teammembers');
      teamRef.on('value', (snapshot) => {
        const members = snapshot.val();
        if (members) {
          const membersArray = Object.keys(members).map(key => ({
            id: key,
            ...members[key]
          }));
          setTeamMembers(membersArray);
        }
      });
    };

    fetchTeamMembers();
    return () => {
      firebase.database().ref('/teammembers').off();
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setIg('');
    setTwitter('');
    setGmail('');
    setProjects('');
    setImageUrl('');
    setImage('');
  };

  const upload = () => {
    if (image === null || image === '') {
      return;
    }

    firebase.storage().ref(`/images/${image.name}`).put(image)
      .on("state_changed", 
        () => console.log("Upload in progress"), 
        (error) => console.error("Error uploading image:", error), 
        () => {
          // Getting Download Link
          firebase.storage().ref("images").child(image.name).getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              
              // Add new team member
              firebase.database().ref('/teammembers').push({
                imageUrl: url,
                name,
                role,
                ig,
                twitter,
                gmail,
                projects
              }).then(() => {
                handleClick(); // Show success message
                resetForm();
              }).catch(error => {
                console.error("Error adding team member:", error);
              });
            });
        }
      );
  };

  const handleEditClick = (member) => {
    setCurrentMember(member);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentMember(null);
  };

  const handleEditSave = () => {
    if (!currentMember) return;
    
    firebase.database().ref(`/teammembers/${currentMember.id}`).update({
      name: currentMember.name,
      role: currentMember.role,
      ig: currentMember.ig,
      twitter: currentMember.twitter,
      gmail: currentMember.gmail,
      projects: currentMember.projects
    })
      .then(() => {
        handleClick(); // Show success message
        handleEditClose();
      })
      .catch(error => {
        console.error("Error updating team member:", error);
      });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      firebase.database().ref(`/teammembers/${id}`).remove()
        .then(() => {
          handleClick();
        })
        .catch(error => {
          console.error("Error deleting team member:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember({
      ...currentMember,
      [name]: value
    });
  };

  const isInvalid =
    ig === "" ||
    role === "" ||
    name === "" ||
    gmail === "" ||
    !imageUrl ||
    twitter === "";

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
        message="Changes successfully uploaded"
        action={
          <div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
      <br />
      <div className='adminform'>
        <div className={classes.formSection}>
          <h1>Upload Team Member</h1>
          <div className={classes.formField}>
            <label className={classes.formLabel}>Image:</label>
            <input 
              accept="image/*" 
              type="file" 
              onChange={(e) => { setImage(e.target.files[0]) }} 
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Name:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter fullname' 
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Role:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter role' 
              value={role}
              onChange={(e) => { setRole(e.target.value) }}
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Projects:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter projects (e.g. Fanta ad, Rooted, Vanilla ad)' 
              value={projects}
              onChange={(e) => { setProjects(e.target.value) }}
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Instagram link:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter Instagram link' 
              value={ig}
              onChange={(e) => { setIg(e.target.value) }}
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Gmail:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter Gmail address' 
              value={gmail}
              onChange={(e) => { setGmail(e.target.value) }}
            />
          </div>
          
          <div className={classes.formField}>
            <label className={classes.formLabel}>Twitter link:</label>
            <input 
              type="text" 
              className={classes.formInput}
              placeholder='Enter Twitter link' 
              value={twitter}
              onChange={(e) => { setTwitter(e.target.value) }}
            />
          </div>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={upload} 
            disabled={isInvalid}
          >
            Submit
          </Button>
        </div>

        <div className={classes.memberList}>
          <h2>Manage Team Members</h2>
          <List>
            {teamMembers.map(member => (
              <ListItem key={member.id} className={classes.memberItem}>
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className={classes.memberImage}
                />
                <ListItemText 
                  primary={`${member.name} - ${member.role}`} 
                  secondary={`Projects: ${member.projects || 'None'}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Team Member</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {currentMember && (
            <div>
              <div className={classes.formField}>
                <label className={classes.formLabel}>Name:</label>
                <input
                  type="text"
                  name="name"
                  className={classes.formInput}
                  value={currentMember.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={classes.formField}>
                <label className={classes.formLabel}>Role:</label>
                <input
                  type="text"
                  name="role"
                  className={classes.formInput}
                  value={currentMember.role || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={classes.formField}>
                <label className={classes.formLabel}>Projects:</label>
                <input
                  type="text"
                  name="projects"
                  className={classes.formInput}
                  value={currentMember.projects || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. Fanta ad, Rooted, Vanilla ad"
                />
              </div>
              
              <div className={classes.formField}>
                <label className={classes.formLabel}>Instagram Link:</label>
                <input
                  type="text"
                  name="ig"
                  className={classes.formInput}
                  value={currentMember.ig || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={classes.formField}>
                <label className={classes.formLabel}>Gmail:</label>
                <input
                  type="text"
                  name="gmail"
                  className={classes.formInput}
                  value={currentMember.gmail || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={classes.formField}>
                <label className={classes.formLabel}>Twitter Link:</label>
                <input
                  type="text"
                  name="twitter"
                  className={classes.formInput}
                  value={currentMember.twitter || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={classes.formField}>
                <p>Current Image:</p>
                <img 
                  src={currentMember.imageUrl} 
                  alt={currentMember.name} 
                  style={{ maxWidth: '100px', maxHeight: '100px' }} 
                />
                <p>To change the image, you'll need to create a new team member entry.</p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}