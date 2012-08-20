/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    ////OBSERVER
    /*
     *   EventMap is used to dispatch application wide events
     */
    var EventMap = Skull.EventMap = _.clone(Backbone.Events);
    EventMap.publish = EventMap.trigger;
    EventMap.subscribe = EventMap.on;
    EventMap.unsubscribe = EventMap.off;

})(this);