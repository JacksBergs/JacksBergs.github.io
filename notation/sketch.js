// New Project
// Jack Tennent-Ethier
// Input songs from youtube, type in the song and then there will be some 3D art that will bounce according to the decibles of the noise
// p5 js sound area to look at
//Making two dimensional right now until I can figure out how to input 3D models
//maybe use norm
// trigger on bass and treble
//p5 sound reference
//if key is pressed do a function in which it starts the audio
//gain


let terrain = [];
const NUMBER_OF_RECTS = 1000;
let music;
let amp;
let cnv;
let level;
let clicked = false;


function preload(){
  music = loadSound("magic.mp3");
}



function setup() {
  cnv = createCanvas(windowWidth, windowHeight); 
  let howWide = width/NUMBER_OF_RECTS;
  generateTerrain(howWide);
  amp = new p5.Amplitude();
  music.connect(amp);

}

function draw() {
  background(220);
  clicker();
  sounding();
  music.onended(texty);
  // https://p5js.org/reference/p5.sound/p5.Amplitude/

}


function clicker(){
  if (clicked){
    displayterrain();
  }
}

function displayterrain(){
  for (let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function sounding(){
  let level = amp.getLevel();
  level = map(level, 0, 1, 0, height);
  for (let i = 0; i < terrain.length; i++){
    if (terrain.length % 2){
      terrain[i].y = height - level;
      terrain[i].h = height;
    }
    else{
      terrain[i].y = height - level;
      terrain[i].h = level;
    }
  }
}


function generateTerrain(theWidth) {
  let time = 0;
  let deltaTime = 0.01;
  for (let x = 0; x < width; x += theWidth){
    let theHeight = noise(time) * height;
    let someRect = spawnRectangle(x, theHeight, theWidth);
    terrain.push(someRect);
    time += deltaTime;
  }
}

function spawnRectangle(leftSide, rectHeight, rectWidth){
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}

function startAudio(){
  // you would do something like bgmusic.getLevel(){ to start do bgmusic.play
  // calculate the terrain and how high it gets, MAKE THEM SEPERATE
  if (!music.isPlaying()){
    music.play();
  }
}

function keyPressed(){
  if (keyCode === 32){
    startAudio();
    clicked = true;
  }
}

function texty(){
  clicked = false;
  background(220);
  textAlign(CENTER);
  textSize(100);
  text("ya goofed up", width/2, height/2);
}
