/*global  _: false, Backbone: false*/
//#CommandMap
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};


     //CommandMap is used to map commands to application events
    var CommandMap = Skull.CommandMap = function(eventMap) {
            //Allow a passed in event map to be used.
            //  Default to the Skull.EventMap
            var evtMap = eventMap || Skull.EventMap;

            return {
                //Add a command to the command map.
                // Supply the event to trigger it.
                addCommand: function(e, cmd) {
                    if (cmd.execute) {
                        evtMap.subscribe(e, cmd.execute);
                    } else {
                        throw new Error("No execute method found");
                    }
                    return this;
                },
                //Remove a command from the command map
                removeCommand: function(e, cmd) {
                    evtMap.unsubscribe(e, cmd);
                    return this;
                }
            };
        }();

})(this);
