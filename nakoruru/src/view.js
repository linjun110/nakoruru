
/* Responsibility:
  1. Monitor DOM event -> set Model
  2. Monitor Model -> render
*/
Nakoruru.View = Backbone.View.extend({
    constructor: function(options) {
      options = options || {};
      _.extend(this, options);

      this.views = {};

      if(!options.isRootView){
        this.$el = Nakoruru.$(document.createDocumentFragment());
      }else{
        this.el = Nakoruru.$(document);
      }

      Backbone.View.call(this, options);

      this.on("show", this._onShow);

      // listen to model
      if(_.isUndefined(this.model) || this.model instanceof Backbone.Model){
        if(this.modelEvents){
          nako_bindEntityEvents(this.model, this.modelEvents, this);
        }
      }else if(this.model instanceof Backbone.Collection){
        if(this.collectionEvents){
          nako_bindEntityEvents(this.model, this.collectionEvents, this);
        }
      }

      if(options.isRootView){
        this.render();
        this.trigger("show");
      }
    },

    _onShow: function(){
      if(this.onShow){
        this.onShow();
      }
    },

    _initializeRegions: function() {
      this._regions = this._regions || {};
      _.each(this.regions, function(selector, name){
        this._regions[name] = new Nakoruru.Region({
          owner: this,
          selector: selector
        });
      }, this);
    },

    getRegion: function(regionName){
      return this._regions[regionName];
    },

    render: function(){
      if(_.isUndefined(this.model) || this.model instanceof Backbone.Model){
        this._renderModel();
      }else if(this.model instanceof Backbone.Collection){
        this._renderCollection();
      }
    },
    _renderCollection: function(){
      // clean first

      _.each(this._childViews, function(childView){
        childView.remove();
      }, this);

      // need to manage all child views
      this._childViews = this._childViews || [];

      if(this.childView){
        _.each(this.model.models, function(model){
          // new
          var _childview = new this.childView({model: model});
          // render
          _childview.render();
          // append element
          this.$el.append(_childview.$el);
          this._childViews.push(_childview);
          // trigger event
          _childview.trigger("show");
        }, this);
      }

      return this;
    },

    _renderModel: function(){
      this.undelegateEvents();
      
      // render
      if(!this.isRootView){
        this.el = this.template? this.template( this.model? this.model.toJSON():{} ) : "";

        this.$el.empty();

        this.$el.append(this.el);
      }

      this._initializeRegions();

      this.delegateEvents();
      return this;
    }
  });