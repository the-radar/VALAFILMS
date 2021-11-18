import {React,useEffect,useState} from 'react'
import firebase from "./firebase"
import Upload from "./upload"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Addteam from './addteam'

export default function Admin() {

    const HOMEPAGE_VID_URL=firebase.database().ref()
    const [home,sethome]=useState()
    const [ad,setad]=useState()
    const [collab,setcollab]=useState()
    const [film,setfilm]=useState()
   const[filmsettings,setfilms]=useState(false)
   const[homesettings,sethomes]=useState(true)
   const[adsettings,setads]=useState(false)
   const[collabsettings,setcollabs]=useState(false)
   const [open, setOpen] = useState(false);
   const[membersettings,setmembers]=useState(false)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
            <h1 style={{color:"white",textAlign:"center"}}>welcome admin</h1>
            <h3 onClick={()=>{window.location.href="/"}}className="hib">Back to Home</h3>
            <div className="adcon">
                <h3 onClick={()=>{setfilms(false);setads(false);sethomes(true);setcollabs(false);setmembers(false)}} className="hib">SHOW HOMEPAGE SETTINGS</h3>
              {homesettings &&  <div className="set">
                    <form action="">
                    <label htmlFor="p1">videolink</label>
                    <input type="text" name='p1'required onChange={(e)=>{
sethome(e.target.value)

                    }}/>
                    <button type='submit' onClick={()=>{
firebase.database().ref('/vala/settings/homepage/landingvideo').set(home).then(()=>{
    handleClick()
})



                    }}>upload</button>
                    </form>
                   
                </div>}
                <h3 onClick={()=>{setfilms(false);setads(false);sethomes(false);setcollabs(false);setmembers(true)}} className="hib">SHOW TEAM-MEMBERS SETTINGS</h3>
              {membersettings && <Addteam/> }
                <h3 onClick={()=>{setfilms(true);setads(false);sethomes(false);setcollabs(false);setmembers(false)}}className="hib">SHOW FILM PAGE SETTINGS</h3>
              { filmsettings && <div className="set">
                    <div>
                    <form action="">
                    <label htmlFor="p2">videolink</label>
                    <input type="text" name='p2' required  onChange={(e)=>{
setfilm(e.target.value)

                    }}/>
                    <button type='submit' onClick={()=>{
firebase.database().ref('/vala/settings/film/landingvideo').set(film).then(()=>{
    handleClick()
})



                    }} >upload</button>
                    </form>
                    </div>
                   
                    <div>
                        <h3>ADD NEW SLIDE</h3>
                        <Upload path="filmpages"/>
                  

                    </div>
                   
                </div>}
                <h3 onClick={()=>{setfilms(false);setads(false);sethomes(false);setcollabs(true);setmembers(false)}}className="hib">SHOW COLLAB PAGE SETTINGS</h3>
                { collabsettings &&<div className="set">
                    <div>
                    <form action="">
                    <label htmlFor="p2">videolink</label>
                    <input type="text" name='p2'required  onChange={(e)=>{
setcollab(e.target.value)

                    }}/>
                    <button type='submit' onClick={()=>{
firebase.database().ref('/vala/settings/collab/landingvideo').set(collab).then(()=>{
    handleClick()
})



                    }}>upload</button>
                    </form>
                    </div>
                   
                    <div>
                        <h3>ADD NEW SLIDE</h3>
                        <Upload path="collab"/>
                  

                    </div>
                   
                </div>}
                <h3 onClick={()=>{setfilms(false);setads(true);sethomes(false);setcollabs(false);setmembers(false)}}className="hib">SHOW AD PAGE SETTINGS</h3>
                {adsettings && <div className="set">
                    <div>
                    <form action="">
                    <label htmlFor="p2">videolink</label>
                    <input type="text" name='p2' required  onChange={(e)=>{
setad(e.target.value)

                    }}/>
                    <button type='submit'onClick={()=>{
firebase.database().ref('/vala/settings/ads/landingvideo').set(ad).then(()=>{
    handleClick()
})



                    }}>upload</button>
                    </form>
                    </div>
                   
                    <div>
                        <h3>ADD NEW SLIDE</h3>
                        <Upload path="ad"/>
                  

                    </div>
                   
                </div>}
            </div>
        </div>
        </div>
    )
}
