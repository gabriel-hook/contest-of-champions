var CoC = CoC || {};
CoC.share = {};

CoC.share.initialize = function(){

  $("#panel-options").enhanceWithin().panel();
  $("#share-facebook").click(function(){
    CoC.tracking.event("share", "facebook");
  });
  $("#share-twitter").click(function(){
    CoC.tracking.event("share", "twitter");
  });
  $("#share-googleplus").click(function(){
    CoC.tracking.event("share", "googleplus");
  });
  $(".change-lang").click(function(){
    var lang = $(this).attr('lang');
    var query = {};
    location.search.substr(1).split('&').map(function(str){
      var attr = str.split('=');
      if(attr.length === 2)
        query[attr[0]] = attr[1] && unescape(attr[1]);
    });
    query.lang = lang;

    location.search = '?' + _.pairs(query).map(function(value){
      return value[0] + '=' + escape(value[1]);
    }).join('&');
  });
};
