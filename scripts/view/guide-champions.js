var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.GuideChampionsView = Backbone.View.extend({
  initialize: function(){
    var that = this;
    that._guideViews = {};
    that._championViews = [];
    that._activeUID = null;
    that._uids = [];
    that._indices = {};
    that._selector = $("#guide-champions-selector");
    
    var uids = _.uniq( CoC.data.champions.pluck("uid") );
    
    _(uids).each(function(uid){
      var guide = CoC.guides.get(uid);
      var champion = guide.champion;
      var view = new CoC.view.ChampionView({
        model:champion
      });
      view.render();
      that._championViews.push( $("<li>").append( view.el )[0] );
      that._selector.append($('<option>', { value:uid }).text( champion.get("name") ));
      
      //set uids map
      that._indices[uid] = that._uids.length;
      that._uids.push(uid);
    });
    
    that._selector.change(function(event){
      var uid = this.value;
      var index = that._indices[uid];
      that.active.call(that, event, index, 0);
      
      that._skip = true;
      that.sly.activate(index);
    });
    
    that.sly = new Sly( "#guide-champions-frame", {
      horizontal: 1,
      itemNav: 'forceCentered',
      activateMiddle: 1,
      smart: 1,
      activateOn:'click',
      scrollBy:1,    
      mouseDragging:1,
      touchDragging:1,
      releaseSwing:1,
      speed:0
    },{
      active:function(event,index){
        
        if(that._skip){
          that._skip = false;
          return;
        }
      
        that.active.call(that, event, index, 250);
      }
    }).init();
    
    //reload on page resize
    $(window).bind("resize", function(){
      that.sly.reload(true, true);
      setTimeout(function(){
        if(CoC.hasUrlParam("page-guide") === false)
          return;
        that.sly.reload();
      }, 250);
    });
  },
  
  events:{
    "click .champion":"clicked"
  },
  
  disable:function(){
    this.sly.set('keyboardNavBy', null);
  },
  
  enable:function(){
    this.sly.set('keyboardNavBy', 'items');
  },
  
  reload:function(){
    var that = this;
    if(CoC.hasUrlParam("page-guide") === false)
      return;
    that.sly.reload();
    setTimeout(function(){
      if(CoC.hasUrlParam("page-guide") === false)
        return;
      that.sly.reload();
    }, 250);
  },
  
  select:function(uid){
    var that = this;
    var index = (uid === undefined)? undefined: (typeof uid === "string")? this._indices[uid]: uid;
    if(index === undefined){
      CoC.setUrlParam("page-guide","guide",this._activeUID);
      return;
    }
    that.sly.activate(index, true);
  },
  
  active:function(event, index, delay){
    var item = this.sly.items[index];
    var uid = $(item.el).find(".champion").attr("uid");
    var guide = CoC.guides.get(uid);
    var view = this._guideViews[uid];
    if(!view){
      try{
        if(guide.data !== undefined)
          view = new CoC.view.GuideView({ model:guide });
      }
      catch(error){
        console.log(error);
      }
      //either missing or just broken
      if(!view)
        view = new CoC.view.GuideMissingView({ model:guide });
      view.render();
      this._guideViews[uid] = view;   
    } 
    
    var that = this;
    that._activeUID = uid;
    setTimeout(function(){
      that.guide.call(that, uid);
    }, delay);
  },
  
  guide: function(uid){
    //if we aren't even looking at guides anymore
    if(CoC.hasUrlParam("page-guide") === false)
      return;
  
    //if another has been picked in this time
    if(this._activeUID !== uid)
      return;
      
    this._selector.val(uid).selectmenu("refresh")
  
    var guide = CoC.guides.get(uid);
    var view = this._guideViews[uid];
    
    var el = $("#guide-content");
    el.empty();
    el.append( $("<img>").addClass("background").attr("src", guide.champion.image() ) );
    el.append( view.el );
    el.trigger("create");
    
    //scroll to beginning when we replace, and set url so a refresh goes back here
    $.mobile.silentScroll(0);
    CoC.setUrlParam("page-guide","guide",uid);
  },
  
  render: function(){
    this.$el.empty();
    
    //TODO: sort this list
    var container = document.createDocumentFragment();
    _(this._championViews).each(function(view){
      container.appendChild( view );
    });
    this.$el.append(container);
    return this;
  },
  
  destroy: function(){
    this.remove();
    this.unbind();
  }
});