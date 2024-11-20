//Nodes thingy

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight); 
  spawnPoint(width/2, height/2);
}

function draw() {
  background("white");
  //move and draw lines
  for (let point of points) {
    point.update(points);
  }

  //draw ccircle after, so they show up on top
  for (let point of points){
    point.display();
  }
}

function spawnPoint(x, y) {
  let somePoint = new MovingPoint(x, y);
  points.push(somePoint);
}

function mousePressed(){
  spawnPoint(mouseX, mouseY);
}

class MovingPoint{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.color = color(random(255), random(255), random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update(thePoints) {
    this.move();
    this.wrapper();
    this.connectTo(thePoints);
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      this.radius += 1;
    }
    else if(mouseDistance > this.reach && this.radius > 5){
      this.radius -= 1;
    }
  }


  move() {
    //pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale to the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapper() {
    // teleport across the screen
    if (this.x < 0) {
      //left 
      this.x += width;
    }
    if (this.x > width){
      this.x -= width;
    }
    
    if (this.y < 0) {
      this.y += height;
    }
    if (this.y > height){
      this.y -= height;
    }
  }

  connectTo(pointsArray) {
    for(let otherPoint of pointsArray){
      //avoid drawing line to self
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}