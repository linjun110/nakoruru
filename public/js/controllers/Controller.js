define(['utils', 'views/TemplatePageRootView', 'models/TemplateModel'],function(utils, TemplatePageRootView, TemplateModel){
	var _controller = Backbone.Marionette.Controller.extend({
		app: null,
		initialize: function(options){
			this.app = options.app;

			this.app.pageContent.on("show", function(view){
				//console.log("content_region show:",view);
			});
			this.app.pageContent.on("close", function(view){
				//console.log("content_region close:",view);
			});
		},
		createTemplate: function () {
			// step1: fetch data
			// step2: change BM to DM
			var dmJson = {
				// a view
				templateName: {
					name: "templateName"
					//other attr for display
				},
				// another view
				rateModel: {
					value: "shipment_based"
				},
				// another view
				primeSetting: {
					isEnabled: false
				},
				serviceTypeGroups: [
					// a composite view (high in related)
					{
						info: {
							name: "ServiceTypeGroupName1",
							isRestricted: true,
							errorOrWarning: ""
						},
						configRuleGroups: [
							{
								info: {
									name: "ServiceType1", 
									isRestricted: false,
									errorOrWarning: ""
								},
								configRules: [
									{
										regions: "ConfigRule1_Regions",
										addressType: "street",
										addressTypeOptions: [
											{
												value: "street",
												text: "street"
											},
											{
												value: "pobox",
												text: "pobox"
											}
										],
										shippingTime: "1-2",
										shippingTimeOptions: [
											{
												value: "1-2",
												text: "1-2 Days"
											},
											{
												value: "3-4",
												text: "3-4 Days"
											}
										],
										unitPrice: "1",
										pricePerOrder: "2"
									},
									{
										regions: "ConfigRule1b_Regions",
										addressType: "pobox",
										addressTypeOptions: [
											{
												value: "street",
												text: "street"
											},
											{
												value: "pobox",
												text: "pobox"
											}
										],
										shippingTime: "3-4",
										shippingTimeOptions: [
											{
												value: "1-2",
												text: "1-2 Days"
											},
											{
												value: "3-4",
												text: "3-4 Days"
											}
										],
										unitPrice: "3",
										pricePerOrder: "4"
									}
								]
							},
							{
								info: {
									name: "ServiceType2", 
									isRestricted: false,
									errorOrWarning: ""
								},
								configRules: [
									{
										regions: "ConfigRule2_Regions",
										addressType: "street",
										addressTypeOptions: [
											{
												value: "street",
												text: "street"
											},
											{
												value: "pobox",
												text: "pobox"
											}
										],
										shippingTime: "3-4",
										shippingTimeOptions: [
											{
												value: "1-2",
												text: "1-2 Days"
											},
											{
												value: "3-4",
												text: "3-4 Days"
											}
										],
										unitPrice: "5",
										pricePerOrder: "6"
									}
								]
							},
							{
								info: {
									name: "ServiceType3", 
									isRestricted: false
								},
								configRules: [
									{
										regions: "ConfigRule3_Regions",
										addressType: "street",
										addressTypeOptions: [
											{
												value: "street",
												text: "street"
											},
											{
												value: "pobox",
												text: "pobox"
											}
										],
										shippingTime: "3-4",
										shippingTimeOptions: [
											{
												value: "1-2",
												text: "1-2 Days"
											},
											{
												value: "3-4",
												text: "3-4 Days"
											}
										],
										unitPrice: "7",
										pricePerOrder: "8"
									}
								]
							}
						]
					}
				]
			};
			
			var dm = new TemplateModel(dmJson);
			window.dm = dm;
			// here assume it's the same, KEYNOTE: the format should be view->model

			// step3: render
			var _app = this.app;
			var _view = new TemplatePageRootView({model: dm, isRootView: true});
			
		}
	});
	return _controller;	
});
