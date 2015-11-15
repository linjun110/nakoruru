var Linjun = (function(global, Backbone, _){
  //"use strict";
  var Linjun = {};
  Backbone.Linjun = Linjun;

  //Linjun.$ = Backbone.$;

  Linjun.Model = Backbone.Model.extend({
    initialize: function(){
      this._parse();
    },
    _parse: function(){
      var _this = this;
      _this.subModel = _this.subModel || {};

      var modelRole;
      var collectionRole;
      _.each(this.attributes, function(val, key){
        if( !_.isUndefined( _this.subModel[key] ) ){
          var sub = new _this.subModel[key](val);
          sub.sbrParent = _this;

          if(sub instanceof Backbone.Model){
            modelRole = sub;
          }else if(sub instanceof Backbone.Collection){
            collectionRole = sub;
          }
          _this.set( key, sub );
        }
      });
      if(modelRole && collectionRole){
        modelRole.sbrSibling = collectionRole;
      }
    },

    _clonePrimaryAttrs: function(){
      var data = {};
      _.each(this.attributes, function(val, key){
        if(_.isString(val) || _.isNumber(val) || _.isBoolean(val)){
          data[key] = val;
        }
      });
      return data;
    },
    // api to set model
    _set: function(key, value){

      // get whole data
      var data = this._clonePrimaryAttrs();

      if(!_.isUndefined(key) && !_.isUndefined(value)){
        data[key] = value;  
      }
      
      data = this.recalc(data);
      this.set(data);
    },

    refresh: function(){
      this._set();
    },
    asyncRefresh: function(){
      var _this = this;
      setTimeout(function(){
        _this.refresh();
      });
    }, 

    recalc: function(data){
      return data;
    }
  });

  Linjun.ItemView = Backbone.Marionette.CompositeView.extend({
    initialize: function(){
      if(_.isFunction(this._initialize)){
        this._initialize();
      }
    },

    modelEvents: {
        "change": "modelChanged"
    },

    //MODEL事件Handler
    modelChanged: function(model){
        console.log("modelChanged, model: ");
        console.log(model);
        if(_.isFunction(this._modelChanged)){
          this._modelChanged();
        }
        this.render();
    }
  });
  Linjun.CompositeView = Backbone.Marionette.CompositeView.extend({
    initialize: function(){
      this.views = {};
      var _model = this.model.attributes;
      _.each(_model, function(val, key){
        if(val instanceof Backbone.Model){
          this.model = val;
        }else if(val instanceof Backbone.Collection){
          this.collection = val;
        }
      }, this);

      this.undelegateEvents();
      this.delegateEvents();

      if(_.isFunction(this._initialize)){
        this._initialize();
      }
    },
    refreshModel: function(){
      this.model.asyncRefresh();
    },
    onShow: function(){
      if(this.model){
        this.model.refresh();
      }
      if(_.isFunction(this._onShow)){
        this._onShow();
      }
    },
    modelEvents: {
        "change": "modelChanged"
    },

    //MODEL事件Handler
    modelChanged: function(model){
      if(_.isFunction(this._modelChanged)){
        this._modelChanged();
      }
      this.render();
    },

    collectionEvents: {
      "add": "collectionModelAdded refreshModel",
      "change": "collectionModelChanged refreshModel",
      "destroy": "collectionModelDestroyed refreshModel"
    },

    collectionModelAdded: function(model){
      console.log("collectionModelAdded, model: ");
      console.log(model);
      if(_.isFunction(this._collectionModelAdded)){
        this._collectionModelAdded();
      }
    },
    collectionModelChanged: function(model){
      console.log("collectionModelChanged, model: ");
      console.log(model);
      if(_.isFunction(this._collectionModelChanged)){
        this._collectionModelChanged();
      }
    },
    collectionModelDestroyed: function(model){
      console.log("collectionModelDestroyed, model: ");
      console.log(model);
      if(_.isFunction(this._collectionModelDestroyed)){
        this._collectionModelDestroyed();
      }
    }
  });

  return Linjun;
})(this, Backbone, _);
