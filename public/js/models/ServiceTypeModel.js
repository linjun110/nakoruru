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
			return true;
		},
		infoChanged: function(){
		// this.model need to know the detail of subModel
		// but it doesn't know what the childModel is for configRulesCollection
			console.log("ServiceTypeModel detect infoChanged");
			if(this.get("info").get("addNewButtonClicked")){
				// so we have to let configRulesCollection do the adding.
				this.get("configRules").addChild();
				this.get("info").set("addNewButtonClicked", false);
			}
		},
		configRulesUpdate: function(){
			console.log("ServiceTypeModel detect configRulesUpdate");
		}
	});
	return model;
});
