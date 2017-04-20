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
    this._map = opts.map;
    this._wallSprite = opts.wallSprite;
  }
}

class Scene{
  constructor(opts){
    this._map = opts.map;
    this._player = opts.player;
  }
  
}

class Vec2{
  constructor(x,y){
    this._x = x;
    this._y = y;
  }
  get x(){
    return this._x;
  }
  set x(value){
    this._x = value;
  }
  get y(){
    return this._y;
  }
  set y(value){
    this._y = value;
  }
}

class Angle{
  constructor(degrees){
    this._deg = degrees;
  }
  get deg(){
    return this._deg;
  }
  set deg(degrees){
    this_deg = degrees;
  }
  get rad(){
    return this._deg*Math.PI/180;
  }
}

class Player{
  constructor(opts){
    this._pos = opts.pos;
    this._playerSprite = opts.playerSprite;
    this._speed = 1;
    this._velocity = new Vec2(0,0);
    this._direction = new Angle(30);
  }
  get pos(){
    return this._pos;
  }
  set pos(newPos){
    this._pos = newPos;
  }
 
}

var myPlayer = new Player({
           pos: new Vec2(1,5) ,
  playerSprite: "images/player.png"});

