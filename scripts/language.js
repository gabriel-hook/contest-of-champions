var CoC = CoC || {};
CoC.lang = CoC.lang || {};

(function(){
  var defaultLang = 'en';
  var currentLang = 'en';

  var query = {};
  location.search.substr(1).split('&').map(function(str){
    var attr = str.split('=');
    if(attr.length === 2)
      query[attr[0]] = attr[1] && unescape(attr[1]);
  });
  if(query['lang']){
    if(CoC.lang[query['lang']]){
      currentLang = query['lang'];
      console.warn('Language set to "' + currentLang + '"');
    }
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

  if(currentLang === defaultLang && query['lang'] === undefined){
    var languages = [], updateLang;
    if(navigator && navigator.language)
      languages.push(navigator.language);
    if(navigator && navigator.languages)
      languages.concat(navigator.languages);
    for(var i=0; i<languages.length; i++){
      var lang = navigator.language.split('-')[0];
      if(currentLang !== lang || CoC.lang[lang]){
        updateLang = lang;
        break;
      }
    }
    if(updateLang && updateLang !== defaultLang){
      query.lang = updateLang;
      location.search = '?' + _.pairs(query).map(function(value){
        return value[0] + '=' + escape(value[1]);
      }).join('&');
    }
  }

})();
