var BackG,BackImg; 
var rocket,rocketImg;
var ufoImg,ufo;
var rock,rockImg,rockGroup;
var blast,blastImg;
var edges;
var gameOverImg ;
var fireBall,fireBallImg,fireGroup;
var rockB;
var life = 5;
var flag = 0;
var sound, sound2;




function preload (){
  BackImg = loadImage("images/space.png");
  rocketImg = loadImage("images/rocket.png");
  ufoImg = loadImage("images/ufo.png");
  rockImg = loadImage("images/rock1.png");
  blastImg = loadAnimation("images/blast.png")
  gameOverImg = loadAnimation("images/g1.jpg", "images/g2.jpg","images/g3.jpg", 
  "images/g4.jpg","images/g5.jpg", "images/g6.jpg", "images/g7.jpg", "images/g8.jpg",
  "images/g9.jpg", "images/g10.jpg");
  fireBallImg = loadImage("images/fireBall.png");
  sound = loadSound("images/gameOver2.wav");
  sound2 = loadSound("images/sound2.mp3")
  
}
function setup() {
 createCanvas(800,400);

 BackG = createSprite(400,120,100,100);
 BackG.addImage(BackImg);
 BackG.addAnimation("xyz",gameOverImg);
 BackG.scale = 1.8;


 rocket = createSprite(100,200,100,100);
 rocket.addImage(rocketImg);
 rocket.addAnimation("abc",blastImg);  
 rocket.scale = 0.2 ;
 rocket.debug = true;
 rocket.setCollider("rectangle",0,0,200,200)

 
 
 rockGroup = new Group();
 fireGroup = new Group();


 //blast = createSprite(700,200,100,100);
 //blast.scale = 0.5;
  //createSprite(400, 200, 50, 50);
//fireBall.velocityX = 2;

//sound.loop();


}

function draw() {
  background(255,255,255);  
  drawSprites();
  
  spawnObstacles();

 edges = createEdgeSprites()
 rocket.collide(edges);



  

 //rocket.x = mouseX;
 //rocket.y = mouseY;

 if(keyDown("UP_ARROW")){
   rocket.velocityY = -2
 }
 if(keyDown("DOWN_ARROW")){
  rocket.velocityY = 2
}
if(keyDown("RIGHT_ARROW")){
  rocket.velocityX = 2
}
if(keyDown("LEFT_ARROW")){
  rocket.velocityX = -2}

  if(rocket.isTouching(rockGroup)){
    //GameOver();
    sound2.play();
    life -=  1;
    rockGroup[0].destroy();
    

}

if(life === 0){
  GameOver();
}


    




fill("white");
  textSize(40);
  text(`Life:` + life, width - 200,  40);
  textAlign(CENTER, CENTER);

  


  spawnFireBall();

 if(fireGroup.isTouching(rockGroup) || rockGroup.isTouching(fireGroup)){
  
   fireGroup[0].destroy();
   rockGroup[0].destroy();
  
 }


}

function GameOver(){
  rocket.changeAnimation("abc",blastImg);
  //console.log("abc");
  rocket.setVelocity(0,0);
  rocket.destroy();
  //gameOverImg = createAnimation(400,200,100,100);
  BackG.changeAnimation("xyz",gameOverImg);

  
  fireGroup[0].destroy();
  rockGroup[0].destroy();  
  

  //sound
  sound.play();

  

}
 


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    rock = createSprite(850,200,100,100);
 rock.addImage(rockImg);
 rock.scale = 0.2;
 rock.velocityX = -4
 rock.debug = true;
 rock.setCollider("rectangle",0,0,200,200)

 rock.y = Math.round(random(80,360));
 rockGroup.add(rock);
 //rock.scale = 0.1;
  }}

  function spawnFireBall(){
    if(frameCount % 1 === 0) {

   
      
        fireBall = createSprite(-10,-10,100,100);
        fireBall.addImage(fireBallImg);
        fireBall.scale = 0.09;
        fireGroup.add(fireBall);
        
       
      
        if(keyDown("SPACE")){
        
          fireBall.x= rocket.x;
          fireBall.y = rocket.y;
          fireBall.velocityX = 5;
      }

   }
    
   




  }