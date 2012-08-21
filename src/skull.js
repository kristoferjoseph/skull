/*global  _: false, Backbone: false*/

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //Hijack Backbone's extend method to use with Skull objects
    Skull.extend = Backbone.Model.extend;

})(this);
