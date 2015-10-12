var CoC = CoC || {};
CoC.lang = CoC.lang || {};

(function(){
  var defaultLang = 'en';
  var currentLang = 'en';

  var query = {};
  location.search.substr(1).split('&').map(function(str){
    var attr = str.split('=');
    query[attr[0]] = attr[1] && unescape(attr[1]);
  });
  if(query['lang']){
    currentLang = query['lang'];
    console.warn('Language set to "' + currentLang + '"');
  }

  CoC.lang.model = function(key, notFoundValue){
    var value = CoC.lang[currentLang].model[key];
    if(value === undefined)
      value = (notFoundValue !== undefined)? notFoundValue: CoC.lang[defaultLang].model[key]
    return value;
  };

  CoC.lang.string = function(key){
    var value = CoC.lang[currentLang].string[key];
    if(value === undefined)
      value = CoC.lang[defaultLang].string[key];
    return value;
  };

  CoC.lang.search = (defaultLang === currentLang)? '': '?lang='+currentLang;

})();
