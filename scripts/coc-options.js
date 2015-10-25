var CoC = CoC || {};
CoC.options = {};

CoC.options.initialize = function(current){

  if(window.self !== window.top)
    $('body').addClass('iframe');

  var html = CoC.data.template['options']({
    model: CoC.lang.model,
    string: CoC.lang.string,
    search: CoC.lang.search,
    current: current
  });
  $(document.body).append(html);

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

  everyFrame(function(){
    var panel = $('.ui-panel-open');
    if(panel.length === 1)
      resizePanel($(panel));
  });

  function resizePanel(panel){
    var page = $('.ui-page-active');
    var header = page.find('#header');
    var footer = page.find('#footer');
    var dismiss = $('.ui-panel-dismiss[data-panelid='+panel[0].id+']');

    var headerHeight = header.height();
    var footerHeight = footer.length && footer.height();
    var panelHeight = window.innerHeight - headerHeight;

    page.css({
      'min-height': panelHeight - footerHeight,
      'padding-bottom': footerHeight - 1
    });
    panel.css({
      'height': panelHeight,
      'top': headerHeight,
      'position': 'fixed',
      'min-height': 'initial',
      'max-height': 'initial',
      'overflow-y': 'auto',
      'z-index': 1500
    });
    dismiss.css({
      'position': 'fixed',
      'height': panelHeight,
      'top': headerHeight,
      'left': 0,
      'right': 'initial',
      'min-height': 'initial',
      'max-height': 'initial',
      'background': 'rgba(0,0,0,0.333)',
      'width': '100%'
    });
  }

  function everyFrame(callback){
    var raf = window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.msRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      function(callback){ 
        window.setTimeout(callback, 1000/60);
      };
    raf(function action(){
      callback();
      raf(action);
    });
  }
};
