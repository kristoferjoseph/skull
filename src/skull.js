/*global  _: false, Backbone: false, exports: false*/
//#Skull
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull;
    if (typeof exports !== 'undefined') {
        Skull = exports;
    } else {
        Skull = global.Skull = global.Skull || {};
    }

    //Hijack Backbone's extend method to use with Skull objects
    Skull.extend = Backbone.Model.extend;

})(this);
