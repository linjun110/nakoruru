define(['utils', 'text!templates/ServiceTypeViewTemplate.html', 'views/ServiceTypeInfoView', 'views/ConfigRuleCollectionView'],function(utils, Template, ServiceTypeInfoView, ConfigRuleCollectionView){
	view = Backbone.Nakoruru.View.extend({
		template: _.template(Template),
		regions: {
			serviceTypeInfo: ".serviceTypeInfo",
			configRules: ".configRules"
		},
		onShow: function(){

			this.views.serviceTypeInfo = new ServiceTypeInfoView({model: this.model.get("info")});
			this.getRegion("serviceTypeInfo").show(this.views.serviceTypeInfo);

			this.views.configRules = new ConfigRuleCollectionView({model: this.model.get("configRules")});
			this.getRegion("configRules").show(this.views.configRules);
		}
	});
	return view;
});
