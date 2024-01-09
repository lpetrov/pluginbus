# pluginbus
Simple Plugin Architecture for NodeJS projects.

Features planned (not ready yet) for v1.0:
- Simple, plug-and-play usage, based on NPM packages
- Auto discovery of plugins
- Plugin lifecycle events
- Flexible configurations (default general config, plugin specific config, user specific config overrides)
- Add support for unit tests of plugins
- Event bus - the main mechanism for communication between plugins/main app (distributed architecture - no direct dependencies between plugins)
    - One main event bus for communicating between plugins
    - Pub/sub-like mechanism for dynamic/filtered/wildcard event subscriptions
- Asynchronous APIs (using Native Promises, e.g. async/await)
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