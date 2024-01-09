class HelloWorldPeerPlugin {
    name = "helloWorldPeer";

    constructor(pluginBus, config) {
        this.pluginBus = pluginBus;
        this.config = config;
        console.debug("HelloWorldPeer.constructor()", config);
    }
    async init() {
        console.debug("HelloWorldPeer.init()");
        this.pluginBus.on('helloThere', (data) => {
            console.debug(`Got "helloThere": ${data}`);
        });
    }
}

module.exports = HelloWorldPeerPlugin;