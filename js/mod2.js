var inpCourse = document.getElementById('course');
var inpPassword = document.getElementById('sn');
var btnSubmit = document.getElementById('submit');

inpCourse.addEventListener('change', function(e){
  alert(inpCourse.value);
});

btnSubmit.addEventListener('click', function(e){
  alert(inpPassword.value);
});
