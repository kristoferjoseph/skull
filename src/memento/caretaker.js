/*global  _: false, Backbone: false, exports: false*/
//#CareTaker
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
