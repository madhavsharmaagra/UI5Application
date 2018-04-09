sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			oModel.setData({
				photos: [{
					"albumId": "",
			    	"id": "",
			    	"title": "",
			    	"url": "",
			    	"thumbnailUrl": ""
				}],
				edits: {
					"albumId": "",
			    	"id": "",
			    	"title": "",
			    	"url": "",
			    	"thumbnailUrl": ""
				}
			});
			return oModel;
		}

	};
});