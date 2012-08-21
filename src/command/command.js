/*global  _: false, Backbone: false*/
//#Command
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

     //Command object instances are used to execute application commands
    var Command = Skull.Command = function() {};
    _.extend(Command.prototype, {
        //Executes the command.
        //  Override this function.
        execute: function() {
            return this;
        }
    });
    //Allows the command object to be extended
    Command.extend = Skull.extend;

})(this);
