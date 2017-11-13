sap.ui.define([
    "lesson5/sample/controller/BaseController",
    "sap/m/MessageToast"
], function (BaseController, MessageToast) {
    "use strict";
    return BaseController.extend("lesson5.sample.controller.Home", {
        /**
         * Navigator to "supplierMode" page
         * @param {sap.ui.base.Event} oEvent the button event
         * @public
         */
        onSupplierMode: function (oEvent) {
            this.getRouter().navTo("supplierMode");
        },
        /**
         * Event handler for the unlist button. Will delete the
         * product from the (local) model.
         * @public
         */
        onUnlistObjects: function () {
            // get a tableView
            var oTableView = this.getView().mAggregations.content[0].mAggregations.content[0].mAggregations.content[1];
            // get id from the select product
            var aSelectedProducts = oTableView.byId('idProductsTable').getSelectedItems();
            // find and delete it product
            for (var i = 0; i < aSelectedProducts.length; i++) {
                var sPath = aSelectedProducts[i].getBindingContextPath();
                oTableView.getModel().remove(sPath);
            }
            // show message about deleted product
            MessageToast.show(oTableView.getModel("i18n").getResourceBundle().getText("StockRemovedSuccessMsg", [aSelectedProducts.length]));

        },
        /**
         * Create dialog for future of input value. Will add the
         * product in the (local) model.
         * @public
         */
        getDialog: function () {
            //Create the Dialog view
            // associate controller with the fragment
            if (!this.oDialog) {
                this.oDialog = sap.ui.xmlfragment("lesson5.sample.view.Add", this);
                this.getView().addDependent(this.oDialog);
            }
            return this.oDialog;
        },
        /**
         * Event handler for the add button. Open this dialog
         * @public
         */
        onAddlistObjects: function () {
            this.getDialog().open();
        },
        /**
         * Event handler for the close button in the dialog window.Close this dialog
         * @public
         */
        onCloseDialog: function () {
            this.getDialog().close();
        },
        /**
         * Event handler for the ok button in the dialog window. Ok button.
         * Save inputted values and keys in the object
         * @public
         */
        onOk: function () {
            var object = new Object();
            var mass = this.oDialog.getContent();
            for (var i = 0, j = 1; i < mass.length; i = i + 2, j = j + 2) {
                object[mass[i].getProperty('text')] = mass[j].getProperty('value');
            }
            this.createColumn(object);
        },
        /**
         * Create empty row in the exist table to insert of value
         * I try to clone item element and change it, and insert into the table
         * "Doesn't work"
         * @public
         */
        createColumn: function (object) {
            debugger;
            var oTableView = this.getView().mAggregations.content[0].mAggregations.content[0].mAggregations.content[1];
            var oSelectedProducts = oTableView.byId('idProductsTable');
            /*var x = aSelectedProducts.mAggregations.items[0];
            var c = x.clone();
            aSelectedProducts.addItem(c);
            aSelectedProducts.bindItems();*/
            var m = oSelectedProducts.getModel();
            var o = m.oData["Products('" + object["Id"] + "')"] = object;
            m.refresh();
            this.getDialog().close();
        }
    });
});