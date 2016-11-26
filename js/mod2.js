var inpCourse = document.getElementById('course');
var inpPassword = document.getElementById('sn');
var btnSubmit = document.getElementById('submit');

inpCourse.addEventListener('change', function(e){
  var elem = document.getElementById(inpCourse.value);
  var courses = document.getElementsByClassName('course');
  for(i=0; i<courses.length ; i++){
    if (courses[i].style.display !== 'none') {
        courses[i].style.display = 'none';
    }
  }
  elem.style.display = 'block';
});

btnSubmit.addEventListener('click', function(e){
  console.log('Sending Data ...');
  if(inpCourse.value != '0'){
    var data = {};
    data.pw = inpPassword.value;
    data.d = {};
    data.d.course = inpCourse.value;
    data.d.array = computeLTNameValueArray();
    console.log(JSON.stringify(data));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://sirfizx.pythonanywhere.com/api/update/', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 && !xhr.responseText.startsWith('A')) {
          var o = JSON.parse(xhr.responseText);
          console.log(o);
        } else {
          console.error(xhr.statusText);
          console.error(xhr.responseText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
  }else{
    console.warn('Choose a course!');
  }
});

var pts = document.getElementsByClassName('pt');
console.log('pts : ' , pts);
for(i=0;i<pts.length;i++){
  pts[i].addEventListener('click',function(e){
    if(e.target.style.backgroundColor=='pink' || e.target.style.backgroundColor=='rgb(255, 192, 203)'){
       e.target.style.backgroundColor='green';
       e.target.style.color='white';
    }else{
      e.target.style.backgroundColor='pink';
      e.target.style.color='black';
    }
  }.bind(pts[i]));
}

function computeLTNameValueArray(){
  var a = [];
  var courseElement = document.getElementById(inpCourse.value);
  var lts = courseElement.getElementsByClassName('lt');
  for(i=0;i<lts.length;i++){
    var ptasks = lts[i].getElementsByClassName('pt');
    var numGreen = 0;
    for(i=0;i<ptasks.length;i++){
      if(ptasks[i].style.backgroundColor=='pink' || ptasks[i].style.backgroundColor=='rgb(255, 192, 203)'){
        //marked as not accomplished 'pink'
      }else{
        numGreen++;
      }
    }
    var scaleValue = Math.round(3*(numGreen/ptasks.length))+1;
    a[lts[i].getElementsByTagName('h3')[0].innerText]=scaleValue;
  }
  return a;
}
