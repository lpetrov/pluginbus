const {listPackages} = require("./npm");
const EventEmitter = require('node:events');


class PluginBus {
    constructor() {
        this._init();

        try {
            this.config = require("./pluginbus.config.json");
        } catch (e) {
            if (e.code === "MODULE_NOT_FOUND") {
                // pass
                this.config = {};
            }
            else {
                throw e;
            }
        }

    }

    _init() {
        this.plugins = [];
        this.emitter = new EventEmitter({captureRejections: true});
        this.emitter.on('error', console.error);
        this.emitter[Symbol.for('nodejs.rejection')] = console.log;
    }

    async autodetect() {
        let packages = await listPackages();
        for (let pkgName of Object.keys(packages.dependencies)) {
            try {
                let pkg = require(pkgName + "/pluginbus.js");
                let pkgConfig = {};
                try {
                    pkgConfig = require(pkgName + "/pluginbus.config.json");
                }
                catch (e) {
                    if (e.code === "MODULE_NOT_FOUND") {
                        // pass
                    }
                    else {
                        throw e;
                    }
                }

                this.add(new pkg(this, Object.assign({}, {'core': this.config}, pkgConfig)));
            }
            catch (e) {
                if (e.code === "MODULE_NOT_FOUND") {
                    // pass
                }
                else {
                    throw e;
                }
            }
        }

    }

    async init() {
        for (let plugin of this.plugins) {
            await plugin.init();
        }
    }

    add(plugin) {
        this.plugins.push(plugin);
    }

    remove(plugin) {
        this.plugins = this.plugins.filter(p => p !== plugin);
    }

    trigger(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    on(event, callback) {
        this.emitter.on(event, callback);
    }
    once(event, callback) {
        this.emitter.once(event, callback);
    }
    off(event, callback) {
        this.emitter.off(event, callback);
    }
    removeAllListeners(event) {
        this.emitter.removeAllListeners(event);
    }
    listeners(event) {
        return this.emitter.listeners(event);
    }
    rawListeners(event) {
        return this.emitter.rawListeners(event);
    }
    listenerCount(event) {
        return this.emitter.listenerCount(event);
    }
    eventNames() {
        return this.emitter.eventNames();
    }
}


module.exports = PluginBus;