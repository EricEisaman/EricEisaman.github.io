var map_1 = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0   ];

class Level{
  constructor(opts){
    this.map = opts.map;
    this.wallSprite = opts.wallSprite;
  }
}

class Scene{
  constructor(level){
    this.map = map;
    this.player = new Player();
  }
  
}

class Vec2{
  constructor(x,y){
    private x = x;
    private y = y;
  }
  get x(){
    return private (this).x;
  }
  set x(value){
    private (this).x = value;
  }
  get y(){
    return private (this).x;
  }
  set y(value){
    private (this).x = value;
  }
}

class Angle{
  constructor(degrees){
    this.degrees = degrees;
  }
  toRadians(){
  
  }
}

class Player{
  constructor(opts){
    this.pos = opts.pos;
    this.playerSprite = opts.playerSprite;
    this.speed = 1;
    this.velocity = new Vec2(0,0);
    this.
  }
 
}

var myPlayer = new Player({
           pos: new Vec2(1,5) ,
  playerSprite: "images/player.png"});

