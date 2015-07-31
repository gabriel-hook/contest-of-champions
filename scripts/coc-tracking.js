var CoC=CoC || {};
CoC.tracking = CoC.tracking || {};

//Google Analytics Init: make GA and create
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','_gaTracker');
_gaTracker('create', 'UA-64735733-1', 'auto');

CoC.tracking.pageView = function(){
  var array = ['send', 'pageview'];
  for(var i=0; i<arguments.length; i++)
    array.push(arguments[i]);
  _gaTracker.apply(_gaTracker, array);
};

CoC.tracking.event = function(){
  var array = ['send','event'];
  for(var i=0; i<arguments.length; i++)
    array.push(arguments[i])
  _gaTracker.apply(_gaTracker, array);
};

