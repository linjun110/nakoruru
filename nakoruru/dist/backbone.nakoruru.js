// Nakoruru (Backbone.Nakoruru)
// ----------------------------------
// v1.0.0
//
// Copyright (c)2015 Linjun.
// Distributed under MIT license
//
// http://mocklinjun.com


var Nakoruru = (function(global, Backbone, _){
  //"use strict";
  var Nakoruru = {};
  Backbone.Nakoruru = Nakoruru;

  Nakoruru.$ = Backbone.$;
  Nakoruru.extend = Backbone.View.extend;

  return Nakoruru;
})(this, Backbone, _);
// defined by me
var nako_bindEntityEvents = function(model, eventsMap, context){
	_.each(eventsMap, function(cbName, event){
	  this.listenTo(model, event, this[cbName], this);
	}, context);
};

var nako_unbindEntityEvents = function(model){
	// TODO: not quite sure if it's correct
	model.off();
};

 (function(Nakoruru) {
    'use strict';
  
    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function bindFromStrings(target, entity, evt, methods) {
      var methodNames = methods.split(/\s+/);
  
      _.each(methodNames, function(methodName) {
  
        var method = target[methodName];
        if (!method) {
          throw new Error('Method "' + methodName +
            '" was configured as an event handler, but does not exist.');
        }
  
        target.listenTo(entity, evt, method);
      });
    }
  
    // Bind the event to a supplied callback function
    function bindToFunction(target, entity, evt, method) {
      target.listenTo(entity, evt, method);
    }
  
    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function unbindFromStrings(target, entity, evt, methods) {
      var methodNames = methods.split(/\s+/);
  
      _.each(methodNames, function(methodName) {
        var method = target[methodName];
        target.stopListening(entity, evt, method);
      });
    }
  
    // Bind the event to a supplied callback function
    function unbindToFunction(target, entity, evt, method) {
      target.stopListening(entity, evt, method);
    }
  
    // generic looping function
    function iterateEvents(target, entity, bindings, functionCallback, stringCallback) {
      if (!entity || !bindings) { return; }
  
      // type-check bindings
      if (!_.isObject(bindings)) {
        throw new Error({
          message: 'Bindings must be an object or function.',
          url: 'nakoruru.functions.html#marionettebindentityevents'
        });
      }
  
      // allow the bindings to be a function
      bindings = Nakoruru._getValue(bindings, target);
  
      // iterate the bindings and bind them
      _.each(bindings, function(methods, evt) {
  
        // allow for a function as the handler,
        // or a list of event names as a string
        if (_.isFunction(methods)) {
          functionCallback(target, entity, evt, methods);
        } else {
          stringCallback(target, entity, evt, methods);
        }
  
      });
    }
  
    // Export Public API
    Nakoruru.bindEntityEvents = function(target, entity, bindings) {
      iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
    };
  
    Nakoruru.unbindEntityEvents = function(target, entity, bindings) {
      iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
    };
  
    // Proxy `bindEntityEvents`
    Nakoruru.proxyBindEntityEvents = function(entity, bindings) {
      return Nakoruru.bindEntityEvents(this, entity, bindings);
    };
  
    // Proxy `unbindEntityEvents`
    Nakoruru.proxyUnbindEntityEvents = function(entity, bindings) {
      return Nakoruru.unbindEntityEvents(this, entity, bindings);
    };
  })(Nakoruru);

// Object
// ------

// A Base Class that other Classes should descend from.
// Object borrows many conventions and utilities from Backbone.
// Borrow from marinette.
Nakoruru.Object = function(options) {
  this.options = _.extend({}, _.result(this, 'options'), options);

  this.initialize.apply(this, arguments);
};

Nakoruru.Object.extend = Nakoruru.extend;

// Object Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(Nakoruru.Object.prototype, Backbone.Events, {

  //this is a noop method intended to be overridden by classes that extend from this base
  initialize: function() {},

  destroy: function() {
    this.triggerMethod('before:destroy');
    this.triggerMethod('destroy');
    this.stopListening();

    return this;
  },

  // Import the `triggerMethod` to trigger events with corresponding
  // methods if the method exists
  triggerMethod: Nakoruru.triggerMethod,

  // A handy way to merge options onto the instance
  mergeOptions: Nakoruru.mergeOptions,

  // Proxy `getOption` to enable getting options from this or this.options by name.
  getOption: Nakoruru.proxyGetOption,

  // Proxy `bindEntityEvents` to enable binding view's events from another entity.
  bindEntityEvents: Nakoruru.proxyBindEntityEvents,

  // Proxy `unbindEntityEvents` to enable unbinding view's events from another entity.
  unbindEntityEvents: Nakoruru.proxyUnbindEntityEvents
});

/* Respositility.
  1. parse to subModels.
  2. listen to subModels.
*/
Nakoruru.Model = Backbone.Model.extend({
  initialize: function(){
    this.parse();
  },
  parse: function(){
    this.subModel = this.subModel || {};

    _.each(this.attributes, function(val, key){
      if( !_.isUndefined( this.subModel[key] ) ){
        var subModelClazz = this.subModel[key].type || (_.isArray(val)? Backbone.Collection : Backbone.Model);
        var subModelEvents = this.subModel[key].events || {};
        var sub = new subModelClazz(val);
        sub.modelParent = this;
        this.set( key, sub );

        // listen to sub models
        nako_bindEntityEvents(sub, subModelEvents, this);
      }
    }, this);
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

Nakoruru.Collection = Backbone.Collection.extend({
  initialize: function(){
    this.setUpListening();
  },
  setUpListening: function(){
    var _this = this;

    // the reason use setTimeout is that in backbone, 
    //the initialize is called before all models are added to this.models
    setTimeout(function(){
      // In backbone, collection just listen to model remove & add events, then trigger a 'update'
      // Here we also listen to model change event
      _.each(_this.models, function(model){
        this.listenTo(model, "change", function(){
          this.trigger("update");
        }, this);
      }, _this);
    });
  },
  addChild: function(){
    var childModelClass = this.model || Backbone.Model;
    var childToAdded = new childModelClass();
    this.add(childToAdded);
  }
});

 /* Resposibility:
  1. as attr of Region, manage and render each part.
 */
 Nakoruru.Region = Nakoruru.Object.extend({
    constructor: function(options) {
      options = options || {};
      _.extend(this, options);
      this.$el = this.owner.$el.find(this.selector);
    },
    show: function(view){
      var _this = this;

      view._parentView = this.owner;
      view._parentRegion = this;

      view.render();

      this._attachHtml(view);

      view.trigger("show");
    },

    _attachHtml: function(view) {
      this.$el.empty();
      this.$el.append(view.$el);
    },
  });

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