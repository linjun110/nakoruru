define(['utils', 'views/ConfigRuleView'],function(utils, childView){
	view = Backbone.Nakoruru.View.extend({
		//template: _.template(Template),
		childView: childView,
		tagName: "tbody",

		events:{
		},
		collectionEvents: {
	      "remove": "collectionModelDestroyed",
	      "update": "collectionUpdated"
	    },
	    collectionModelDestroyed: function(){
	    	console.log("ConfigRuleCollectionView detect model destroy");
	    	this.render();
	    },
	    collectionUpdated: function(){
	    	console.log("configRuleCollectionView detect model Update");
	    	this.render();
	    },
		initialize: function(){
			//utils.log("ServiceTypeCollection initialize");
		},
		onShow: function () {
			//utils.log("ServiceTypeCollectionView onShow");
		}
	});
	return view;
});
