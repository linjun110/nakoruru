
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