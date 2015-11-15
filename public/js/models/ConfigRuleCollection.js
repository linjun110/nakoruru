define(['utils', 'models/ConfigRuleModel'],function(utils, Model){
	var collection = Backbone.Nakoruru.Collection.extend({
  		model: Model
	});
	return collection;
});
