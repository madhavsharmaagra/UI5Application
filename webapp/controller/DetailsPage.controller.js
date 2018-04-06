sap.ui.define([
	"sampleAppUI5Application/controller/BaseController"
	], function(BaseController){
		"use strict";
		
		return BaseController.extend("sampleAppUI5Application.controller.DetailsPage", {
			onInit: function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("detailsPage").attachMatched(this._onRouteMatched, this);
			},
			//This function binds the data 
			_onRouteMatched: function(oEvent){
				var oArgs = oEvent.getParameter("arguments");
				var sPath = "/photos/" + oArgs.photoId;
				//console.log(sPath);
				var oDetailsPanel = this.byId("detailsPanel");
				oDetailsPanel.bindElement({path: sPath});
				this.byId("detailsPanel").setVisible(true);
			},
			handleEditPress: function(){
				this._toggleButtonsAndView(true);
			},
			handleSavePress: function(){
				this._toggleButtonsAndView(false);
			},
			handleCancelPress: function(){
				this._toggleButtonsAndView(false);	
			},
			//Toggling the View for the Save/Cancel and Edit
			_toggleButtonsAndView: function(bEdit){
				var oView = this.getView();
				oView.byId("edit").setVisible(!bEdit);
				oView.byId("save").setVisible(bEdit);
				oView.byId("cancel").setVisible(bEdit);
			}
			
		});
	});