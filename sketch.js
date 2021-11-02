var PLAY = 1;
var END = 0;
var gameState = PLAY;
var skeleton, skeleton_running;
var ground, invisibleGround, groundImage, backgroundPicture, backgroundImg;

var obstaclesGroup, obstacle, obstacleImage

var score =  0

function spawnObstacle() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
        obstacle = createSprite(600,790,40,10);
        obstacle.y = Math.round(random(10,60));
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.5;
        obstacle.velocityX = -3;
      
       //assign lifetime to the variable
       obstacle.lifetime = 134;
      
      //adjust the depth
      obstacle.depth = skeleton.depth;
      skeleton.depth = skeleton.depth + 1;
      
      //adding cloud to the group
      obstaclesGroup.add(obstacle);
      }
  }


function preload(){
    skeleton_running = loadAnimation("tile000.png","tile001.png","tile002.png","tile003.png","tile004.png","tile005.png","tile006.png","tile007.png",);
    obstacleImage = loadImage("download.png");
    backgroundImg = loadImage("Background.png")
}

function setup() {
    createCanvas(1200, 800);

    skeleton= createSprite(100,790,100,20);
    skeleton.addAnimation("running",skeleton_running);

    backgroundPicture=createSprite(600,400,200,600);
    backgroundPicture.addImage("Grounding",backgroundImg);
    
    
    ground = createSprite(100,795,1200,20);
    ground.x = ground.width /2;
    
 
}

function draw() {

  background(180);
  
  drawSprites();
  //displaying score
  
  text("Score: "+ score, 1100,50);
  console.log("this is ",gameState)
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    spawnObstacle() 
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& skeleton.y >= 100) {
          skeleton.velocityY = -12;
      }
      
      //add gravity
      skeleton.velocityY = skeleton.velocityY + 0.8
 
    if(obstaclesGroup.isTouching(skeleton)){
        gameState = END;
    }
    spawnObstacles();

    
  }
   else if (gameState === END) {
     console.log("hey")
     drawSprites();
      ground.velocityX = 0;
     skeleton.velocityY = 0
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(0);
     obstaclesGroup.setVelocityXEach(0);

   }
   skeleton.collide(ground);
 
  //stop trex from falling down

  
}

