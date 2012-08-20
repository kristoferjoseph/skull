module('Memento', {
    setup: function() {
        // setup for Memento
        this.memento = new Skull.Memento();
    },
    teardown: function() {
        //teardown for Memento
        this.memento = null;
    }
});

test('Memento should be instantiated', 1, function() {
    ok(this.memento);
});

test('Memento should have getOriginator method', 1, function() {
    ok(this.memento.getOriginator);
});

test('Memento should have setOriginator method', 1, function() {
    ok(this.memento.setOriginator);
});

test('Memento should have getState', 1, function() {
    ok(this.memento.getState);
});

test('Memento should have setState', 1, function() {
    ok(this.memento.setState);
});

test('Should be able to pass in arguments to the constructor', 1, function() {
    var memento = new Skull.Memento({
        originator: this,
        state: {'name':'Saya'}
    });

    equal( memento.state.name, 'Saya', "Stat should have been set in the constructor properties" );
});

test('Should be able to chain method calls together', 1, function() {
    this.memento.setOriginator({}).setState({'name':'Bob'});
    equal( this.memento.getState().name, 'Bob', "Methods should have been chained" );
});