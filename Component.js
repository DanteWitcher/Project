sap.ui.define([
    "sap/ui/core/UIComponent",

], function (UIComponent) {
    "use strict";
    var Component = UIComponent.extend("lesson5.sample.Component", {
        metadata: {
            manifest: "json"
        },
        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * In this function, the resource and application models are set and the router is initialized.
         * @public
         * @override
         */
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // create the views based on the url/hash
            this.getRouter().initialize();
            // connect our apps to remote data
            var oODataModel = new sap.ui.model.odata.v2.ODataModel("/lesson5/data/");
            this.setModel(oODataModel);
        }
    });
    return Component;
});


