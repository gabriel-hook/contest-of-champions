var CoC=CoC || {};
CoC.tracking = CoC.tracking || {};

CoC.tracking.pageView = function(){
  var array = ['_trackPageview'];
  for(var i=0; i<arguments.length; i++)
    array.push(arguments[i]);
  _gaq.push(array);
}
CoC.tracking.event = function(){
  var array = ['_trackEvent'];
  for(var i=0; i<arguments.length; i++)
    array.push(arguments[i])
  _gaq.push(array);
}