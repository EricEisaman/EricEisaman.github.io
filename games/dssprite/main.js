//  EXAMPLE DomSprite USAGE


/*
opts
{
	sheet : 'mainPath/to/image.png',
	width : 64, // number
	height : 64, // number
	x : 240, // number
	y : 100, // number
	isPlaying: false,// defaults to true
	anims : {
	  // startFrameIndex,endFrameIndex,animationSpeed,repeatAnimation
		name : {start:0,end:8,speed:6,repeat:0}
	},
	container: div // element container,
	zIndex: 0
}
*/
var buddy = new DS.Sprite({
	sheet: 'images/buddy.png',
	width: 126,
	height: 175,
	zIndex: 2,
	speed: 12,
	y: 250,
	anims:{
	  idleUp : {start:0,end:9,speed:8},
	  idleDown : {start:0,end:9,speed:8},
	  idleRight : {start:0,end:9,speed:8},
	  idleLeft : {start:0,end:9,speed:8},
		walkDown : {start:10,end:19,speed:8},
	  walkUp : {start:20,end:29,speed:8},
	  walkRight : {start:30,end:39,speed:8},
	  walkLeft : {start:40,end:49,speed:8}
	}
});

buddy.addHitBox('feet',
							buddy.getWidth()/2,buddy.getHeight()/14,
							buddy.getWidth()/4,0.9*buddy.getHeight());

var healthHUD = document.createElement('div');
healthHUD.style.position = 'absolute';
healthHUD.number = 100;
healthHUD.innerHTML = '<h2>HEALTH : '+healthHUD.number+'</h2>';
healthHUD.style.left='300px';
document.body.appendChild(healthHUD);

buddy.addUpdate(function(){
	if(!buddy.hitboxes['feet'].overlaps(mainPath) && !buddy.hitboxes["feet"].overlaps(path1))
	{
		healthHUD.innerHTML = '<h2>HEALTH : '+ --healthHUD.number+'</h2>';
		if(healthHUD.number<1)
		{
			healthHUD.innerHTML = '<font color="red"><h1>GAME OVER</h1></font>';
			buddy.speed = 0;
			buddy.isPlaying = false;
		}
	}
});

buddy.addUpdate(function(){
	if(!chest.isOpen && buddy.hitboxes["feet"].overlaps(path1))
	{
		chest.playAnim('openChest');
		chest.isOpen = true;
	}
});


document.body.addEventListener('keydown',onKeyDown);
document.body.addEventListener('keyup',onKeyUp);


function onKeyDown(e){
	if(!buddy.isPlaying) return;
	//console.log(buddy.hitboxes['feet'].overlaps(mainPath));
	//console.log(e.keyCode);
	switch(e.keyCode){
		case 87: {
			buddy.playAnim('walkUp');
			buddy.move('up');
		}
		  break;
		case 83: {
			buddy.playAnim('walkDown');
			buddy.move('down');
		}
		  break;
		case 65: {
			buddy.playAnim('walkLeft');
			buddy.move('left');
		}
		  break;
		case 68: {
			buddy.playAnim('walkRight');
			buddy.move('right');
		}
		  break;
	};
}


function onKeyUp(e){
	//console.log(e.keyCode);
	//Character Control with WSAD
	switch(e.keyCode){
		case 87: {
			buddy.playAnim('idleUp');
			buddy.stop();
		}
		  break;
		case 83: {
			buddy.playAnim('idleDown');
			buddy.stop();
		}
		  break;
		case 65: {
			buddy.playAnim('idleLeft');
			buddy.stop();
		}
		  break;
		case 68: {
			buddy.playAnim('idleRight');
			buddy.stop();
		}
		  break;
	};
}


