const songs=[
  
    {
        artistName: "Fireboy DML",
        songName:"Sofri",
        img:"images/Fireboy-DML-EP.webp",
        music:"music/Sofri.mp3"
    },
    {
        artistName: "Ruger",
        songName:"Girlfriend",
        img:"images/Ruger-EP.webp",
        music:"music/Girlfriend.mp3"
    },
    {
        artistName: "Zinoleesky",
        songName:"Loving-You",
        img:"images/Zinoleesky-Loving-You-Artwork.jpg",
        music:"music/Loving-You.mp3"
    },
  
];



//select items
let songimg=document.querySelector("#songimg")
let songtitle=document.querySelector("#songname")
let songartist=document.querySelector("#songartist")
let  playbtn=document.querySelector("#playbtn")
let nextbtn=document.querySelector("#nextbtn")
let prevbtn=document.querySelector("#prebtn")
const currentMins= document.querySelector("#current_time_mins");
const currentSecs= document.querySelector("#current_time_secs");
const trackmins= document.querySelector("#track_mins");
const tracksecs= document.querySelector("#track_secs");
let volslider=document.querySelector("#volslider")
let trackseek=document.querySelector('#progress');

let currtrack=document.createElement("audio")

document.getElementById('artistbtn').addEventListener('click', showlist);


// global variables
let data;
let num=0;
let isPlaying= false;
let trackIndex= 0;
setInterval(fulltime,1000);
console.log("hello")

function loadTrack(trackIndex){
    console.log(songs[trackIndex].artistName)
    currtrack.src= songs[trackIndex].music;
    currtrack.load();
    
   
    songimg.src= songs[trackIndex].img;
    songartist.textContent= songs[trackIndex].artistName;
    songtitle.textContent= songs[trackIndex].songName;
   
     volume();
};

loadTrack(trackIndex);

function next(){
    if(trackIndex>=songs.length-1){
        trackIndex=0;
    }else{
        trackIndex++
    }
    loadTrack(trackIndex);
    play();
};
function prev(){
    if(trackIndex<=0){
        trackIndex=songs.length-1;
    }else{
        trackIndex--
    }
    loadTrack(trackIndex);
    play();
};
function fulltime(){
     console.log(currtrack.duration,"duration");
    const mins=String(Math.floor((currtrack.duration)/60)).padStart(2,"0");
    const secs=String(Math.floor(currtrack.duration-(mins*60))).padStart(2,"0");

    const currMins=String(Math.floor((currtrack.currentTime)/60)).padStart(2,"0");
    const currSecs=String(Math.abs(Math.floor((currMins*60)-currtrack.currentTime))).padStart(2,"0");

    trackmins.textContent=mins;
    tracksecs.textContent=secs;
    currentMins.textContent= currMins;
    currentSecs.textContent=currSecs;
    


    trackseek.max=currtrack.duration;
    trackseek.value=currtrack.currentTime;


    if(currtrack.ended){
        next();
    };
};

function play_pause(){
    console.log("hello");
    isPlaying? pause() : play();
};

function play(){
    isPlaying= true;
    currtrack.play();
    playbtn.src=" Images/albumCovers/pause.png"
  
};
function pause(){
    isPlaying= false;
    currtrack.pause();
    playbtn.src="Images/albumCovers/playbutton.png"
   
};

function volume(){
    console.log(volslider.value,"volume");
    currtrack.volume=volslider.value/100;
};


function seek(){
    currtrack.currentTime=trackseek.value;
};


// show list function
function showlist(){
    console.log("songsss")
    songs.map((obj)=>{
     num=num+1;
         const {songName,img}=obj;
       
        
       data =  ` <div class="aside-content">
         <div class="sequence">${num}</div>
         <div class="album-cover"><img src="${img}" alt="album cover"></div>
         <div class="song-title"> <a href="#"> ${songName} </a></div>
         <div class="favorite-icon"> <a href="#"><i class="material-icons">favorite</i></a></div>
     </div>`

     const asideSection = document.querySelector('#aside-section');

// Create a new div element
const divElement = document.createElement('div');

// Set the innerHTML of the new div element to the data template literal
divElement.innerHTML = data;

// Append the new div element to the aside section
asideSection.appendChild(divElement);
    
})

    
 
}

showlist();


