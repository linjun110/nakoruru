define(['backbone', 'models/ServiceTypeModel'],function(backbone, Model){
	var collection = Backbone.Collection.extend({
  		model: Model
	});
	return collection;
});
