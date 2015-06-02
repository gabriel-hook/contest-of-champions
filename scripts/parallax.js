
$(document).scroll(function(e){
  var x1,x2,y1,y2;

  x1 = document.body.scrollTop/100;
  y1 = -document.body.scrollTop/100;
  
  x2 = -document.body.scrollTop/1000;
  y2 = document.body.scrollTop/1000;
  
  console.log(e)
  $('body.ui-overlay-c').css({ "background-position":y1+"% "+x1+"%" });
  $('.ui-page-theme-c').css({ "background-position":y2+"% "+x2+"%" });
});

window.addEventListener('deviceorientation', function(eventData) {

  var yTilt = Math.round((-eventData.beta + 90) * (40/180) - 40);

  // Retrieve the side to side tilting of the device and move the
  // background the opposite direction.

  var xTilt = Math.round(-eventData.gamma * (20/180) - 20);

  // Thi 'if' statement checks if the phone is upside down and corrects
  // the value that is returned.
  if (xTilt > 0) {
    xTilt = -xTilt;
  } else if (xTilt < -40) {
    xTilt = -(xTilt + 80);
  }
  
  $('body.ui-overlay-c').css({ "background-position":yTilt+"% "+xtilt+"%" });
});