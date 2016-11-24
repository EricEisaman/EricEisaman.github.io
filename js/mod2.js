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
  alert(inpPassword.value);
});

var pts = document.getElementsByClassName('pt');
console.log('pts : ' , pts);
for(i=0;i<pts.length;i++){
  pts[i].addEventListener('click',function(e){
    console.log(e.target.style.backgroundColor);
    if(e.target.style.backgroundColor=='pink'){
       e.target.style.backgroundColor='green'
       e.target.style.color='white'
    }else{
      e.target.style.backgroundColor='pink'
      e.target.style.color='black'
    }
  });
}
