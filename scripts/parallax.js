if (window.DeviceMotionEvent){
  function getTilt(event, scale){
    var yTilt = Math.round((-event.beta + 90) * (40/180) * scale - 40);
    var xTilt = Math.round(-event.gamma * (20/180) * scale - 20);
    if (xTilt > 0) {
      xTilt = -xTilt;
    } else if (xTilt < -40) {
      xTilt = -(xTilt + 80);
    }
    return yTilt+"% "+xtilt+"%";
  }
  window.addEventListener('devicemotion', function(e) {
    $('body.ui-overlay-c').css({ "background-position":getTilt(e, 1.0); });
    $('.ui-page-theme-c').css({ "background-position":getTilt(e, 2.0); });
  }, false);
}
else{
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
}
