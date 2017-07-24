// SIMPLE DOM SPRITE LIBRARY

var DS = {sprites:[]};
DS.Sprite = function(opts){
   this.sheet = opts.sheet || '';
   this.width = opts.width || 64;
   this.height = opts.height || 64;
   this.avatar = document.createElement('div');
   this.avatar.style.position = 'absolute';
   this.avatar.style.width = (opts.width + 'px') || '64px';
   this.avatar.style.height = (opts.height + 'px') || '64px';
   this.avatar.style.backgroundImage = 'url(' + this.sheet + ')';
   this.avatar.style.left = (opts.x + 'px') || 0;
   this.avatar.style.top = (opts.y + 'px') || 0;
   this.avatar.style.zIndex = opts.zIndex || 0;
   if(opts.anims){
   	 this.anims = opts.anims;
   	 this.initAnims();
   }else this.anims = {};
   if(opts.container) {
   	 opts.container.appendChild(this.avatar)
   } else document.body.appendChild(this.avatar);
   DS.sprites.push(this);
   this.speed = opts.speed || 4;
   this.x = opts.x || 0;
   this.y = opts.y || 0;
};

DS.Sprite.prototype = {
   initAnims: function(){
     this.currentAnim={name:''};
     this.currentFrame = 0;
     this.frameTime = 0;
     this.moving = false;
     this.FPR = DS.computeFramesPerRow(this);
   },
   playAnim: function(key){
   	 if(this.currentAnim.name!=key){
   	 	this.currentAnim = this.anims[key];
      this.currentAnim.name = key;
   	 	this.currentFrame = this.currentAnim.start;
   	    if(!this.currentAnim.speed)this.currentAnim.speed = 5;
   	 };
   },
   update: function(dt){
     if(this.currentAnim)this.frameForward(dt);
     if(this.moving){
     	switch(this.moving){
     		case 'down':{
     			this.y+=this.speed/100*dt;
     		}
     		  break;
     		case 'up':{
     			this.y-=this.speed/100*dt;
     		}
     		  break;
     		case 'left':{
     			this.x-=this.speed/100*dt;
     		}
     		  break;
     		case 'right':{
     			this.x+=this.speed/100*dt;
     		}
     		  break;
     	}
     	this.avatar.style.left = this.x + 'px';
     	this.avatar.style.top = this.y + 'px';
     }
   },
   frameForward: function(dt){
   	  this.frameTime+=dt;
   	  if(this.frameTime>500/this.currentAnim.speed){
   	  	if(this.currentFrame > this.currentAnim.end) {
   	  		this.currentFrame = this.currentAnim.start;
   	  	}
   	  	var row = Math.floor(this.currentFrame/this.FPR);
   	  	var frame = this.currentFrame%this.FPR;
        this.avatar.style.backgroundPosition = -frame*this.width + 'px' + ' ' + -1*row*this.height +  'px';
        this.currentFrame++;
        this.frameTime=0;
   	  }
   },
   move: function(direction){
   	    this.moving = direction;
   },
   stop: function(){
   	    this.moving = false;
   }
};

DS.computeFramesPerRow = function(sprite){
   var img = new Image();
   img.src = sprite.sheet;
   setTimeout(function(){ this.FPR = img.width/this.width}.bind(sprite),500);
};

// game loop
DS.time;
DS.mainLoop = function(){
    requestAnimationFrame(DS.mainLoop);
    var now = new Date().getTime(),
        dt = now - (DS.time || now);

    DS.time = now;
    for(i=0; i<DS.sprites.length; i++){
       DS.sprites[i].update(dt);
       //console.log('updating a sprite');
    }
}
DS.mainLoop();
