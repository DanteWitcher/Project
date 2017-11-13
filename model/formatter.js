sap.ui.define([], function () {
    "use strict";
    return {
        /**
         * Get url from Google API
         * @param {sap.ui.mvc.String, sap.ui.mvc.integer} FormattedAddress - selected adress of element
         * @public
         * @returns {sap.ui.mvc.String} the url
         */
        formatMapUrlGoogle: function (FormattedAddress) {
            return "https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=500x300&markers=" + FormattedAddress;
        },
        /**
         * Get url from Nokia API
         * @param {sap.ui.mvc.String, sap.ui.mvc.integer} FormattedAddress - selected adress of element
         * @public
         * @returns {sap.ui.mvc.String} the url
         */
        formatMapUrlNokia: function (FormattedAddress) {
            var app_id = "IHJQfoGtjQYAXaCKFbnm",
                app_code = "KjCzFQ7fcQPMI69NM1HSEg",
                country = "", street = "", number, city;
            if (FormattedAddress !== null) {
                // 1. split our adress
                var aMass = FormattedAddress.split(',');
                // 2. split mass[0](there is street and number) by ' '
                var aNewMass = aMass[0].split(' ');
                // 3. number is the last element of aNewMass, take it ->
                number = (aNewMass.splice(aNewMass.length - 1, 1))[0];
                // 4. street is all of it, except last element; just take a remaining, and join elements ->
                street = aNewMass.join(' ');
                // 5. city is the middle element, take it and join elements, city is 2 element always->
                aNewMass = aMass.slice(1, aMass.length - 1);
                var aMassCity = aNewMass[0].split(' ');
                city = aMassCity[2];
                // 6. county is a last element in the mass
                aNewMass = aMass[aMass.length - 1];
                var aMassCountry = aNewMass.split(' ');
                aMassCountry.splice(0, 1);
                country = aMassCountry.join(' ');
            }
            var url = "http://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=" + app_id +
                "&app_code=" + app_code + "&co" + country + "&ci=" + city +
                "&s=" + street + "&n=" + number + "&w=400&z=" + 15 + "&pip=-6";
            return url;
        }
    };
});