const { app, BrowserWindow, ipcMain, MessageChannelMain } = require('electron');

app.whenReady().then(async () => {
  const worker = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  await worker.loadFile(worker.html);

  // The main wondow will send work to the worker process and receive results through the message port
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('app.html');

  mainWindow.webContents.mainFrame.on('request-worker-channel', (event) => {
    // Create a new channel
    const { port1, port2 } = new MessageChannelMain();
    // ... send one end to the worker
    worker.webContents.postMessage('new-client', null, [port1]);
    // ... and the other end to the main window.
    event.senderFrame.postMessage('provide-worker-channel', null, [port2]);
    // Now the main window and the worker can communicate with each other without going through the main process
  });
});
