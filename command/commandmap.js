/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
     *   CommandMap is used to map commands to application events
     */
    var CommandMap = Skull.CommandMap = function(eventMap) {
            //Allow a passed in event map to be used
            //  default to the Skull.EventMap
            var eventMap = eventMap || Skull.EventMap;

            return {
                addCommand: function(e, cmd) {
                    if (cmd.execute) {
                        eventMap.subscribe(e, cmd.execute);
                    } else {
                        throw new Error("You must supply an execute method");
                    }
                },
                removeCommand: function(e, cmd) {
                    eventMap.unsubscribe(e, cmd);
                }
            };
        }();

})(this);