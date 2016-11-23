var inpCourse = document.getElementById('course');
var inpPassword = document.getElementById('sn');
var btnSubmit = document.getElementById('submit');

inpCourse.addEventListener('change', function(e){
  var elem = document.getElementById(inpCourse.value);
  elem.style.display = 'block';
});

btnSubmit.addEventListener('click', function(e){
  alert(inpPassword.value);
});
