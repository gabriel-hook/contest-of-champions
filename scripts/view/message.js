var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.MessageView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<div class="message"><%= message %></div>'),
  render:function(){  
    this.$el.html( this.template( this.model ) );
    return this;
  }
});