define(['utils', 'text!templates/ServiceTypeGroupViewTemplate.html', 'views/ServiceTypeGroupInfoView', 'views/ServiceTypeCollectionView'],function(utils, Template, ServiceTypeGroupInfoView, ServiceTypeCollectionView){
	view = Backbone.Nakoruru.View.extend({
		template: _.template(Template),
		//childView: childView,
		//childViewContainer: "._container",
		//tagName: "tr",
		//className: "serviceTypeGroupView",

		regions: {
			serviceTypeGroupInfo: ".serviceTypeGroupInfo",
			serviceTypes: ".serviceTypes"
		},
		onShow: function () {

			this.views.serviceTypeGroupInfo = new ServiceTypeGroupInfoView({model: this.model.get("info")});
			this.getRegion("serviceTypeGroupInfo").show(this.views.serviceTypeGroupInfo);

			this.views.serviceTypes = new ServiceTypeCollectionView({model: this.model.get("configRuleGroups")});
			this.getRegion("serviceTypes").show(this.views.serviceTypes);
		}
	});
	return view;
});
