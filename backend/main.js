const {dialog, ipcMain} = require('electron')
const fs = require('fs');
const {BrowserWindow} = require("electron");
const Store = require('electron-store');
const {app} = require('electron')

const store = new Store();


ipcMain.on('getFilesFromFolder', (event, filePath) => {
    fs.readdir(filePath, (err, files) => {
        event.reply('onFilesFromFolder', files);
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

ipcMain.handle('getStoreValue', (event, key) => {
    console.log(app.getPath('userData'))
    return store.get(key);
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
    console.log('save');
    const folder = store.get('overview-folder');
    const fileName =  invoice.offer.title + '-' + invoice.offer.offerNumber + '.json';
    if (folder) {
        fs.writeFileSync(folder + '\\' + fileName, JSON.stringify(invoice), 'utf-8');
        return fileName;
    }
});