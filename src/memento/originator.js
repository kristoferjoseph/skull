/*global  _: false, Backbone: false*/
//#Originator
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //Originator object is a model with memento functionality
    var Originator = Skull.Originator = Backbone.Model.extend();
    _.extend(Originator.prototype, {
        //Creates a memento object for storing state.
        //  Override this function to supply your own serialization routine.
        createMemento: function() {
            var memento = new Skull.Memento({
                originator: this,
                state: this.toJSON()
            });

            return memento;
        },
        //Sets a memento object to restor state.
        //  Override this function to supply your own way to restore state.
        setMemento: function(memento) {
            var state = memento.state;
            if (this.set) {
                this.set(state);
            } else if (this.reset) {
                this.reset(state);
            } else {
                throw new Error("You need to override setMemento to supply a way to set your state");
            }
            return this;
        },
        //Creates a memento and sends it along with an event to be stored
        store: function() {
            Skull.EventMap.publish("Memento:Store", this.createMemento());
            return this;
        }
    });
    //Supply an extend function to allow inheritance
    Originator.extend = Skull.extend;

})(this);
