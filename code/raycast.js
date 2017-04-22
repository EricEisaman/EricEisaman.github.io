'use strict';

class Level{
  constructor(opts){
    this._map = opts.map;
    this._wallSprite = opts.wallSprite;
  }
  get map(){
    return this._map;
  }
  set map(newMap){
    this._map = newMap;
  }
  get wallSprite(){
    return this._wallSprite;
  }
  set wallSprite(newSprite){
    this._wallSprite = newSprite;
  }
}

class Scene{
  constructor(opts){
    this._level = opts.level;
    this._player = opts.player;
    this._graphics = new Graphics({
      canvas: opts.canvas,
      player: this._player,
      level: this._level
    });
    this._physics = new Physics({
      step: 10,
      player: this._player,
      level: this._level
    });
    this._physics.start();
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
  distanceTo(vec2){
    return Math.sqrt( (this._x - vec2.x)*(this._x - vec2.x) +
                      (this._y - vec2.y)*(this._y - vec2.y) );
  }
  copy(){
    return new Vec2(this.x,this.y);
  }
}

const TURNING ={
  CCW: -1,
  NONE: 0,
  CW: 1
}

const MOVING ={
  FORWARD: 1,
  NONE: 0,
  BACKWARD: -1
}

const KEY ={
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
    this._angle = 30;
    this._turning = TURNING.NONE;
    this._moving = MOVING.NONE;
    this._fov = 90;
    this.initControls();
  }
  initControls(){
    document.body.addEventListener('keydown',this.onKeyDown.bind(this));
    document.body.addEventListener('keyup',this.onKeyUp.bind(this));
  }
  onKeyDown(e){
   e.preventDefault();
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
   e.preventDefault();
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
  get turning(){
    return this._turning;
  }
  get moving(){
    return this._moving;
  }
  get fov(){
    return this._fov;
  }
}

class Physics{
  constructor(opts){
    this._step = opts.step;
    this._lastTime;
    this._player = opts.player;
    this._level = opts.level;
  }
  start(){
    this._lastTime = new Date().getTime();
    setInterval(function(){
      this.tick(new Date().getTime())
    }.bind(this), 10);
  }
  tick(now){
   let dt = now - this._lastTime;
   this._lastTime = now;
   this.update(dt);
  }
  update(dt){
    //console.log(dt);
    //angle
    //console.log(this._player.turning);
    //console.log(this._player.angle);
    //position
    //console.log(this._player.moving);
    //console.log(this._player.pos);
  }
}

class Ray{
  constructor(player,map){
    this._player = player;
    this._map = map;
  }
  cast(){
    let angle = this._player.angle-this._player.fov/2;
    let dtheta = this._player.fov/canvas.width;
    let from = this._player.pos.copy();
    let to = from;
    let s = 0;
    let result = false;
    while(!result && (s < 450)){
      from = this.nextEdgePoint(from,angle));
      result = this.collides(from);
    }
    return result;
  }
  nextEdgePoint(from,angle){
    let ca = Math.cos(angle);
    let sa = Math.sin(angle);
    let caPos = (ca>0);
    let saPos = (sa>0);
    let cLarger = (Math.abs(ca)>Math.abs(sa));
    let dx,dy;
    if(caPos && saPos){
    //top and right
      dx = 50 - from.x%50;
      dy = from.y%50;
      if((sa/ca)<(dy/dx)){
        //right
        let x = Math.round(from.x + dx);
        let y = Math.round(from.y + dx*Math.tan(angle*Math.PI/180));
        return new Vec2(x,y);
      }else{
        //top
        let x = Math.round(from.x + dy/Math.tan(angle*Math.PI/180));
        let y = Math.round(from.y - dy);
        return new Vec2(x,y);
      }
    }else if( caPos && !saPos){
    //bottom and right
      dx = 50 - from.x%50;
      dy = 50 - from.y%50;
      if((Math.abs(sa/ca))<(dy/dx)){
        //right
        let x = Math.round(from.x + dx);
        let y = Math.round(from.y + dx*Math.tan(angle*Math.PI/180));
        return new Vec2(x,y);
      }else{
        //bottom
        let x = Math.round(from.x + dy/Math.tan(angle*Math.PI/180));
        let y = Math.round(from.y + dy);
        return new Vec2(x,y);
      }
    }else if( !caPos && !saPos){
    //bottom and left
      dx = from.x%50;
      dy = 50 - from.y%50;
      if((Math.abs(sa/ca))<(dy/dx)){
        //left
        let x = Math.round(from.x - dx);
        let y = Math.round(from.y + dx*Math.tan(angle*Math.PI/180));
        return new Vec2(x,y);
      }else{
        //bottom
        let x = Math.round(from.x + dy/Math.tan(angle*Math.PI/180));
        let y = Math.round(from.y + dy);
        return new Vec2(x,y);
      }
    }else{
    //top and left
      dx = from.x%50;
      dy = from.y%50;
      if((Math.abs(sa/ca))<(dy/dx)){
        //left
        let x = Math.round(from.x - dx);
        let y = Math.round(from.y + dx*Math.tan(angle*Math.PI/180));
        return new Vec2(x,y);
      }else{
        //top
        let x = Math.round(from.x + dy/Math.tan(angle*Math.PI/180));
        let y = Math.round(from.y - dy);
        return new Vec2(x,y);
      }
    }
  }
  collides(from){
    return from;
  }
}
// Each map cell is 50x50 in First Person Viewport
var map_1 = [ 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , // indices 0-8
              0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , // indices 9-17
              0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , // indices 18-26
              0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , // indices 27-35
              0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , // indices 36-44
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // indices 45-53
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // indices 54-62
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // indices 63-71
              0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];// indices 72-80

class Graphics{
  constructor(opts){
    this._canvas = opts.canvas;
    this._ctx = this._canvas.getContext('2d');
    this._player = opts.player;
    this._level = opts.level;
    this._ray = new Ray(this._player,this._level.map);
    this.start();
  }
  start(){
    this._lastTime = new Date().getTime();
    requestAnimationFrame(this.update.bind(this));
  }
  update(){
    //First Person Viewport Background
    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(0,0,450,450);
    //First Person Viewport RayCasting
    for(let i=0; i<canvas.width; i++){
      let objToRender = this._ray.cast();
      this.renderVerticalLine(objToRender);
      this._ray._angle += this._dtheta;
    }
    //Minimap Background
    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(525,0,200,200);
    //Minimap Walls
    this._ctx.fillStyle = 'red';
    for( let i=0; i<this._level.map.length; i++){
      if(this._level.map[i]){
        let x = (i%9)*200/9+525;
        let y = 200/9*Math.floor(i/9);
        //console.log("map["+i+"]  x: "+x+"  y: "+y);
        this._ctx.fillRect(x,y,200/9,200/9);
      }
    }
    //Minimap Player ( Note: we scale down the coordinates for the minimap )
    this._ctx.fillStyle = 'blue';
    this._ctx.fillRect(this._player.pos.x * (200/450) - (10 * (200/450)) + 525,
                       this._player.pos.y * (200/450) - (10 * (200/450)),
                       20 * (200/450),
                       20 * (200/450));

    requestAnimationFrame(this.update.bind(this));
  }
  renderVerticalLine(objToRender){
    //console.log(objToRender);
    if(objToRender){
      this._ctx.fillStyle = 'light-green';
      this._ctx.fillRect(objToRender.x,objToRender.y,2,2);
    }
  }
}

var myPlayer = new Player({
  pos: new Vec2(75,275) ,
  playerSprite: "images/player.png"
});

var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 450;
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
