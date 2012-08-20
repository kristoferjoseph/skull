
module('Command', {
    setup: function() {
        // setup for Command
        this.commandMap = Skull.CommandMap;
    },
    teardown: function() {
        //teardown for Command
        this.commandMap = null;
    }
});

test('CommandMap should exist', 1, function() {
    ok(this.commandMap);
});

test('CommandMap should have addCommand method', 1, function() {
    ok(this.commandMap.addCommand);
});

test('CommandMap should have removeCommand method', 1, function() {
    ok(this.commandMap.removeCommand);
});

test('addCommand should add a command', 1, function() {
    var cmd = {
        execute: function() {
            ok(true);
        }
    };

    this.commandMap.addCommand('fake:event', cmd);
    Skull.EventMap.publish('fake:event');
    Skull.EventMap.unsubscribe();
});