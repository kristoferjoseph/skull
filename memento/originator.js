/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    /*
    *   Originator object is a model with memento functionality
    */
    var Originator = Skull.Originator = Backbone.Model.extend();
    _.extend(Originator.prototype, {
        createMemento: function() {
            var memento = new Skull.Memento({
                originator: this,
                state: this.toJSON()
            });

            return memento;
        },
        setMemento: function(memento) {
            var state = memento.state;
            if (this.set) {
                this.set(state);
            } else if (this.reset) {
                this.reset(state);
            } else {
                throw new Error("You need to override setMemento to set your state");
            }
            return this;
        },
        store: function() {
            Skull.EventMap.publish("Memento:Store", this.createMemento());
            return this;
        }
    });

    Originator.extend = Skull.extend;

})(this);