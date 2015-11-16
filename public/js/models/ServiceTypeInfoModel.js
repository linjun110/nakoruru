define(['utils'],function(utils){
	var model = Backbone.Nakoruru.Model.extend({
		defaults: {
			"name":  "",
			"isRestricted": false,
			"errorOrWarning": "",
			"addNewButtonClicked": false
		},
		recalc: function(data){
			data["errorOrWarning"] = "";
			if(this.sbrSibling){
				var sameCharge = true;
				if(this.sbrSibling.models.length > 0){
					var unitPrice = this.sbrSibling.models[0].get("unitPrice");
					sameCharge = _.every(this.sbrSibling.models, function(model){
						return model.get("unitPrice") === unitPrice;
					});
				}
				if(sameCharge){
					data["errorOrWarning"] = "";
				}else{
					data["errorOrWarning"] = "All config rule should be same charge";
				}

				if(data["errorOrWarning"] !== ""){
					return data;
				}
			}
			if(data["isRestricted"]){
				data["errorOrWarning"] = "You disdable service type";
			}else{
				data["errorOrWarning"] = "You enable service type";
			}
			return data;
		}
	});
	return model;
});
