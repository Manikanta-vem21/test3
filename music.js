let n=document.querySelectorAll(".cell").length;
let index=0;
let timeDuration=document.getElementById("Duration");
let songInside;//to get the song name from the button
let currentSong;
let currentMusic;
let imgInside;
let DownSlider=document.getElementById("downProgress");
let progbar=document.getElementById("progBar");
let slider=document.getElementById("pro");
let clicks=0;
let SongList=[
'NEFFEX - Go!',
'Days For Tomorrow — Metro Vice',
'Down For Anything',
'Lost Sky - Fearless',
'FAVHELLA',
'NIVIRO - Orphic Night',
'Shiah Maisel and Clarx - Done Better',
'Shiah Maisel_Clarx - Everything I Got',
'Thymen Wiendels - Erased',
'Unknown Brain - Perfect 10',
'Unknown Brain - Superhero'

];
let color=[
  'rgba(75, 184, 25, 0.473)',
  'rgba(192, 60, 60, 0.774)',
  'rgba(59, 76, 231, 0.774)',
  'rgba(231, 59, 231, 0.842)',
  'rgba(203, 230, 52, 0.815)',
  'rgba(27, 236, 226, 0.815)',
  'rgba(247, 139, 15, 0.815)',
  'rgba(181, 247, 0, 0.815)',
  'rgba(0, 16, 247, 0.705)',
  'rgba(92, 37, 97, 0.863)',
  'rgba(255, 255, 255, 0.863)'
];
let artistName=[
  'NEFFEX',
  'Audio Library Release',
   'NCS - Copyright Free Music',
  'feat. Chris Linton NCS - Copyright Free Music',
  'feat. Mc Guidanny Brazilian Phonk NCS - Copyright Free Music',
  'feat. Diandra Faye NCS - Copyright Free Music',
  'feat. AViVA NCS - Copyright Free Music',
  'NCS - Copyright Free Music',
  'ft. Barmuda NCS Arcade',
  'feat. Heather Sommer NCS - Copyright Free Music',
  'feat. Chris Linton NCS - Copyright Free Music', 
];
//console.log(SongList[3]);
let time=document.getElementById("time");
let mainImage=document.getElementById("mainImg");

//to assign eventListener to all the buttons
for(let b=0;b<n;b++)
{
    document.querySelectorAll(".cell")[b].addEventListener("click",fromButtons);
}



//function to get songName from the buttons
 function fromButtons()
 {
  songInside=this.querySelector(".songname").innerHTML;
  playMusic(songInside);
  this.classList.add("playing");
  console.log(songInside);
 }



//Function to play the next song by using Forward button
let next=document.getElementById("nextBtn");
next.addEventListener('click',nextSong);
function nextSong()
{
if(index<SongList.length-1)
{
  index++;
  next.style.backgroundColor="rgb(255, 255, 255)";
  songInside=SongList[index];
  playMusic(songInside);
}
if(index==SongList.length-1)
{
  next.style.backgroundColor="rgba(245, 241, 241, 0.658)";
}
}





//function to play the previous song using backward button
let prev=document.getElementById("prevBtn");
prev.addEventListener('click',previousSong);


function previousSong()
{
  if(index>0)
  {
   
    index--;
    songInside=SongList[index];
    playMusic(songInside);
  }
  
}

var element = document.getElementById('show');


