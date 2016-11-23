var inpCourse = document.getElementById('course');
var inpPassword = document.getElementById('sn');
var btnSubmit = document.getElementById('submit');

inpCourse.addEventListener('change', function(e){
  var elem = document.getElementById(inpCourse.value);
  var divs = document.getElementsByTagName('div');
  divs.forEach(function(d){
    d.className += 'hide';
  });
  elem.classList.toggle('show');
});

btnSubmit.addEventListener('click', function(e){
  alert(inpPassword.value);
});
