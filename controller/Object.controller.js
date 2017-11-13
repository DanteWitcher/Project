sap.ui.define([
    'lesson5/sample/controller/BaseController',
], function (BaseController) {
    "use strict";
    return BaseController.extend("lesson5.sample.controller.Object", {

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the object controller is instantiated.
         * @param {sap.ui.base.Event} oEvent
         * @public
         */
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("object").attachMatched(this._onRouteMatched, this);
            // Hint: we don't want to do it this way
            /*
             oRouter.attachRouteMatched(function (oEvent){
             var sRouteName, oArgs, oView;
             sRouteName = oEvent.getParameter("name");
             if (sRouteName === "employee"){
             this._onRouteMatched(oEvent);
             }
             }, this);
             */
        },
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
                path: "/Products('" + oArgs.Id + "')",
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

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("notFound");
                return;
            }
        }
    });
});