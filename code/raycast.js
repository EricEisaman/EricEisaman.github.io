'use strict';

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

const s_x = Symbol();
const s_y = Symbol();
class Vec2{
  constructor(x,y){
    this[s_x] = x;
    this[s_y] = y;
  }
  get x(){
    return this[s_x];
  }
  set x(value){
    this[s_x] = value;
  }
  get y(){
    return this[s_y];
  }
  set y(value){
    this[s_y] = value;
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