(function(win,doc) {
    "use strict";
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition(),
        msg         = doc.getElementById("msg"),
        input,
        reply;
    recognition.lang = "en";
    recognition.continuous = true;
    //recognition.interimResults = true;
    recognition.addEventListener("result", function(evt) {
        //console.log(evt.results);
        input = evt.results[evt.results.length-1][0].transcript.trim().toLowerCase();
        switch (input) {
          case 'up':
            buddy.playAnim('walkUp');
            buddy.move('up');
            break;
          case 'down':
            buddy.playAnim('walkDown');
            buddy.move('down');
            break;
          case 'left':
            buddy.playAnim('walkLeft');
            buddy.move('left');
            break;
          case 'right':
            buddy.playAnim('walkRight');
            buddy.move('right');
            break;
          case 'stop':
            switch (buddy.currentAnim.name) {
              case 'walkUp':
                buddy.playAnim('idleUp');
                buddy.stop();
                break;
              case 'walkDown':
                buddy.playAnim('idleDown');
                buddy.stop();
              case 'walkLeft':
                buddy.playAnim('idleLeft');
                buddy.stop();
                break;
              case 'walkRight':
                buddy.playAnim('idleRight');
                buddy.stop();
                break;
            }
            break;
          case 'position':
            reply = "Your x position is " + buddy.x.toFixed(0) +
                    "Your y position is " + buddy.y.toFixed(0);
            var voice = new SpeechSynthesisUtterance(reply);
            //console.log(voice);
            voice.lang = "en-US";
            speechSynthesis.speak(voice);
            break;
					case 'open':
					  chest.playAnim('openChest');
						chest.isOpen = true;
						break;
					case 'close':
					  chest.playAnim('closeChest');
						chest.isOpen = false;
						break;
					case 'grow':
						flowers.forEach(function(f){
							f.playAnim('grow');
						});
						break;
        }
        msg.innerText = input;
    }, false);
    recognition.start();
}(this,document));


var chest = new DS.Sprite({
	sheet: 'images/chest.png',
	width: 112,
	height: 182,
	x: 150,
	y: 100,
	zIndex: 1,
	isPlaying: false,
	anims:{
	  openChest : {start:2,end:2,speed:5,repeat:false},
	  closeChest : {start:0,end:0,speed:5,repeat:false}
	}
});

chest.isOpen = false;

// var flower = new DS.Sprite({
// 	sheet: 'images/flower.png',
// 	width: 96,
// 	height: 96,
// 	x: 250,
// 	y: 150,
// 	zIndex: 0,
// 	isPlaying: false,
// 	anims:{
// 	  grow : {start:0,end:11,speed:5,repeat:false},
// 	}
// });


var flowers = [];

var Flower = function(){
	var opts = {
		sheet: 'images/flower.png',
		width: 96,
		height: 96,
		x: parseInt(500*Math.random()+250),
		y: (Math.random() > 0.5) ? parseInt(200*Math.random()+50) : parseInt(200*Math.random()+428),
		zIndex: 0,
		isPlaying: false,
		anims:{
			grow : {start:0,end:11,speed:5,repeat:false},
		}
	}
	return new DS.Sprite(opts);
}

var numFlowersDisplay = document.createElement('div');
numFlowersDisplay.innerText = 'Number of Flowers Planted:' + flowers.length;
document.body.appendChild(numFlowersDisplay);

var plantBtn = document.createElement('button');
plantBtn.innerText = 'Plant Flower';
plantBtn.addEventListener('click',function(e){
	flowers.push(Flower());
	numFlowersDisplay.innerText = 'Number of Flowers Planted:' + flowers.length;
});

document.body.appendChild(plantBtn);

var pathColor = '#7A6226';

var mainPath = document.createElement('div');
mainPath.style.width = '100%';
mainPath.style.height = '80px';
mainPath.style.position = 'absolute';
mainPath.style.top = '350px';
//mainPath.style.borderStyle = 'solid';
mainPath.style.backgroundColor = pathColor;
//mainPath.style.borderWidth = '4px';
//mainPath.style.borderColor = 'brown';
mainPath.style.zIndex = 0;
document.body.appendChild(mainPath);

var path1 = document.createElement('div');
path1.style.width = '80px';
path1.style.height = '100px';
path1.style.position = 'absolute';
path1.style.left = '160px';
path1.style.top = '250px';
path1.style.backgroundColor = pathColor;
path1.style.zIndex = 0;
document.body.appendChild(path1);
