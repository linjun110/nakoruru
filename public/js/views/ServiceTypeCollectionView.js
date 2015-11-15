define(['utils', 'views/ServiceTypeView'],function(utils, childView){
	view = Backbone.Nakoruru.View.extend({
		//template: _.template(Template),
		childView: childView,

		events:{
		},
		collectionEvents: {
		},
		initialize: function(){
			utils.log("ServiceTypeCollection initialize");
		},
		onShow: function () {
			utils.log("ServiceTypeCollectionView onShow");
		}
	});
	return view;
});
