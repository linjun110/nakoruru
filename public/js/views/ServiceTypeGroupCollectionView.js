define(['utils', 'views/ServiceTypeGroupView'],function(utils, childView){
	view = Backbone.Nakoruru.View.extend({
		//template: _.template(Template),
		childView: childView,

		events:{
		},
		collectionEvents: {
		},
		initialize: function(){
			utils.log("ServiceTypeGroupCollection initialize");
		},
		onShow: function () {
			utils.log("ServiceTypeGroupCollectionView onShow");
		}
	});
	return view;
});
