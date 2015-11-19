define(['utils', 'models/ServiceTypeCollection', 'models/ServiceTypeGroupInfoModel'],function(utils, ServiceTypeCollection, ServiceTypeGroupInfoModel){
	var model = Backbone.Nakoruru.Model.extend({
		subModel: {
			"info": {
				"type": ServiceTypeGroupInfoModel,
				"events": {
					"change" : "infoChanged"
				}
			},
			// option1: automatically send event to parrent
			// option2: make decition then send
			"configRuleGroups": {
				"type": ServiceTypeCollection,
				"events": {
					"update" : "configRuleGroupsUpdate"
				}
			},
		},

		// Think more about  it, move events to other attribute
		/*
		subModelEvent: {
			"info:change:attr1": "infoChanged"
		}
		*/

		defaults: {
		},
		isValidate: function(){
			// add validate here
			utils.log("ServiceTypeGroupModel: isValidate called");
			return true;
		},
		infoChanged: function(){

		},
		configRuleGroupsUpdate: function(){
			
		}
	});
	return model;
});
