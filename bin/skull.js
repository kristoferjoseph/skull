// Skull.js 0.0.1-alpha
// Build Date: 2012-08-20

// (c) 2012 Kristofer Joseph.
// Skull may be freely distributed under the MIT license.
// For all details and documentation:
// http://www.skulljs.com

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //Hijack Backbone's extend method to use with Skull objects
    Skull.extend = Backbone.Model.extend;

})(this);

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

//#CareTaker
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    //CareTaker is used to manage the stacks of state
    var CareTaker = Skull.CareTaker = function() {
        var undoStack = [],
            redoStack = [];
        return {
            //Add a memento to the undo stack
            addMemento: function(memento) {
                this.undoStack.push(memento);
                return this;
            },
            //Undoes the last action on the stack
            undo: function() {
                if (this.undoStack.length) {
                    var memento = this.undoStack.pop(),
                        originator = memento.originator;

                    if (originator && originator.setMemento && originator.createMemento) {
                        this.redoStack.push(originator.createMemento());
                        originator.setMemento(memento);
                    }
                }
                return this;
            },
            //Redoes the last action on the stack
            redo: function() {
                if (this.redoStack.length) {
                    var memento = this.redoStack.pop(),
                        originator = memento.originator;

                    if (originator && originator.setMemento && originator.createMemento) {
                        this.undoStack.push(originator.createMemento());
                        originator.setMemento(memento);
                    }
                }
                return this;
            }
        };
    }();

})(this);

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

//#Memento
(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

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
