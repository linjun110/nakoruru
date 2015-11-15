define(['utils', 'models/ConfigRuleCollection', 'models/ServiceTypeInfoModel'],function(utils, ConfigRuleCollection, ServiceTypeInfoModel){
	var model = Backbone.Nakoruru.Model.extend({
		subModel: {
			"info": { 
				"type" : ServiceTypeInfoModel,
				"events": {
					"change" : "infoChanged"
				}
			},
			"configRules": { 
				"type" : ConfigRuleCollection,
				"events": {
					"update" : "configRulesUpdate"
				}
			}
		},
		defaults: {
		},
		isValidate: function(){
			// add validate here
			utils.log("ServiceTypeModel: isValidate called");
			return true;
		},
		infoChanged: function(){
			console.log("ServiceTypeModel detect infoChanged");
		},
		configRulesUpdate: function(){
			console.log("ServiceTypeModel detect configRulesUpdate");
		}
	});
	return model;
});
