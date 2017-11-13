sap.ui.define([
    'jquery.sap.global',
    'lesson5/sample/controller/BaseController',
    'sap/m/Dialog',
    "sap/ui/model/json/JSONModel"
], function (jQuery, BaseController, Dialog, JSONModel) {
    "use strict";

    var TableController = BaseController.extend("lesson5.sample.controller.Table", {
        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table onpress event
         * @public
         */
        onPress: function(oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        },

        /**
         * Shows the selected item on the object page
         * On phones a additional history entry is created
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject: function(oItem) {
            this.getRouter().navTo("object", {
                Id: oItem.getBindingContext().getProperty("Id"),
                SupplierId: oItem.getBindingContext().getProperty("SupplierId")
            }
            );
        },
        /**
         * Create dialog for future of input value. Will add the
         * product in the (local) model.
         * @public
         */
        _getDialog: function () {
            //Create the Dialog view
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("lesson5.sample.view.review.Dialog", this);
                this.getView().addDependent(this._oDialog);
            }
            return this._oDialog;
        },
        /**
         * Event handler for the add button. Open this dialog
          * @param {sap.ui.base.Event} oEvent the table on open dialog event
         * @public
         */
        onOpenDialog: function (oEvent) {
            var oSource = oEvent.getSource(),
                // get a array of reviews
                aReviewPath = oEvent.getSource().getBindingContext().getProperty().Reviews.__list,
                aReview = [];
            // search objects of review with same path
            for (var i = 0; i < aReviewPath.length; i++) {
            var oFindReveiew = oSource.getModel().oData[[aReviewPath[i]]];
                // create one global reviews object
                aReview.push(oFindReveiew);
            }
            // open dialog
            this._getDialog().open();
            // bind element for "View dialog", need just a Title
            sap.ui.getCore().byId("dialog").bindElement("/" + aReviewPath[0]);
            var oReview = new JSONModel(aReview);
            this.getView().setModel(oReview, "reviews");
        },
        /**
        * Event handler for the close button in the dialog window.Close this dialog
        * @public
        */
        onCloseDialog : function () {
            this._getDialog().close();
        }
    });
    return TableController;

});
