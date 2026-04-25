// parses duration like: '2m12', '2m12s', '200s', '200'
// outputs the duration in seconds
function simpleDurationParsing(duration) {
  duration = duration.toLowerCase();

  var seconds = 0;
  var index = 0;

  // minutes
  if ((index = duration.indexOf('m')) > -1) {
    seconds += parseInt(duration.substring(0, index)) * 60;
    duration = duration.substr(index + 1);
  }

  // seconds
  if ((index = duration.indexOf('s')) > -1)
    duration = duration.substring(0, index);

  if (duration.length)
    seconds += parseInt(duration);

  return seconds;
}


/* Music 
======================================*/
var player__song = [
  {
    "song"    : "PEMBUKA",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/pembuka.mpeg?v=1730440627445",
  },
   {
    "song"    : "PENUTUP",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/penutup.mpeg?v=1730440627924"
  },
  {
    "song"    : "KEBERANGKATAN KERETA",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/keberangkatan%20kereta.mpeg?v=1730440639116"
  },
  {
    "song"    : "KEDATANGAN KERETA",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/kedatangan%20kereta.mpeg?v=1730440649401"
  },
  {
    "song"    : "INSTRUMENTAL ALOSI RIPOLO RUA",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/instrumen%20alosi%20ripolo%20dua.mpeg?v=1730440670327"
  },
 
  {
    "song"    : "INSTRUMENTAL ANGING MAMMIRI",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/instrumen%20angin%20mamiri.mpeg?v=1730440684103"
  },
  {
    "song"    : "INSTRUMENTAL INDO LOGO",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/instrumen%20indologo.mpeg?v=1730440672677"
  },
  {
    "song"    : "INSTRUMENTAL INNINAWA SABBARAE",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/instrumen%20inninawa%20sabbarae.mpeg?v=1730440684103"
  },
  {
    "song"    : "INSTRUMENTAL MUSIK DAERAH MAKASSAR",
    "artist"  : "BPKASS",
    "artwork" : "https://cdn.glitch.global/66b434e3-fc66-46ed-8118-f2417933f32c/BPKA-LOGO.jpeg?v=1730518763717",
    "mp3"     : "https://cdn.glitch.me/66b434e3-fc66-46ed-8118-f2417933f32c/INSTRUMENTAL%20MUSIK%20DAERAH%20MAKASSAR.mp3?v=1730440731812"
  }
];

"use strict";
// add elemnts
const bgBody = ["#000000", "#ffffff", "#11FC00", "#FF0000", "#f5eda6", "#8e8e8e", "#dcf3f3", "000000", "ffffff"];
const body = document.body;
const player = document.querySelector(".player");
const playerHeader = player.querySelector(".player__header");
const playerControls = player.querySelector(".player__controls");
const playerPlayList = player.querySelectorAll(".player__song");
const playerSongs = player.querySelectorAll(".audio");
const playButton = player.querySelector(".play");
const nextButton = player.querySelector(".next");
const backButton = player.querySelector(".back");
const playlistButton = player.querySelector(".playlist");
const slider = player.querySelector(".slider");
const sliderContext = player.querySelector(".slider__context");
const sliderName = sliderContext.querySelector(".slider__name");
const sliderTitle = sliderContext.querySelector(".slider__title");
const sliderContent = slider.querySelector(".slider__content");
const sliderContentLength = playerPlayList.length - 1;
const sliderWidth = 100;
let left = 0;
let count = 0;
let song = playerSongs[count];
let isPlay = false;
let isPplay = true;
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
const playIcon = playButton.querySelector("img[alt = 'play-icon']");
const progres = player.querySelector(".progres");
const progresFilled = progres.querySelector(".progres__filled");
let isMove = false;
// creat functions

function openPlayer() {
playerHeader.classList.add("open-header");
playerControls.classList.add("move");
slider.classList.add("open-slider");
}
function closePlayer() {
playerHeader.classList.remove("open-header");
playerControls.classList.remove("move");
slider.classList.remove("open-slider");
}
function next(index) {
count = index || count;
if (count == sliderContentLength) {
return;
}
left = (count + 1) * sliderWidth;
left = Math.min(left, (sliderContentLength) * sliderWidth);
sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
count++;
run();
}
function back(index) {
count = index || count;
if (count == 0) {
count = count;
return;
}
left = (count - 1) * sliderWidth;
left = Math.max(0, left);
sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
count--;
run();
}
function changeSliderContext() {
sliderContext.style.animationName = "opacity";
sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
if (sliderName.textContent.length > 16) {
const textWrap = document.createElement("span");
textWrap.className = "text-wrap";
textWrap.innerHTML = sliderName.textContent + " " + sliderName.textContent;
sliderName.innerHTML = "";
sliderName.append(textWrap);
}
if (sliderTitle.textContent.length >= 18) {
const textWrap = document.createElement("span");
textWrap.className = "text-wrap";
textWrap.innerHTML = sliderTitle.textContent + " " + sliderTitle.textContent;
sliderTitle.innerHTML = "";
sliderTitle.append(textWrap);
}
}
function changeBgBody() {
body.style.backgroundColor = bgBody[count];
}
function selectSong() {
song = playerSongs[count];
for (const item of playerSongs) {
if (item != song) {
item.pause();
item.currentTime = 1;
}
}
if (isPlay) song.play();
}
function run() {
changeSliderContext();
changeBgBody();
selectSong();
}
function playSong() {
if (song.paused) {
song.play();
playIcon.style.display = "none";
pauseIcon.style.display = "block";
}else{
song.pause();
isPlay = false;
playIcon.style.display = "";
pauseIcon.style.display = "";
}
}
function progresUpdate() {
const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
progresFilled.style.width = progresFilledWidth;
if (isPlay && this.duration == this.currentTime) {
next();
return
}
if (count == sliderContentLength && song.currentTime == song.duration) {
playIcon.style.display = "block";
pauseIcon.style.display = "";
isPlay = false;
}
}
function scurb(e) {
// If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
const currentTime = ( (e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth ) * song.duration;
song.currentTime = currentTime;
}
function durationSongs() {
let min = parseInt(this.duration / 60);
if (min < 10) min = "0" + min;
let sec = parseInt(this.duration % 60);
if (sec < 10) sec = "0" + sec;
const playerSongTime = `${min}:${sec}`;
this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
}
changeSliderContext();
// add events
sliderContext.addEventListener("click", openPlayer);
sliderContext.addEventListener("animationend", () => sliderContext.style.animationName ='');
playlistButton.addEventListener("click", closePlayer);
nextButton.addEventListener("click", () => {
next(1)
});
backButton.addEventListener("click", () => {
back(1)
});
playButton.addEventListener("click", () => {
isPlay = false;
playSong();
});
playerSongs.forEach(song => {
song.addEventListener("loadeddata" , durationSongs);
song.addEventListener("timeupdate" , progresUpdate);
});
progres.addEventListener("pointerdown", (e) => {
scurb(e);
isMove = true;
});
document.addEventListener("pointermove", (e) => {
if (isMove) {
scurb(e);
song.muted = true;
}
});
document.addEventListener("pointerup", () => {
isMove = false;
song.muted = false;
});
playerPlayList.forEach((item, index) => {
item.addEventListener("click", function() {
if (index > count) {
next(index - 1);
return;
}
if (index < count) {
back(index + 1);
return;
}
});
});