const { ipcMain } = require('electron')
const fs = require('fs');

ipcMain.on('getFilesFromFolder', (event, filePath) => {
    fs.readdir(filePath, (err, files) => {
        console.log(files);
        event.returnValue = files;
    })
})