const {dialog, ipcMain} = require('electron')
const fs = require('fs');
const {BrowserWindow} = require("electron");
const Store = require('electron-store');
const {app} = require('electron')

const store = new Store();


ipcMain.on('getFilesFromFolder', (event, filePath) => {
    fs.readdir(filePath, (err, files) => {
        console.log(files);
        event.returnValue = files;
    });
});

ipcMain.on('select-dirs', (event, arg) => {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        properties: ['openDirectory']
    }).then(result => {
        console.log('directories selected', result.filePaths);
        event.returnValue = result.filePaths[0];

    });
});

ipcMain.on('getStoreValue', (event, key) => {
    console.log(app.getPath('userData'))
    event.returnValue = store.get(key);
});

ipcMain.handle('setStoreValue', (event, keyValuePair) => {
    return store.set(keyValuePair.key, keyValuePair.value);
});

ipcMain.on('readFile', (event, path) => {
    const folder = store.get('overview-folder');
    if (folder) {
        fs.readFile(folder + '\\' + path, 'utf-8', (err, data) => {
            event.returnValue = data;
        });
    }
});

ipcMain.handle('saveFile', (event, invoice) => {
    const folder = store.get('overview-folder');
    if (folder) {
        fs.writeFileSync(folder + '\\' + invoice.offer.title + '-' + invoice.offer.offerNumber + '.json', JSON.stringify(invoice), 'utf-8');
    }
});