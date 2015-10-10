function checkStars(search, key){
  var query = '?'+key+'=', value, stars;
  if(search.indexOf(query) !== 0)
    return false;
  value = parseInt(location.search.substr(query.length), 10);
  stars = Math.min(5, Math.max(1, value)) || 2;
  return (search === query + stars)? stars: false;
}
var stars;
if((stars = checkStars(location.search, 'roster')) !== false){
  CoC.roster.initialize();
  $('.page').on('pageshow', function(){
      CoC.synergies.initialize(stars, true);
  });
}
else if((stars = checkStars(location.search, 'stars')) !== false){
  $('.page').on('pageshow', function(){
      CoC.synergies.initialize(stars);
  });
}
else
  location.search = "?stars=" + (stars || 2);
