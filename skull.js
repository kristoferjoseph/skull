// Skull.js
/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //Set the version number
    Skull.VERSION = '0.0.1-alpha';

    //Hijack Backbone's extend method to use with Skull objects
    Skull.extend = Backbone.Model.extend;

})(this);