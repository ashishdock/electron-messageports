const { ipcRenderer } = require('electron');

ipcRenderer.on('port', (e) => {
  window.electronMessagePort = e.ports[0];

  window.electronMessagePort.onmessage = (messageEvent) => {
    //handle message
  };
});
