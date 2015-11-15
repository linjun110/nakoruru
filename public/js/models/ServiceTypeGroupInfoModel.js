define(['utils'],function(utils){
	var model = Backbone.Nakoruru.Model.extend({
		defaults: {
			"name":  "",
			"isRestricted": false,
			"errorOrWarning": ""
		},
		recalc: function(data){
			if(data["isRestricted"]){
				data["errorOrWarning"] = "You disdable service type group";
			}else{
				data["errorOrWarning"] = "You enable service type group";
			}
			return data;
		}
	});
	return model;
});
