let PluginBus = require('./pluginbus.js');

(async() => {
    let pluginBus = new PluginBus();
    await pluginBus.autodetect();
    await pluginBus.init();
    // this file -> HelloWorld plugin -> HelloWorldPeer plugin
    pluginBus.trigger('hello', 'WORLD!');
})();
