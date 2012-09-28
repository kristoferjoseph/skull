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
    var originator = new Skull.Originator();
    var handler = function() {
        ok(true);
    };
    Skull.EventMap.subscribe("Memento:Store", handler);
    originator.store({'title':'working'});
    originator = null;
});

test('Should be able to override createMemento', 1, function() {
        var Originator = Skull.Originator.extend({
        createMemento: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.createMemento();
    originator = null;
});

test('Should be able to override setMemento', 1, function() {
        var Originator = Skull.Originator.extend({
        setMemento: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.setMemento({});
    originator = null;
});

test('Should be able to override store method', 1, function() {
    var Originator = Skull.Originator.extend({
        store: function() {
            ok(true);
        }
    });

    var originator = new Originator();
    originator.store();
    originator = null;
});

test('Memento should only store deltas', 1, function() {
    var originator = new Skull.Originator();

    var storeHash = {
        "name":"Delta",
        "age":"88",
        "occupation":"stewardess"
    };

    var expectedHash = {
        "name":"Delta"
    };

    originator.set({
        "name":"Thomas",
        "age":"88",
        "occupation":"stewardess"
    });

    var deltaHandler = function(memento) {
        deepEqual( memento.state, expectedHash, "Store should only store delta values" );
    };

    Skull.EventMap.subscribe("Memento:Store", deltaHandler);
    originator.store(storeHash);
    originator = null;
});

test('Store should also set new values', 1, function() {
    var originator = new Skull.Originator();

    var storeHash = {
        "name":"Delta",
        "age":"88",
        "occupation":"stewardess"
    };

    var expectedHash = {
        "name":"Delta"
    };

    originator.set({
        "name":"jimmy",
        "age":"88",
        "occupation":"stewardess"
    });

    var setHandler = function(memento) {
        equal( originator.get('name'), 'Delta', "Store also set values" );
    };

    originator.on("change", setHandler);
    originator.store(storeHash);
    originator = null;
});

test('Should be able to supply your own event map', 1, function() {
    var eventMap = _.clone(Backbone.Events),
        originator = new Skull.Originator({
            'eventMap': eventMap
        }),
        storeHandler = function(memento) {
            ok(false);
        };

    eventMap.on("Memento:Store", storeHandler);
    originator.store({"stuff":"nonsense"});
});

