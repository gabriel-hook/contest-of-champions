var CoC = CoC || {};
CoC.editor = {};

CoC.editor.version = "1.5.5";

CoC.editor.initialize = function(){
  console.log("Contest of Champions - Guide Editor Tool v"+CoC.editor.version);

  CoC.editor.view = new CoC.view.GuideView({
    model: null,
    el: $("#guide-content")[0]
  });

  var i;

  var championIds = _(CoC.data.champions.pluck('uid')).uniq();
  var editorChampion = $('#editor-champion');
  editorChampion.empty();
  editorChampion.append($('<option>').val('').text(CoC.lang.string('choose-guide')+'...'));
  for(i=0; i<championIds.length; i++)
    editorChampion.append($('<option>').val(championIds[i]).text(CoC.lang.model('champion-'+championIds[i]+'-name')));
  editorChampion.change(function(e){
    CoC.editor.reset(e.target.value);
  });

  //init
  $(document).on('pagebeforeshow', '#page-guide', function(){ 
    location.hash = '';

    $('.select2').select2({
      tags: true,
      tokenSeparators: [',', ' ']
    });

    var first = $('#editor-champion option')[0];
    $(first).attr('selected', 'selected');
    $('#editor-champion').selectmenu('refresh')
    CoC.editor.reset(first.value);
  });

  var queueRender = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) };
  queueRender(function onDraw(){

    //make sure we have enough padding below to scroll all the way down
    var popup = $('#popup-editor-popup');
    var popupHeight = popup.height() || 0;
    if(popup.length){
      var spacing = (window.innerWidth > 500)? 32: 0;
      var viewportHeight = $('.ui-mobile-viewport').height() - $('#header').height() - spacing;
      var scrollY = window.scrollY;
      var marginBottom = 0;
      if(viewportHeight < popupHeight)
        marginBottom = Math.min(0, viewportHeight - popupHeight + window.scrollY);
      popup.css('margin-bottom', marginBottom);   
    }
    $('#guide-content').css('margin-bottom', popupHeight);
    queueRender(onDraw);
  });
};

