const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        invoke: (channel, data) => {
              return ipcRenderer.invoke(channel, data);
        },
        send: (channel, data) => {
            ipcRenderer.send(channel, data);
        },
        sendSync: (channel, data) => {
            return ipcRenderer.sendSync(channel, data);
        },
        on: (channel, callback) => {
            // Filtering the event param from ipcRenderer
            const newCallback = (_, data) => callback(data);
            ipcRenderer.on(channel, newCallback);
        },
        once: (channel, callback) => {
            const newCallback = (_, data) => callback(data);
            ipcRenderer.once(channel, newCallback);
        },
        removeListener: (channel, callback) => {
            ipcRenderer.removeListener(channel, callback);
        },
        removeAllListeners: (channel) => {
            ipcRenderer.removeAllListeners(channel)
        },
    }
);
console.log('preload.js');