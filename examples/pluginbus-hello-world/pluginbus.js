class HelloWorldPlugin {
    name = "helloWorld";

    constructor(pluginBus, config) {
        this.pluginBus = pluginBus;
        this.config = config;
        console.debug("HelloWorld.constructor()", config);
    }
    async init() {
        console.debug("HelloWorld.init()");
        this.pluginBus.on('hello', (data) => {
            console.debug(`Got "hello" event, sending "helloThere": ${data}`);
            this.pluginBus.trigger('helloThere', data);
        });
    }
}

module.exports = HelloWorldPlugin;