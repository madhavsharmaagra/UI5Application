sap.ui.define([
	"sampleAppUI5Application/controller/BaseController",
	"sap/ui/core/Fragment"
	], function(BaseController, Fragment){
		"use strict";
		
		return BaseController.extend("sampleAppUI5Application.controller.DetailsPage", {
			onInit: function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("detailsPage").attachMatched(this._onRouteMatched, this);
				this._showFormFragment("DetailsPageDisplay");
			},
			//This function binds the data 
			_onRouteMatched: function(oEvent){
				var oArgs = oEvent.getParameter("arguments");
				var sPath = "/photos/" + oArgs.photoId;
				
				//console.log(sPath);
				//var oDetailsPanel = this.byId("detailsPanelDisplay");
				//oDetailsPanel.bindElement({path: sPath});
				
				this.getView().bindElement(sPath);
				//this.byId("detailsPanelDisplay").setVisible(true);
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
				
				this._showFormFragment(bEdit ? "DetailsPageEdit" : "DetailsPageDisplay");
			},
			//
			_formFragments: {},
			
			_getFragments: function(sFragmentName){
				var oFormFragment = this._formFragments[sFragmentName];
				if (oFormFragment) {
					return oFormFragment;
				}
				oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "sampleAppUI5Application.view." + sFragmentName);
				//console.log("value in oFormFragment = " + oFormFragment);
				this._formFragments[sFragmentName] = oFormFragment;
				return this._formFragments[sFragmentName];
			},
			
			_showFormFragment: function(sFragmentName){
				//console.log("value of sFragmentName passed = " + sFragmentName);
				var oPage = this.getView().byId("detailPage");
				//console.log("value of oPage grabbed by getView.byId(detailPage) = " + oPage);
				oPage.removeAllContent();
				oPage.insertContent(this._getFragments(sFragmentName));
			}

		});
	});