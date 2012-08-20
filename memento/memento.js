/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    var Memento = Skull.Memento = function(options) {
        var options    = options || {},
            originator = {},
            state      = {};
        _.extend(this, options);
    };

    _.extend(Memento.prototype, {
        getOriginator: function() {
            return this.originator;
        },
        setOriginator: function(originator) {
            this.originator = originator;
        },
        getState: function() {
            return this.state;
        },
        setState: function(state) {
            this.state = state;
        }
    });

})(this);