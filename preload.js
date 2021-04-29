const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        getFilesFromFolder: (folder) => ipcRenderer.sendSync('getFilesFromFolder', folder)
    }
);
console.log('preload.js');