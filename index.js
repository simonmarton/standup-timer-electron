const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

const WINDOW_WIDTH = 220;
const WINDOW_HEIGHT = 80;

const PROD_URL = 'https://simonmarton.github.io/standup-timer';
const DEBUG_URL = 'http://localhost:8080';

const menuTemplate = [
  {
    label: '',
    submenu: [
      { label: 'Quit', role: 'quit' },
      { label: 'Refresh', role: 'reload' },
      { type: 'separator' },
      {
        label: 'Debug on localhost',
        type: 'checkbox',
        accelerator: 'CmdOrCtrl+D',
        click: (menuItem, browserWindow) => {
          menuItem.checked = !!menuItem.checked;

          const url = menuItem.checked ? DEBUG_URL : PROD_URL;
          browserWindow.loadURL(url);
        }
      },
      { role: 'toggleDevTools' }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);

// app.dock.hide();

app.on('ready', () => {
  const { screen } = electron;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const browserWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x: width - 220,
    y: 40,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    opacity: 0.9
  });

  browserWindow.setVisibleOnAllWorkspaces(true);

  browserWindow.loadURL(PROD_URL);

  Menu.setApplicationMenu(menu);
});
