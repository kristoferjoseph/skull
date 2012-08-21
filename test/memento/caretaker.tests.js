module('Memento', {
    setup: function() {
        // setup for Memento
        this.careTaker = Skull.CareTaker;
    },
    teardown: function() {
        //teardown for Memento
        this.careTaker = null;
    }
});

test('CareTaker should instantiate', 1, function() {
    ok(this.careTaker);
});

test('CareTaker should have undo method', 1, function() {
    ok(this.careTaker.undo);
});

test('CareTaker should have redo method', 1, function() {
    ok(this.careTaker.redo);
});