/*global  _: false, Backbone: false, exports: false*/
//#Memento
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

    // Memento object is api support for creating Mementos for storing state.
    //  You can pass in the originator and state to the constructor
    var Memento = Skull.Memento = function(options) {
        var opts       = options || {},
            originator = {},
            state      = {};
        _.extend(this, opts);
    };

    _.extend(Memento.prototype, {
        //Returns the originator object
        getOriginator: function() {
            return this.originator;
        },
        //Sets the originator object
        setOriginator: function(originator) {
            this.originator = originator;
            return this;
        },
        //Returns the state object
        getState: function() {
            return this.state;
        },
        //Sets the state object
        setState: function(state) {
            this.state = state;
            return this;
        }
    });

})(this);
