  var backgroundImg
  var spacecraft , spacecraftImg;
  var  alienImg , moonrockImg , meteorImg,laserImg;
  var obstacleGroup;
  var laserGroup;
  var score = 0;
  var start;
  var gameState = 'start'
  var damage =0;
  var startImg;
  function preload(){
    backgroundImg =loadImage("Imgs/background.jpg")
    alienImg = loadImage("Imgs/alien.png")
    moonrockImg = loadImage("Imgs/moonrock.png")
    meteorImg = loadImage("Imgs/meteor.png")
    spacecraftImg = loadImage("Imgs/spacecraft.png")
    startImg=loadImage("Imgs/start.jpg")
    laserImg=loadImage("Imgs/laser.png")
  }

  function setup() {
    createCanvas(800,700);
    bg = createSprite(400,350,10,10);
    bg.addImage(backgroundImg);
    bg.scale=4;
    spacecraft = createSprite(400, 650, 50, 50);
    spacecraft.addImage(spacecraftImg);
    spacecraft.scale=0.3
  obstacleGroup= new Group();
  laserGroup= new Group();
  start = createSprite(600,600,50,50);
  start.addImage(startImg);
  start.scale=0.3;
  }

  function draw() {
    background("black"); 
    if(gameState==='start'){
      background(backgroundImg);
      fill("white");
      textSize(40);
      
      
      if(mousePressedOver(start)){
        gameState='play'
      }
      spacecraft.visible =false
      drawSprites();
      text("SPACE INVADERS",250,100)
      textSize(30)
      text("Welcome!!",300,150)
      textSize(25)
      text("Instructions : ",150,200)
      textSize(20)
      text("- Use arrow keys to control the space craft",100,230)
      text("- press space to fire",100,260)
      text("- if hit by the obstacles your damage increases",100,290)
      text("- once damages reaches 100% game gets over",100,320)
      textSize(40)
      fill("red")
      stroke("pink")
      strokeWeight(7)
      text("ALL THE BEST !!!", 250,500)
    } 
    if(gameState==='play'){
      spacecraft.visible = true
      bg.visible=true;
      start.visible=false
    bg.velocityY = 6;
    if(bg.y>700){
      bg.y=350
    }
  if (keyDown('UP_ARROW')){
    spacecraft.y = spacecraft.y-20
  }
  if (keyDown('DOWN_ARROW')){
    spacecraft.y = spacecraft.y+20
  }

  if (keyDown('LEFT_ARROW')){
  spacecraft.x = spacecraft.x-20
  }

  if (keyDown('RIGHT_ARROW')){
  spacecraft.x = spacecraft.x+20
  }
  obstacles();
  if(keyDown('SPACE')){
  lasers();
  }

  drawSprites();
  fill("white")
  textSize(20)
  text("Score : "+ score,700,50);
  text("Damage : "+ damage+" % ",680,100 )
  if(obstacleGroup.isTouching(spacecraft)){
    damage = damage+10
    obstacleGroup.destroyEach()
  }
  
  if(damage===10){
    gameState='end'
  }
  if(laserGroup.isTouching(obstacleGroup)){
    laserGroup.destroyEach()
    obstacleGroup.destroyEach()
    score = score+100;
  }
}
if(gameState==='end'){
  drawSprites();
  fill("white")
  textSize(40)
  text("GAME OVER",350,300)
  start.visible=true;
  spacecraft.visible=false;
  bg.visible=false;

  if(mousePressedOver(start)){
    restart()
  }
}
  }
  function restart(){
    gameState='play'
    score=0;
    damage=0;
  }
  function obstacles (){
    if(frameCount%70===0){
      obstacle = createSprite(200,-50,30,30);
  obstacle.x = Math.round(random(50,750))
  obstacle.velocityY= 10
  var r = Math.round(random(1,3));
  switch(r){
    case 1:obstacle.addImage(meteorImg);
    obstacle.scale =0.2
    break;
    case 2: obstacle.addImage(alienImg);
    obstacle.scale=0.2
    break;
    case 3 : obstacle.addImage(moonrockImg);
    obstacle.scale=0.2
    break;
    default:break 
  }
  obstacleGroup.add(obstacle)
    }
  }
  function lasers(){
    laser = createSprite(spacecraft.x , spacecraft.y-50,10,100);
    laser.shapeColor= "green"
    laser.velocityY = -12
    laserGroup.add(laser);
    laser.addImage(laserImg)
    laser.scale=0.1
  }
