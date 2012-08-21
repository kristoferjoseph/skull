/*global  _: false, Backbone: false*/
//#EventMap
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //EventMap is used to dispatch application wide events.
    //  Clone of Backbone.Events with class level api exposed
    var EventMap = Skull.EventMap = _.clone(Backbone.Events);
    //Publish events on the event map
    EventMap.publish = EventMap.trigger;
    //Subscribe to events on the event map
    EventMap.subscribe = EventMap.on;
    //Unsubscribe from events on the event map
    EventMap.unsubscribe = EventMap.off;

})(this);
