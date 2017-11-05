// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

const Store = require('electron-store');
const store = new Store();


app.on('ready', () => {
  setApplicationMenu();

  const mainWindow = createWindow('main', {
    width: 480,
    height: 320,
    frame:false
  });

  if(store.get('config')==undefined){
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'bingo.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }else{
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }

  // mainWindow.openDevTools();

  mainWindow.setMenu(null);
});

app.on('window-all-closed', () => {
  app.quit();
});