/////////////////////////////////////////////////////////////////////////////////////////////
function playMusic()// to play the music
{
   clicks++;// to display the advertisment

 
    for(let b=0;b<n;b++)//to remove the background color of all buttons 
    {
    
    document.querySelectorAll(".cell")[b].classList.remove("playing");
    }

  // to assign the recieved songName to the index from Buttons or backward/forward buttons  
  for(let j=0;j<SongList.length;j++)
  {
    if(songInside==SongList[j])
    {
      index=j;
    }
  }


  SetArtistName(index); //set the artist name from index
  changeColor(index); // set the background color from index 
  

   stopSong();//To stop the song
    
   songPath="songs/"+songInside+".mp3";// gives the song path by using SongInside
   
   let audio=new Audio(songPath);
   currentSong=audio; // audio is assigned to currentSong , used to stop and various functions


    audio.onloadedmetadata=function()//To load the audio time and duration on top the ProgressBar
    {
      progbar.max=audio.duration;
      progbar.value=audio.currentTime;  
      //slider.style.maxWidth=audio.duration;
      DownSlider.max=audio.duration;
      DownSlider.value=audio.currentTime;
      
      let durationSpan=audio.duration;
      timeDuration.innerHTML=DurationTime(durationSpan);
      function DurationTime(durationSpan) {
        var minutes = Math.floor(durationSpan/ 60);
        var seconds = Math.floor(durationSpan % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + seconds;
    }
    }

    audio.play(); // plays the audio

    if(clicks==6)// to display the Ad
    {
      currentSong.pause(); // pause the current playing song when ad is started
      advertisment();// displays the Advertisment
      clicks=0;// re-assignes the clicks to 0, so that again the add can be played after playing 6 songs
    }

   showControl();// to show the bottom panel when an audio is playing
   
   function stopSong() //To stop current Music when next song is clicked
   {
      if(currentSong)
      {
        currentSong.pause();
        currentSong.currentTime=0;
       }
    }


  function showControl()//to update the control panel
    {
    element.style.visibility = 'visible';
    let imgInside="images/"+songInside+".jpeg";
    
    document.getElementById("btmname").innerHTML=songInside;
    let bottomImg=document.getElementById("btmImg");
    bottomImg.setAttribute("src",imgInside);
    
    mainImage.setAttribute("src",imgInside);

    let nowPlayingSongName=document.getElementById("playingSongName");// refers the song name on screen controls
    nowPlayingSongName.innerHTML=songInside;

    }

    if(currentSong)// to update the Progress Bar //audio.play or currentSong.play()
     {
        setInterval(()=>{
        progbar.value=currentSong.currentTime;
        //slider.style.width=progbar.value+"%";
        //slider.style.maxWidth=progbar.value;
        DownSlider.value=currentSong.currentTime;
        let present=currentSong.currentTime;
        time.innerHTML=formatTime(present);
        function formatTime(present) {// for the time display
          var minutes = Math.floor(present/ 60);
          var seconds = Math.floor(present % 60);
          seconds = seconds < 10 ? '0' + seconds : seconds;
          return minutes + ':' + seconds;
      }
        },1000);
        
     }
//TO change the progbar and to play the auido from that position
    progbar.onchange=function(){
        currentSong.play();
        currentSong.currentTime=progbar.value;
        
     }
    
     
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
let toFullscreen=document.getElementById("controlBtm");
let screenControls=document.getElementById("onScreenControls");
toFullscreen.addEventListener("click",displayOnFullscreen);

// function to display the controls on full screen when it is clicked on bottom cell
function displayOnFullscreen()
{
  //element.style.visibility = 'hidden';
screenControls.style.visibility="visible";// to show the onscreen controls

}
//////////////////////////////////////////////////////////////////////////////////////////////////////

//to go back to Home page when clicked on back arrow

let backToHomePage=document.getElementById("back");
backToHomePage.addEventListener('click',goBackToHome);
  //Function to go back to home page when aroow is clicked

function goBackToHome()
{
    screenControls.style.visibility="hidden"; //to hidden the screenControls
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

 //TO stop the audio when button is clicked

let stopButton=document.getElementById("stopBtn");
stopButton.addEventListener('click',pauseSong);
 //finction to pause the song 
 stopButton.innerHTML="stop";
function pauseSong()
{   
    if(stopButton.innerHTML=="stop")
    {
        stopButton.innerHTML="play";
    if(currentSong)
      {
        currentSong.pause();
       
    }
    }
    else{
        currentSong.play();
        stopButton.innerHTML="stop";
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
 //function to change the background color 
function changeColor()
{
  if(index<=SongList.length-1 && index >=0)
  {
    mainImage.style.boxShadow = "0px 0px 2000px " + color[index];
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
  //function to set Artist name on the screen
let setArtist=document.getElementById("artistName");
function SetArtistName(){
  if(index<=SongList.length-1 && index >=0)
  {
    setArtist.innerHTML=artistName[index];
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
  //function to display the advertisment
let AdprogressBar=document.getElementById("adProgress");
let addisplay=document.getElementById("AdsContainer");
let video=document.getElementById("myVideo");
let abtAdBtn=document.getElementById("abtAd");
 function advertisment()
 {
  AdprogressBar.max=video.duration;
  AdprogressBar.value=video.currentTime;
  addisplay.style.visibility="visible";
  abtAdBtn.style.visibility="visible";
  video.play();
  setInterval(()=>{
    AdprogressBar.value=video.currentTime;
  },5);
  function stopAd()
  {
  video.pause();
  video.currentTime=0;
  abtAdBtn.style.visibility="hidden";
  addisplay.style.visibility="hidden";
  currentSong.play();
  }
  setTimeout(stopAd,21000);
  clicks=0;
}
