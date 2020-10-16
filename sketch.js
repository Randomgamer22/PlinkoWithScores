const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var plinkos = [], ground, divisions = [];
var particle;
var score = 0;
var turns = 5;
var gameState = "play";

function setup() {
  createCanvas(480,800);

  engine = Engine.create();
	world = engine.world;

  ground = new Ground(240, 780, 480, 40);

  for(var i = 0; i <= width; i += 80) {
    var division = new Division(i, 610, 300);
    divisions.push(division);
  }

  for(var i=40; i<=width; i+=50) {
    plinkos.push(new Plinko(i, 75, 20));
  }
  for(var i=15; i<=width; i+=50) {
    plinkos.push(new Plinko(i, 175, 20));
  }
  for(var i=40; i<=width; i+=50) {
    plinkos.push(new Plinko(i, 275, 20));
  }
  for(var i=15; i<=width; i+=50) {
    plinkos.push(new Plinko(i, 375, 20));
  }

  Engine.run(engine);
}



function draw() {
  background(0);  

  textSize(20);
  text("SCORE: "+score, 10, 50);

  if(mouseIsPressed){
    if(gameState != "end"){
      turns--;
      particle = new Particle(mouseX, 10, 20);
    }
  }

  push();
  textAlign(CENTER);
  textSize(30);
  text("100", 40, 550);
  text("100", 440, 550);
  text("200", 120, 550);
  text("200", 360, 550);
  text("500", 200, 550);
  text("500", 280, 550);
  pop();
  

  for(var i = 0; i < divisions.length; i++) {
    divisions[i].display();;
  }

  for(var i=0; i<plinkos.length; i++) {
    plinkos[i].display();
  }
  
  if(particle != undefined) {
    particle.display();

    if(particle.body.position.y > 725){
      if(particle.body.position.x < 80){
        score+=100;
        particle = undefined;
        if(turns == 5){
          gameState = "end";
        }
      }
      if(80 < particle.body.position.x < 160){
        score+=200;
        particle = null;
        if(turns == 5){
          gameState = "end";
        }
      }
      if(160 < particle.body.position.x < 240){
        score+=500;
        particle = null;
        if(turns == 5){
          gameState = "end";
        }
      }
      if(240 < particle.body.position.x < 320){
        score+=500;
        particle = null;
        if(turns == 5){
          gameState = "end";
        }
      }
      if(320 < particle.body.position.x < 400){
        score+=200;
        particle = null;
        if(turns == 5){
          gameState = "end";
        }
      }
      if(400 < particle.body.position.x < 480){
        score+=100;
        particle = null;
        if(turns == 5){
          gameState = "end";
        }
      }
    }
  }


  ground.display();


  drawSprites();
}

