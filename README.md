Skull
=====
-----

Application pattern library for Backbone

Command
-------
A pattern for carrying out application wide actions.
Consists of a Command Map that maps commands to application events

    var CommandMap = Skull.CommandMap;
    CommandMap.addCommand("Memento:Undo", UndoCommand);

and a Command object

    var command = Skull.Command.extend({
            execute: function() {
                model.set({'name':'Bob'});
            }
        });

Memento
-------
A pattern for storing and restoring application state ( Undo / Redo ).
Consists of a Memento object,

    var memento = new Skull.Memento({
            'originator': this,
            'state': this.toJSON()
        });

an Originator object

    var originator = new Skull.Originator();
    var memento = originator.createMemento();
    originator.setMemento(memento);

and a CareTaker object

    var careTaker = Skull.CareTaker;
    careTaker.addMemento(memento);
    careTaker.undo();
    careTaker.redo();

Observer
--------
A pattern for application wide communication

    var EventMap = Skull.EventMap;
    EventMap.subscribe("Memento:Undo", UndoManager.undo);
    EventMap.publish("Memento:Undo");
    EventMap.unsubscribe("Memento:Undo", UndoManager.undo);





