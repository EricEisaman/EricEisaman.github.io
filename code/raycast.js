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
    this._level = opts.level;
    this._player = opts.player;
    this._canvas = opts.canvas;
    this._ctx = this._canvas.getContext('2d');
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

const TURNING{
  CCW: -1,
  NONE: 0,
  CW: 1
}

const MOVING{
  FORWARD: 1,
  NONE: 0,
  BACKWARD: -1
}

const KEY{
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
}

class Player{
  constructor(opts){
    this._pos = opts.pos;
    this._playerSprite = opts.playerSprite;
    this._speed = 1;
    this._velocity = new Vec2(0,0);
    this._angle = new Angle(30);
    this._turning = TURNING.NONE;
    this._moving = MOVING.NONE;
    this.initControls();
  }
  initControls(){
    document.body.addEventListener('keydown',this.onKeyDown);
    document.body.addEventListener('keyup',this.onKeyUp);
  }
  onKeyDown(e){
   switch(e.keyCode){
     case KEY.LEFT: this._turning = TURNING.CCW;
         break;
     case KEY.RIGHT: this._turning = TURNING.CW;
         break;
     case KEY.UP: this._moving = MOVING.FORWARD;
         break;
     case KEY.DOWN: this._moving = MOVING.BACKWARD;
   }
  }
  onKeyUp(e){
     switch(e.keyCode){
     case KEY.LEFT: this._turning = TURNING.NONE;
         break;
     case KEY.RIGHT: this._turning = TURNING.NONE;
         break;
     case KEY.UP: this._moving = MOVING.NONE;
         break;
     case KEY.DOWN: this._moving = MOVING.NONE;
   }
  }
  get pos(){
    return this._pos;
  }
  set pos(newPos){
    this._pos = newPos;
  }
  get angle(){
    return this._angle;
  }
  set angle(angle){
    this._angle = angle;
  }
}

class Physics{
  constructor(opts){
    this._step = opts.step;
    this._lastTime;
    this._player = opts.player;
    this._map = opts.map;
  }
  start(){
    this._lastTime = new Date().getTime();
    setInterval(function(){
      tick(new Date().getTime())
    }, 10);
  }
  tick(now){
   let dt = now - this._lastTime;
   this._lastTime = now;
   this.update(dt);
  }
  update(dt){
    console.log(dt);
    //direction
    console.log(this._player.angle);
    //position
    console.log(this._player.pos);
  }
}

var myPlayer = new Player({
  pos: new Vec2(1,5) ,
  playerSprite: "images/player.png"
});

var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var level_1 = new Level({
  map: map_1,
  wallSprite: "images/wall.png"
});

var myScene = new Scene({
  level: level_1,
  player: myPlayer,
  canvas: canvas
});

