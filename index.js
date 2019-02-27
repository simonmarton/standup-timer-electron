const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

const WINDOW_WIDTH = 240;
const WINDOW_HEIGHT = 120;

const menuTemplate = [
  {
    label: 'Edit',
    submenu: [
      { label: 'Quit', role: 'quit' },
      { label: 'Refresh', role: 'reload' },
      { type: 'separator' },
      { label: 'Whatever' }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);

// app.dock.hide();

app.on('ready', () => {
  const { screen } = electron;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x: width - 220,
    y: 40,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    opacity: 0.9
  });

  window.setVisibleOnAllWorkspaces(true);

  window.loadURL(`https://simonmarton.github.io/standup-timer`);

  Menu.setApplicationMenu(menu);
});
