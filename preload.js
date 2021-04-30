const { contextBridge, ipcRenderer } = require('electron')

const validChannels = ["getFilesFromFolder"];

contextBridge.exposeInMainWorld(
    'electron',
    {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        sendSync: (channel, data) => {
            if (validChannels.includes(channel)) {
                return ipcRenderer.sendSync(channel, data);
            }
        },
        on: (channel, callback) => {
            if (validChannels.includes(channel)) {
                // Filtering the event param from ipcRenderer
                const newCallback = (_, data) => callback(data);
                ipcRenderer.on(channel, newCallback);
            }
        },
        once: (channel, callback) => {
            if (validChannels.includes(channel)) {
                const newCallback = (_, data) => callback(data);
                ipcRenderer.once(channel, newCallback);
            }
        },
        removeListener: (channel, callback) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.removeListener(channel, callback);
            }
        },
        removeAllListeners: (channel) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.removeAllListeners(channel)
            }
        },
    }
);
console.log('preload.js');