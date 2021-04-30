const { dialog, ipcMain } = require('electron')
const fs = require('fs');
const {BrowserWindow} = require("electron");

ipcMain.on('getFilesFromFolder', (event, filePath) => {
    fs.readdir(filePath, (err, files) => {
        console.log(files);
        event.returnValue = files;
    });
});

ipcMain.on('select-dirs', (event, arg) => {
    console.log('select-dir');
    /*dialog.showOpenDialog(BrowserWindow.getAllWindows()[0], {
        properties: ['openDirectory']
    }).then (result => {
        console.log('directories selected', result.filePaths);
    });*/
});