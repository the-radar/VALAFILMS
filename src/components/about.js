import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from "react-infinite-scroll-component";
import firebase from './firebase'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    animation: `$zoomIn 0.5s ease-in-out`,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
  '@keyframes zoomIn': {
    '0%': {
      transform: 'scale(0.5)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

export default function About () {
  const classes = useStyles();
  const [items, setItems] = React.useState();
  const [hasMore, setHasMore] = React.useState(true);
  const [myArray, setMyArray] = React.useState([]);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  var count = 0;

  const fetchMoreData = () => {
    count++;
    if (count === myArray.length) {
      setHasMore(false);
      return;
    }
  };

  const convert = (it) => {
    const arrayResult = Object.keys(it).map(room => {
      return { id: room, name: it[room] };
    });
    console.log(arrayResult);
    setMyArray(arrayResult);
  };

  const loadContent = () => {
    const todoRef = firebase.database().ref('/teammembers');
    todoRef.on('value', (snapshot) => {
      setItems(snapshot.val());
      console.log(snapshot.val());
      convert(snapshot.val());
    });
  };

  React.useEffect(() => {
    async function anyNameFunction() {
      await loadContent();
    }
    anyNameFunction();
  }, []);

  const handleClickOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="teampage">
      <div className="teamtext">
        <h1>OUR TEAM</h1>
        <br />
        <p>Here at ValaFilms, our people are our greatest asset. Collaboration is a big
          part of our culture and we have a team of young, talented and passionate
          creatives who bring fresh perspectives and infectious energy to actualize
          impactful projects.
          Our emphasis on teamwork and embracing diversity of opinions and
          voices, encouraging independent thinking and innovation, gives us the
          platform to grow as story tellers. We align expertise and experience with
          knowledge, empower creative talent and strive to approach our work in a
          fun and stimulating manner.
          Our goal is to develop stories that push boundaries, entertain and create
          lasting social and cultural impact. We believe that together we can shape
          and define the future of media in Africa.</p>
      </div>
      <div className="teammembers">
        <InfiniteScroll
          dataLength={myArray.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4></h4>}
          height={"80vh"}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>...</b>
            </p>
          }
        >
          {!!myArray && myArray.map((member, index) => (
            <div className="teamcontent" key={index} onClick={() => handleClickOpen(member)}>
              <img src={member.name.imageUrl} alt="" width="300" height="420" />
              <h4>{`${member.name.name} : ${member.name.role} `}</h4>
              <div className="ics">
                <div className='lk'>
                  {!!member.name.fb && <a href={member.name.fb} target="_blank" className="fa fa-facebook"></a>}
                  {!!member.name.tw && <a href={member.name.tw} target="_blank" className="fa fa-twitter"></a>}
                  {!!member.name.ggl && <a href={member.name.ggl} target="_blank" className="fa fa-google"></a>}
                  {!!member.name.ytb && <a href={member.name.ytb} target="_blank" className="fa fa-youtube"></a>}
                  {!!member.name.ig && <a href={member.name.ig} target="_blank" className="fa fa-instagram"></a>}
                  {!!member.name.ln && <a href={member.name.ln} target="_blank" className="fa fa-linkedin"></a>}
                </div>
              </div>
              <br />
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className={classes.dialogContent}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {selectedMember && (
            <>
              <img src={selectedMember.name.imageUrl} alt="" width="300" height="420" />
              <h4>{`${selectedMember.name.name} : ${selectedMember.name.role} `}</h4>
              <p>{selectedMember.name.about}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: '#9f7036'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);