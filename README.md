# pluginbus
Simple Plugin Architecture for NodeJS projects.

Goal features for v1.0:
- Simple, plug-and-play usage, based on NPM packages
- Auto discovery of plugins
- Main Event bus for communicating between plugins
- Plugin lifecycle events
- Flexible configurations (default general config, plugin specific config, user specific config overrides)
- Add support for unit tests of plugins
- Last, but not least - optimized for performance

Some day ideas:
- In-browser interoperability
- WebSockets/UDP/TCP/HTTP/HTTPS/Unix Socket/Named Pipe/Shared Memory/... transport layers

## Installation
```bash
npm install pluginbus
```

## Usage

### Main App

```javascript
let PluginBus = require('./pluginbus.js');

(async() => {
    let pluginBus = new PluginBus();
    await pluginBus.autodetect();
    await pluginBus.init();
    // this file -> HelloWorld plugin -> HelloWorldPeer plugin
    pluginBus.trigger('hello', 'WORLD!');
})();
```

### Plugins

Plugins are just NodeJS modules that export a function that takes a PluginBus instance as an argument. 
The function should return an object with a `constructor(pluginBusInstance, configObject)` and `init()`.
The `constructor` method is called when the plugin is loaded.

The `init` method is called when the plugin system is initialized.

For examples, see `examples/` folder.