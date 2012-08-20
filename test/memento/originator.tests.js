module('Memento', {
    setup: function() {
        // setup for Memento
        this.originator = new Skull.Originator();
    },
    teardown: function() {
        //teardown for Memento
        this.originator = null;
    }
});

test('Originator should be instantiated', 1, function() {
    ok(this.originator);
});

test('Originator should have createMemento method', 1, function() {
    ok(this.originator.createMemento);
});

test('Originator should have setMemento method', 1, function() {
    ok(this.originator.setMemento);
});

test('Originator should have store method', 1, function() {
    ok(this.originator.store);
});

test('Originator store method should trigger event', 1, function() {
    var handler = function() {
        ok(true);
    };
    Skull.EventMap.subscribe("Memento:Store", handler);
    this.originator.store();
});

test('Should be able to override createMemento', 1, function() {
        var Originator = Skull.Originator.extend({
        createMemento: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.createMemento();
});

test('Should be able to override setMemento', 1, function() {
        var Originator = Skull.Originator.extend({
        setMemento: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.setMemento({});
});

test('Should be able to override store method', 1, function() {
    var Originator = Skull.Originator.extend({
        store: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.store({});
});

