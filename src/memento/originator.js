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
        eventMap: Skull.EventMap,
        //Creates a memento object for storing state. Stores only the deltas.
        //  Override this function to supply your own serialization routine.
        createMemento: function(hash) {
            var memento = new Skull.Memento({
                originator: this,
                state: this.changedAttributes(hash)
            });

            return memento;
        },
        //Sets a memento object to restore state.
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
        //Creates a memento and sends it along with an event to be stored then calls set
        store: function(hash) {
            //Checks to see if there is anything in the hash before doing any work
            if ( !_.isEmpty(hash) ) {
                this.eventMap.on("Memento:Store", this.createMemento(hash));
                //Calls set after storing the delta
                this.set(hash);
            }

            return this;
        }
    });
    //Supply an extend function to allow inheritance
    Originator.extend = Skull.extend;

})(this);
