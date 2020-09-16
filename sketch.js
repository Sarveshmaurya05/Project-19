var bananaGroup,bananaImage,obstaclesImage;
var Score,background,ground, Monkey,MonkeyAnimation, back;
var obstaclesGroup, gameOver;

function preload(){
backImage=loadImage("jungle.jpg");
  MonkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  obstaclesImage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(0,0,600,200);
  back.addImage(backImage);
  back.velocity=-3;
  
  Score = 0;
  
  Monkey = createSprite(50, 300, 20, 40);
  Monkey.addAnimation("Monkey", MonkeyAnimation);
  Monkey.scale=0.1;
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
  ground = createSprite(200,380,400,20);
  ground.x = ground.width /2;
  ground.visible=false;
}

function draw() {
 
  if(back.x<0){
   back.x=back.width/2; 
  }
  if (keyDown("space")){
   Monkey.velocityY=-12;
  }
  Monkey.velocityY=Monkey.velocityY+0.8;
  Monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if(bananaGroup.isTouching(Monkey)){ 
    bananaGroup.destroyEach();
    Score = Score + 2;
  }
  switch(Score){ 
    case 10: Monkey.scale=0.12;
      break;
      case 20: Monkey.scale=0.14;
      break;
      case 30: Monkey.scale=0.16;
      break;
      case 40: Monkey.scale=0.18;
      break;
      default: break;
  } if(keyDown("space") ) {
    Monkey.velocityY = -12;
  } 
  
  if(obstaclesGroup.isTouching(Monkey)){
    Monkey.scale=0.08;
    // Score=score-2; 
  }
  
 drawSprites();
        
        textSize(20);
text("Score : "+Score, 270, 30);
  
  
  }
 function spawnFood() {
   //write code here to spawn the food 
   if (frameCount % 80 === 0) { 
     var banana = createSprite(600,250,40,10);
     banana.y = random(120,200);
     banana.addImage(bananaImage);
     banana.scale = 0.05;
     banana.velocityX = -5;
  //assign lifetime to the variable
  banana.lifetime = 300;
  Monkey.depth = banana.depth + 1;
    //add each banana to the group
     bananaGroup.add(banana);
   } 
 } 

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40); 
    obstacle.velocityX = -6;
    obstacle.addImage(obstaclesImage); 
    //assign scale and lifetime to the obstacle 
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group 
    obstaclesGroup.add(obstacle);
  } 
}