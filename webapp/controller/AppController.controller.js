sap.ui.define([
	"sampleAppUI5Application/controller/BaseController",
	"sap/m/MessageToast"
	], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("sampleAppUI5Application.controller.AppController", {
			onInit: function(){
				this._onLoadJson();
			},
			_onLoadJson: function(oEvent){
				var oView = this.getView();
				var self = this;
				var sUrlPosts = "/OpenJSON/photos";
				oView.setBusy(true);
				$.get(sUrlPosts)
					.done(function(results){
						oView.setBusy(false);
						self._busyDialog(4000, 0);
						self._mapPostResults(results);
					}).fail(function(err){
						oView.setBusy(false);
						if(err !== undefined){
							var oErrorResponse = $.parseJSON(err.responseText);
							MessageToast.show(oErrorResponse.message, {
								duration: 6000
							});
						} else {
							MessageToast.show("Unknown Error!");
						}
					});
			},
			_mapPostResults: function(results){
				var oModel = this.getView().getModel();
				var postArrayResults = [];
				
				for(var i = 0; i < results.length; i++){
					postArrayResults.push(results[i]);
				}
				oModel.setProperty("/photos", postArrayResults);
			},
			_busyDialog: function(iDuration, iDelay){
				sap.ui.core.BusyIndicator.show(iDelay);
				if (iDuration && iDuration > 0) {
					if (this._sTimeoutId) {
						jQuery.sap.clearDelayedCall(this._sTimeoutId);
						this._sTimeoutId = null;
					}
					this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
						this.hideBusyIndicator();
					});
				}
			},
			hideBusyIndicator : function() {
				sap.ui.core.BusyIndicator.hide();
				MessageToast.show("Data Loaded!");
			},
			//This code will enable the panel container below the list itself and bind the list data accrodingly
			onItemSelected: function(oEvent){
				var oSeletedItem = oEvent.getSource();
				var oContext = oSeletedItem.getBindingContext();
				//console.log(oContext);
				var sPath = oContext.getPath();
				//console.log(sPath);
				
				var oDetailsPanel = this.byId("detailsPanel");
				oDetailsPanel.bindElement({path: sPath});
				this.byId("detailsPanel").setVisible(true);
				
			},
			//This function is enabling the route to the detail page when list element is selected
			onNaviToAnother: function(oEvent){
				//var seletedItemId=oEvent.getSource().getBindingContext().getProperty("id");
				var seletedItemId=oEvent.getSource().getBindingContext().getPath();
				//console.log("before regEx: " + seletedItemId);
				seletedItemId = seletedItemId.replace(/[^\d.]/g, "");
				//console.log("after regEx: " + seletedItemId);
				this.getRouter().navTo("detailsPage", {
					photoId: seletedItemId
				});
			},
			// Implementing the Refresh Button
			refreshDataFromBackend: function(oEvent){
				window.setTimeout(this._onLoadJson(), 10000);
				
			}
	});
});