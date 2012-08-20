module('Observer', {
    setup: function() {
        // setup for EventMap
        this.eventmap = Skull.EventMap;
    },
    teardown: function() {
        //teardown for EventMap
        this.eventmap.unsubscribe();
        this.eventmap = null;
    }
});

test('Event map should instantiate', 1, function() {
    ok(this.eventmap);
});

test('EventMap should have publish function', 1, function() {
    ok(this.eventmap.publish);
});

test('EventMap should have subscribe function', 1, function() {
    ok(this.eventmap.subscribe);
});

test('EventMap should have unsubscribe function', 1, function() {
    ok(this.eventmap.unsubscribe);
});

test('EventMap should publish event', 1, function() {
    var handler = function(e) {
            ok(true);
        };
    this.eventmap.subscribe('fake:event', handler);
    this.eventmap.publish('fake:event');
});

test('EventMap should trigger event in the correct scope', 1, function() {
    var scope = {};
    scope.handler = function(e) {
        ok(true);
    };
    this.eventmap.subscribe('fake:event', scope.handler);
    this.eventmap.publish('fake:event');
});

test('EventMap should be able to be called statically', 1, function() {
    var handler = function(e) {
            ok(true);
            Skull.EventMap.unsubscribe();
        };
    Skull.EventMap.subscribe('fake:event', handler);
    Skull.EventMap.publish('fake:event');
});

test('EventMap should trigger multiple handlers', 3, function() {
    var a = {},
        b = {},
        c = {};

    a.handler = function(e) {
        ok(true);
    };
    b.handler = function(e) {
        ok(true);
    };
    c.handler = function(e) {
        ok(true);
    };

    this.eventmap.subscribe('fake:event', a.handler);
    this.eventmap.subscribe('fake:event', b.handler);
    this.eventmap.subscribe('fake:event', c.handler);
    this.eventmap.publish('fake:event');
});

test('EventMap should be able to be statically referenced multiple times', 3, function() {
    var a = {},
        b = {},
        c = {};

    a.handler = function(e) {
        ok(true);
    };
    b.handler = function(e) {
        ok(true);
    };
    c.handler = function(e) {
        ok(true);
    };

    Skull.EventMap.subscribe('fake:event', a.handler);
    Skull.EventMap.subscribe('fake:event', b.handler);
    Skull.EventMap.subscribe('fake:event', c.handler);
    Skull.EventMap.publish('fake:event');
    Skull.EventMap.unsubscribe();
});
