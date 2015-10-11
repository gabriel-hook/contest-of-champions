(function(){
  var query = {};
  location.search.substr(1).split('&').map(function(str){
    var attr = str.split('=');
    if(attr.length === 2)
      query[attr[0]] = attr[1] && unescape(attr[1]);
  });
  window.searchQuery = function(key, value){
    var q = _.clone(query);
    if(key !== undefined && value !== undefined)
      q[key] = value;
    if(key === 'roster')
      delete q['stars'];
    if(key === 'stars')
      delete q['roster'];
    return '?' + _.pairs(q).map(function(value){
      return value[0] + '=' + escape(value[1]);
    }).join('&');
  }

  function checkStars(key){
    if(query[key] !== undefined){
      var old = query[key];
      var value = Math.min(5, Math.max(1, parseInt(query[key], 10)));
      if (typeof value === "number" && isFinite(value)){
        query[key] = value;
        if(value.toString() != old)
          return false;
      }
      else{
        delete query[key];
      }
    }
    return query[key];
  }

  location.hash = '';

  if(checkStars('roster')){
    CoC.share.initialize();
    CoC.roster.initialize();
    $('.page').on('pageshow', function(){
        CoC.synergies.initialize(query['roster'], true);
    });
  }
  else if(checkStars('stars')){
    CoC.share.initialize();
    $('.page').on('pageshow', function(){
        CoC.synergies.initialize(query['stars']);
    });
  }
  else{
    if(query['roster'] === undefined && query['stars'] === undefined)
      query['stars'] = 2;
    location.search = searchQuery();
  }

})();
