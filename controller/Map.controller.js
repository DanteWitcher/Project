sap.ui.define([
    'jquery.sap.global',
    'sap/m/Button',
    'sap/m/MessageToast',
    "lesson5/sample/controller/BaseController",
    "lesson5/sample/model/formatter"
], function (jQuery, Button, MessageToast, BaseController, formatter) {
    "use strict";
    var Controller = BaseController.extend("lesson5.sample.controller.Map", {

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the object controller is instantiated.
         * We query the router for the route employee
         * and attach a private event listener function _onRouteMatched to the matched event of this route.
         * @param {sap.ui.base.Event} oEvent
         * @public
         */
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("object").attachMatched(this._onRouteMatched, this);
        },
        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Called when the object controller is instantiated
         * In _onRouteMatched we call bindElement() on the view to make sure
         * that the data of the specified employee is available in the view and it’s controls.
         * @param {sap.ui.base.Event} oEvent -  we can access the arguments parameter from the oEvent parameter
         * that contains all parameters of the pattern
         * @public
         */
        _onRouteMatched: function (oEvent) {
            var oArgs, oView;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();

            oView.bindElement({
                path: "/Suppliers('" + oArgs.SupplierId + "')",
                events: {
                    change: this._onBindingChange.bind(this)
                }
            });
        },
        /**
         * We also add an event handler to the change event as a private function _onBindingChange.
         * It checks if the data could be loaded by querying the binding context of the view.
         * As seen in the previous steps, we will display the notFound target if the data could not be loaded.
         * @param {sap.ui.base.Event} oEvent
         * @public
         */
        _onBindingChange: function (oEvent) {
            var oView = this.getView(),
                oElementBinding = oView.getElementBinding();

            // No data for the binding then to show a page "not found"
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("notFound");
                return;
            }
        },
        // formatter for mapUrlGoogle
        formatter: formatter,
    });
    return Controller;

});