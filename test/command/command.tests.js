module('Command', {
    setup: function() {
        // setup for Command
        this.command = new Skull.Command();
    },
    teardown: function() {
        //teardown for Command
        this.command = null;
    }
});

test('Command should not be null', 1, function() {
    ok(this.command);
});

test('Command extensions should inherit execute', 1, function() {
    ok(this.command.execute);
});

test('Overwritting extend method should work', 1, function() {
    var Command = Skull.Command.extend({
        execute: function() {
            ok(true);
        }
    }),
    cmd = new Command();
    cmd.execute();
});