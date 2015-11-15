define(['utils', 'models/ServiceTypeCollection', 'models/ServiceTypeGroupInfoModel'],function(utils, ServiceTypeCollection, ServiceTypeGroupInfoModel){
	var model = Backbone.Nakoruru.Model.extend({
		subModel: {
			"info": {
				"type": ServiceTypeGroupInfoModel,
				"events": {
					"change" : "infoChanged"
				}
			},
			"configRuleGroups": {
				"type": ServiceTypeCollection,
				"events": {
					"update" : "configRuleGroupsUpdate"
				}
			},
		},
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
