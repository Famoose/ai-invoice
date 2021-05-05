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

const templateFolder = app.getPath('userData') + '/templates';
ipcMain.on('getTemplates', (event, filePath) => {
    fs.readdir(templateFolder, (err, files) => {
        event.reply('onTemplates', files);
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
        fs.readFile(folder + '/' + path, 'utf-8', (err, data) => {
            event.returnValue = data;
        });
    }
});

ipcMain.on('readTemplateFile', (event, path) => {
    const folder = templateFolder;
    if (folder) {
        fs.readFile(folder + '/' + path, 'utf-8', (err, data) => {
            event.returnValue = data;
        });
    }
});

ipcMain.handle('createFile', (event, invoice) => {
    const folder = store.get('overview-folder');
    const fileName = invoice.offer.title + '-' + invoice.offer.offerNumber + '.json';
    if (folder) {
        fs.writeFileSync(folder + '/' + fileName, JSON.stringify(invoice), 'utf-8');
        return fileName;
    }
});

ipcMain.handle('createTemplateFile', (event, args) => {
    const fileName = args.fileName + '.json';
    ensureDirectoryExistence(templateFolder)
    fs.writeFileSync(templateFolder + '/' + fileName, JSON.stringify(args.invoice), 'utf-8');
    return fileName;
});

ipcMain.handle('saveFile', (event, args) => {
    const folder = store.get('overview-folder');
    const fileName = args.invoice.offer.title + '-' + args.invoice.offer.offerNumber + '.json';
    console.log(folder + '/' + args.oldFilename);
    if (fs.existsSync(folder + '/' + fileName) && fileName !== args.oldFilename) {
        dialog.showMessageBox({
            type: 'error',
            title: 'Fehler',
            message: 'Es gibt bereits ein Dokument mit diesem Namen'
        });
        throw new Error('exists');
    }
    if (folder) {
        if (fileName !== args.oldFilename && fs.existsSync(folder + '/' + args.oldFilename)) {
            fs.unlinkSync(folder + '/' + args.oldFilename);
        }
        fs.writeFileSync(folder + '/' + fileName, JSON.stringify(args.invoice), 'utf-8');
        return fileName;
    }
});

ipcMain.handle('saveTemplateFile', (event, args) => {
    const fileName = args.fileName + '.json';
    if (templateFolder) {
        if (args.fileName !== args.oldFilename && fs.existsSync(templateFolder + '/' + args.oldFilename)) {
            fs.unlinkSync(templateFolder + '/' + args.oldFilename);
        }
        fs.writeFileSync(templateFolder + '/' + fileName, JSON.stringify(args.invoice), 'utf-8');
        return fileName;
    }
});

ipcMain.handle('deleteTemplate', (event, fileName) => {
    if (templateFolder && fs.existsSync(templateFolder + '/' + fileName)) {
        fs.unlinkSync(templateFolder + '/' + fileName);
    }
});

function ensureDirectoryExistence(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
    }
}