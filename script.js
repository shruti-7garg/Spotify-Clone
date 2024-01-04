console.log("welcome to spotify");

//initialize the variables

let songindex=0;   // initial song play=0
let audioElement= new Audio('1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songitems= Array.from(document.getElementsByClassName('songitems'));
let mastersongName= document.getElementById('mastersongName');


//array of songs
let songs=[
    {songName:"Phir aur Kya Chahiye" , filePath:"songs/1.mp3" ,coverPath:"covers/1.jpg"},
    {songName:"Thumka song" , filePath:"songs/2.mp3" ,coverPath:"covers/2.png"},
    {songName:"Jhoome jo pathan" , filePath:"songs/3.mp3" ,coverPath:"covers/3.png"},
    {songName:"Apna bna le piya" , filePath:"songs/4.mp3" ,coverPath:"covers/4.png"},
    {songName:"Tere vaste falak se" , filePath:"songs/5.mp3" ,coverPath:"covers/5.png"},
    {songName:"Jugnu by Badshah" , filePath:"songs/6.mp3" ,coverPath:"covers/6.png"},
    {songName:"Kala chashma" , filePath:"songs/7.mp3" ,coverPath:"covers/7.png"}
]

songitems.forEach((element,i)=>{

element.getElementsByTagName("img")[0].src= songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})


// Handle elements pause/play click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})


// listen to events

//time k sath song ki line update hogi
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
//update seekbar
progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
console.log(progress);
myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})

// making a function to make rest all buttons play 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
// if any of play button is clicked from list of songs then-
Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        songindex=parseInt(e.target.id);
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songindex+1}.mp3`;
        mastersongName.innerText= songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity= 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

// foe next and previous button
document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=6){
        songindex= 0;
    }
    else{
        songindex+= 1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongName.innerText= songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
       if(songindex<=0){
        songindex = 0
       }
       else{
        songindex-=  1;
       }
       audioElement.src=`songs/${songindex+1}.mp3`;
       mastersongName.innerText= songs[songindex].songName;
       audioElement.currentTime=0;
       audioElement.play();
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');
})
