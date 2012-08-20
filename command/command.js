/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
     *   Command object instances are used to execute application commands
     */
    var Command = Skull.Command = function() {};
    _.extend(Command.prototype, {
        execute: function() {}
    });

    Command.extend = Skull.extend;

})(this);