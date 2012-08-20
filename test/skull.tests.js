module('Skull', {
    setup: function() {
        // setup for Skull
        this.skull = Skull;
    },
    teardown: function() {
        //teardown for Skull
        this.skull = null;
    }
});

test('Skull should be instantiated', 1, function() {
    ok(this.skull);
});

test('Skull should have extend method', 1, function() {
    ok(this.skull.extend);
});