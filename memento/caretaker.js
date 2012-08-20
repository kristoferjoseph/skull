/*jslint vars: true, devel: true, browser: true*/
/*global  _: false, Backbone: false, exports: false */

(function(global) {
    'use strict';

    //Define the Skull namespace by
    //  using the existing one or creating a new object
    var Skull = global.Skull = global.Skull || {};

    var CareTaker = Skull.CareTaker = function() {};
    _.extend(CareTaker.prototype, {
        undoStack: [],
        redoStack: [],
        addMemento: function(memento) {
            this.undoStack.push(memento);
            return this;
        },
        undo: function() {
            if (this.undoStack.length) {
                var memento = this.undoStack.pop(),
                    originator = memento['originator'];

                if (originator && originator.setMemento && originator.createMemento) {
                    this.redoStack.push(originator.createMemento());
                    originator.setMemento(memento);
                }
            }
            return this;
        },
        redo: function() {
            if (this.redoStack.length) {
                var memento = this.redoStack.pop(),
                    originator = memento['originator'];

                if (originator && originator.setMemento && originator.createMemento) {
                    this.undoStack.push(originator.createMemento());
                    originator.setMemento(memento);
                }
            }
            return this;
        }
    });

})(this);