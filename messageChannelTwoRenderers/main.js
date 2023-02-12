const { app, BrowserWindow, MessageChannelMain } = require('electron');
const path = require('path');

function createWindow(show, ctxIsolation, preloadfile) {
  new BrowserWindow({
    show: show,
    webPreferences: {
      contextIsolation: ctxIsolation,
      preload: path.join(__dirname, preloadfile),
    },
  });
}

app.whenReady().then(async () => {
  const mainWindow = createWindow(false, false, 'preloadMain.js');
  const secondWindow = createWindow(false, false, 'preloadSecondary.js');

  const { port1, port2 } = new MessageChannelMain();

  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.postMessage('port', null, [port1]);
  });

  secondWindow.once('ready-to-show', () => {
    secondWindow.webContents.postMessage('port', null, [port2]);
  });
});
