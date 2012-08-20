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