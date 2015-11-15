define(['utils', 'models/TemplateNameModel', 'models/RateModelModel', 'models/PrimeSettingModel', 'models/ServiceTypeGroupCollection'],function(utils, TemplateNameModel, RateModelModel, PrimeSettingModel, ServiceTypeGroupCollection){
	var model = Backbone.Nakoruru.Model.extend({
		subModel: {
			"templateName": { "type" : TemplateNameModel},
			"rateModel": { "type" : RateModelModel},
			"primeSetting": { "type" : PrimeSettingModel},
			"serviceTypeGroups": { "type" : ServiceTypeGroupCollection}
		},
		defaults: {
		}
	});
	return model;
});
