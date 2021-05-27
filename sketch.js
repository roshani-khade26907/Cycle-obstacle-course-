var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var obstacle1Img,obstacle2Img,obstacle3Img;
var gameOverImg,cycleBell,gameoverSound;
var obstacle1,obstacle2,obstacle3;

var pinkCG, yellowCG,redCG; 
var obs1,obs2,obs3;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  obstacle1Img = loadAnimation("images/obstacle1.png");
  obstacle2Img = loadAnimation("images/obstacle2.png");
  obstacle3Img = loadAnimation("images/obstacle3.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameoverSound = loadSound("images/die.mp3")
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
  createCanvas(1200,300);
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  //set collider for mainCyclist
  //mainCyclist.debug=true; 
  mainCyclist.setCollider ("rectangle",30,500,1200,600);  

  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  
  obs1 = new Group ();
  obs2 = new Group ();
  obs3 = new Group ();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance +"m",900,30);
  
  if(gameState===PLAY){
    
    distance=distance+Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    mainCyclist.y = World.mouseY;
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }

      //code to play cycle bell sound
    if(keyDown("space") && gameState===PLAY) {
      cycleBell.play();
      path.velocityX = path.velocityX-2;
    }

    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1,6));

    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } 
      else if (select_oppPlayer == 2) {
        yellowCyclists();
      } 
      else if (select_oppPlayer===3){
        redCyclists();
      }
      else if (select_oppPlayer===4){
        obst1();
      }
      else if (select_oppPlayer===5){
        obst2();
      }
      else if (select_oppPlayer===6){
        obst3();
      }
    }
  
    if(pinkCG.isTouching(mainCyclist)){
      gameState = END;
      pinkCG.setVelocityYEach (0);     
      player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      yellowCG.setVelocityYEach (0);   
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      redCG.setVelocityYEach (0);      
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
    if(obs1.isTouching(mainCyclist)){
      gameState = END;
      obs1.setVelocityYEach (0);     
    }
    
    if(obs2.isTouching(mainCyclist)){
      gameState = END;
      obs2.setVelocityYEach (0);      
    }
    
    if(obs3.isTouching(mainCyclist)){
      gameState = END;
      obs3.setVelocityYEach (0);      
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(23);
    fill("peach")
    text("PRESS SPACE TO START AGAIN",470,200)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
    obs1.setVelocityXEach(0);
    obs1.setLifetimeEach(-1);
  
    obs2.setVelocityXEach(0);
    obs2.setLifetimeEach(-1);
  
    obs3.setVelocityXEach(0);
    obs3.setLifetimeEach(-1);

    //condition for calling reset()
    if(keyDown("space")){
      reset();
    }
  }
}

function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
}

function yellowCyclists(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);                 player2.addAnimation("opponentP2",oppYellow1Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

function redCyclists(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  player3.setLifetime=170;
  redCG.add(player3);
}

function obst1(){
  obstacle1=createSprite(1100,Math.round(random(50, 250)));
  obstacle1.velocityX = -(6 + 2*distance/150);
  obstacle1.addAnimation("obsl1",obstacle1Img);
  obstacle1.scale=0.1
  obstacle1.setLifetime=170;
  obs1.add(obstacle1);
}

function obst2(){
  obstacle2=createSprite(1100,Math.round(random(50, 250)));
  obstacle2.velocityX = -(6 + 2*distance/150);
  obstacle2.addAnimation("obsl2",obstacle2Img);
  obstacle2.scale=0.1
  obstacle2.setLifetime=170;
  obs2.add(obstacle2);
}

function obst3(){
  obstacle3=createSprite(1100,Math.round(random(50, 250)));
  obstacle3.velocityX = -(6 + 2*distance/150);
  obstacle3.addAnimation("obsl3",obstacle3Img);
  obstacle3.scale=0.1
  obstacle3.setLifetime=170;
  obs3.add(obstacle3);
}

//create reset function here
function reset(){
  gameState=PLAY;
  distance=0;
  gameOver.visible=false;
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obs1.destroyEach();
  obs2.destroyEach();
  obs3.destroyEach();
}
