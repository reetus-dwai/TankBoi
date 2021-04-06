var player;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  
  player = new ship();
}

function draw() {
  background(220);

//turning (the higher the number the faster you turn, and the more jank)
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    player.a -= 3; 
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    player.a += 3;
  }
//moving
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    player.move(true);
  } else if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    player.move(false);
  }
  
//resets angle to 0 when it reaches 360 or -360
  if(player.a == 360 || player.a == -360){
    player.a = 0;
  }
  
//rendering player
  player.render();
  
  
  // console.log(player)
}

class ship {
    constructor() {
        this.pos = createVector(0,0)
        this.a = 0; //inverse angle (cus it weird)
        this.speed = 2; //how fast you move forwards and backwards
        this.w = width/25; //width
        this.h = width/25; //height
      
        this.verts = [createVector(-this.w/2, -this.h/2), createVector(this.w/2, -this.h/2), createVector(this.w/2, this.h/2), createVector(-this.w/2, this.h/2)];
    }
  
    render(){ //this is the function that draws the player
      push()
      noStroke();
      fill(30);
      translate(width / 2 + this.pos.x, height / 2 - this.pos.y);
      rotate(this.a);
      
      beginShape(); //the shape
      vertex(-this.w/2, -this.h/2);
      vertex(this.w/2, -this.h/2);
      vertex(this.w/2, this.h/2);
      vertex(-this.w/2, this.h/2);
      endShape(CLOSE);
      
      //basically same just shape, just with rounded corners so you know what direction it is facing
      stroke(255, 0, 0);
      noFill();
      rect(-this.w/2, -this.h/2, this.w, this.h, 0, 50, 50, 0);
      pop()
    }
  
    move(forwards){
      var force = p5.Vector.fromAngle(-this.a * PI/180); //Ig it need it in radians or something idk
      if(forwards){
        force.mult(this.speed);
        this.pos.add(force)
      }else {
        force.mult(this.speed);
        this.pos.sub(force)
      }
    }
}