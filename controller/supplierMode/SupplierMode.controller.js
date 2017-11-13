sap.ui.define([
    'jquery.sap.global',
    'sap/m/Button',
    'sap/m/MessageToast',
    "lesson5/sample/controller/BaseController",
    "lesson5/sample/model/formatter"
], function (jQuery, Button, MessageToast, BaseController, formatter) {
    "use strict";

    var Controller = BaseController.extend("lesson5.sample.controller.supplierMode.SupplierMode", {

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
        /**
         * Event handler when a select item was changed
         * @param {sap.ui.base.Event} oEvent the select onSelectChange event
         * @public
         */
        onSelectChange: function (oEvent) {
            var oSelect = oEvent.getSource();
            var oSelectedItem = oSelect.getSelectedItem();
            var oBindingContext = oSelectedItem.getBindingContext();
            var ref = oBindingContext.getProperty().Supplier.__ref;
            this.setElementBinding(ref);
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Bind elements in the lable
         * @param {sap.ui.model.Model} oChangeElement - selected model of element
         * @public
         */
       setElementBinding: function (oChangeElement) {
            var oForm = this.getView().byId("addressForm");
            oForm.bindElement("/" + oChangeElement);
        },
        /**
         * Bind elements in the lable by default selected product
         * !!!Does not work!!!
         * @public
         */
        onAfterRendering: function () {
            var oSelect = this.getView().byId("select");
            this.getView().getModel().attachRequestCompleted(function () {

            }.bind(this))
        },
        /**
         * Bind default context
         * !!!Does not work!!!
         * * @param {sap.ui.model.Model} oCtx - need context of default selected product
         * @public
         */
        setFormBindingContext: function (oCtx) {
            var oForm = this.getView().byId("addressForm");
            oForm.setBindingContext(oCtx);
        },
        // formatter for mapUrl from API Nokia
        formatter: formatter
    });
    return Controller;

});