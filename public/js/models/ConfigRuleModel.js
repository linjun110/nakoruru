define(['utils'],function(utils){
	var model = Backbone.Nakoruru.Model.extend({
		// TODO: add event listen
		defaults: {
			"regions":  "",
			"addressType": "street",
			"addressTypeOptions": [
				{
					value: "street",
					text: "street"
				},
				{
					value: "pobox",
					text: "pobox"
				}
			],
			"shippingTime": "1-2",
			"shippingTimeOptions": [
				{
					value: "1-2",
					text: "1-2 Days"
				},
				{
					value: "3-4",
					text: "3-4 Days"
				}
			],
			"unitPrice": "0.0",
			"unitPricePromptMsg": "",
			"pricePerOrder": "0.0"
		},
		isValidate: function(){
			utils.log("ConfigRuleModel: isValidate called");
			// add validate here
			if(!this._validateUnitprice()){
				return false;
			}
			return true;
		},
		_validateUnitprice: function(){
			return this.get("unitPrice") >= 0;
		},
		recalc: function(data){
			if(data["unitPrice"] < 0){
				data["unitPricePromptMsg"] = "Should be larger than 0";
			}else{
				data["unitPricePromptMsg"] = "";
			}
			return data;
		}

	});
	return model;
});
