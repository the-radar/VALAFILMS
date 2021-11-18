import React from 'react'
import img1 from "../files/Guzape1.jpeg"
import img2 from "./ololcover.png"
import img3 from "./Seun.jpg"
import img4 from "./Saraya.jpg"
import img5 from "./Chavala.jpg"
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from "react-infinite-scroll-component";
import firebase from './firebase'

export default function About () {
  const [items,setitems]=React.useState()
   const [hasMore,sethasmore]= React.useState(true)
   
   const [myarray,setmyarray]=React.useState([])
   var count=0;
  const fetchMoreData = () => {
    count++
    if (count == myarray.length) {
      sethasmore(false );
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
   
  };
  const convert=(it)=>{
   
const arrayResult = Object.keys(it).map(room => {
    return {id: room, name: it[room]} 
});
console.log(arrayResult)
setmyarray(arrayResult)
  }
  const loadContent = () => {
    const todoRef = firebase.database().ref('/teammembers');
    todoRef.on('value', (snapshot) => {
      setitems(snapshot.val())
    console.log(snapshot.val())
convert(snapshot.val())

    });
  }

  React.useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await loadContent();
    }
    // Execute the created function directly
    anyNameFunction();
    

  }, []);
  return (
      <div className="teampage">
<div className="teamtext">
<h1>OUR TEAM</h1>
<br />
      
<p>Here at Vala Films, our people are our greatest asset. Collaboration is a big
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
        <div className="teammembers ">
        <InfiniteScroll
          dataLength={myarray.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4></h4>}
          height={500}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>...</b>
            </p>
          }
        >
         {!!myarray&& myarray.map((member, index) => (
            <div className="teamcontent">
            <img src={member.name.imageUrl} alt="" width="300"  />
            <h4>{`${member.name.name} : ${member.name.role} `}</h4>
           <div className="ics">
           <div className='lk'>
       {!!member.name.fb && <a href={member.name.fb} className="fa fa-facebook"></a>}
      { !!member.name.tw &&<a href={member.name.tw} className="fa fa-twitter"></a>}
       {!!member.name.ggl &&<a href={member.name.ggl} className="fa fa-google"></a>}
       {!!member.name.ytb &&<a href={member.name.ytb} className="fa fa-youtube"></a>}
       {!!member.name.ig &&<a href={member.name.ig} className="fa fa-instagram"></a>}
       {!!member.name.ln && <a href={member.name.ln} className="fa fa-linkedin"></a>}

       
       
       </div></div>
           <br />
            </div>
          ))}
        </InfiniteScroll>
    

     
     
    </div>
    </div>
    )
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