CoC.editor.reset = function(champion){
  var hasChampion = champion && champion !== '';
  var guideData = hasChampion && CoC.data.guides.get(champion).data;
  var initSelect = initInput.bind(null, 'selectmenu', 'change');
  var initMultiSelect = initInput.bind(null, 'multiselect', 'change');
  var initRadio = initInput.bind(null, 'checkboxradio', 'change');
  var initText = initInput.bind(null, 'textinput', 'blur keydown keyup');

  initSelect('#editor-grade', ['grades', 'normal']);
  initSelect('#editor-grade-awakened', ['grades', 'awakened']);
  initText('#editor-description', ['description']);

  initRadio('[name=editor-gameplay-rating]', ['gameplay', 'rating']);
  initText('#editor-gameplay-style', ['gameplay', 'style']);
  initText('#editor-gameplay-description', ['gameplay', 'description']);
  initText('#editor-gameplay-strategy', ['gameplay', 'strategy']);
  initText('#editor-gameplay-note', ['gameplay', 'note']);

  initRadio('[name=editor-signature-rating]', ['signature', 'rating']);
  initText('#editor-signature-name', ['signature', 'name']);
  initText('#editor-signature-description', ['signature', 'description']);
  initText('#editor-signature-note', ['signature', 'note']);

  initRadio('[name=editor-heavy-rating]', ['heavy', 'rating']);
  initText('#editor-heavy-description', ['heavy', 'description']);
  initText('#editor-heavy-note', ['heavy', 'note']);

  initRadio('[name=editor-special-1-rating]', ['specials', '1', 'rating']);
  initText('#editor-special-1-description', ['specials', '1', 'description']);
  initMultiSelect('#editor-special-1-abilities', ['specials', '1', 'abilities']);
  initMultiSelect('#editor-special-1-damagetypes', ['specials', '1', 'damagetypes']);
  initMultiSelect('#editor-special-1-ranges', ['specials', '1', 'ranges']);
  initText('#editor-special-1-note', ['specials', '1', 'note']);

  initRadio('[name=editor-special-2-rating]', ['specials', '2', 'rating']);
  initText('#editor-special-2-description', ['specials', '2', 'description']);
  initMultiSelect('#editor-special-2-abilities', ['specials', '2', 'abilities']);
  initMultiSelect('#editor-special-2-damagetypes', ['specials', '2', 'damagetypes']);
  initMultiSelect('#editor-special-2-ranges', ['specials', '2', 'ranges']);
  initText('#editor-special-2-note', ['specials', '2', 'note']);

  initRadio('[name=editor-special-3-rating]', ['specials', '3', 'rating']);
  initText('#editor-special-3-description', ['specials', '3', 'description']);
  initMultiSelect('#editor-special-3-abilities', ['specials', '3', 'abilities']);
  initMultiSelect('#editor-special-3-damagetypes', ['specials', '3', 'damagetypes']);
  initText('#editor-special-3-note', ['specials', '3', 'note']);

  if(hasChampion){

    $('#editor-export').click(function(){
      var guide = CoC.data.guides.get(champion);
      var guideJson = JSON.stringify(guide.data, null, '\t');

      console.log(guideJson)

      var guideJsonName = champion + ".json";
      if (isInternetExplorer()){
        rosterExportFrame.document.open("application/json", "replace");
        rosterExportFrame.document.close();
        rosterExportFrame.focus();
        rosterExportFrame.document.execCommand('SaveAs', true, guideJsonName);
      }
      else{
        $('#editor-export')
          .attr('download', guideJsonName)
          .attr('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(guideJson));
      }
    }); 

    //json importer
    if(window.FileReader){
      $('#editor-import-input').unbind('change').change(function(e){
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          var file = this.files[0];
          reader.onload = function (e) {
            var json;
            try{
              json = JSON.parse(e.target.result);
            } 
            catch(e){
              console.error(e);
            }
            if(json) try{
              CoC.data.guides.raw[champion] = json;
              CoC.data.guides.init(champion);
              CoC.editor.reset(champion);
            } 
            catch(e){
              console.error(e);
            }
          };
          reader.readAsText(file);
          $(this).val("");
        }
      });
      $('#editor-import').unbind('click').click(function(){
        console.log("importing json...");
        $('#editor-import-input').click();
      });

      $('#editor-import').removeClass("ui-disabled");
    }
    //windows safari and other bullshit browsers that dont support FileReader
    else{
      $('#editor-import').addClass("ui-disabled");
    } 
    $('#editor-export').removeClass("ui-disabled");

    CoC.editor.view.render(champion, true);
    $('.editor-section').collapsible('enable').removeClass("ui-disabled");
    $($('.editor-section')[0]).collapsible('expand');
  }
  else{
    CoC.editor.view.$el.empty();
    $('.editor-section').collapsible('collapse').collapsible('disable').addClass("ui-disabled");
    $('#editor-import').addClass("ui-disabled");
    $('#editor-export').addClass("ui-disabled");
  }

  function hasKeys(object){
    for(var k in object)
      return true;
    return false;
  }

  function updateChampion(callback){
    if(!hasChampion)
      return;
    var guide = CoC.data.guides.get(champion);
    delete guide.data.unavailable;
    callback.call(null, guide.data);
    CoC.data.guides.set(champion, guide);
    CoC.editor.view.render(champion, true);
  }

  function initInput(type, binds, query, namespace){
    var i, initialValue;
    var el = $(query);
    var value = '';
    var object = guideData;
    for(i=0; i<namespace.length; i++)
      if(object)
        object = object[namespace[i]];
    if(object)
      value = object;
    if(type === 'multiselect'){
      el.val(value);
      el.select2('destroy').select2();
    }
    else if(type === 'checkboxradio'){
      if(value)
        $(query+'[value='+value+']').attr('checked', true);
      else
        $(query).attr('checked', false);
      el[type]('refresh');
    }
    else{
      el.val(value);
      el[type]('refresh');
    }
    initialValue = value;
    el.unbind(binds);
    el.bind(binds, function(e){
      updateChampion(function(guideData){
        var i;
        var data;
        var value;
        var object;
        var ordered;
        if(type === 'multiselect'){
          value = el.val();
          el.select2('destroy').select2();
        }
        else{
          value = e.target.value;
          el[type]('refresh');
        }
        if(!value){
          object = guideData;
          ordered = [];
          for(i=0; object[namespace[i]] && i < namespace.length; i++){
            ordered.push(object)
            if(i < namespace.length - 1)
              object = object[namespace[i]];
          }
          if(i === namespace.length){
            i--;
            delete object[namespace[i]];
            for(;i > 0; i--)
              if(!hasKeys(ordered[i])){
                delete ordered[i-1][namespace[i-1]];
              }
              else
                break;
          }
        }
        else{
          object = guideData;
          for(i=0; i < namespace.length - 1; i++)
            if(i < namespace.length - 1){
              object[namespace[i]] = object[namespace[i]] || {};
              object = object[namespace[i]];
            }
          object[namespace[i]] = value; 
        }
      });
    });
  }

  function isInternetExplorer() {
    return (window.navigator.userAgent.indexOf("MSIE ") !== -1 || 
      !!navigator.userAgent.match(/Trident.*rv\:11\./))? true: false;
  }
}
