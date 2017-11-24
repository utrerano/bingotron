// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
import jetpack from 'fs-jetpack';


var bingo = require('../src/helpers/bingo.js');

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read('package.json', 'json');

const osMap = {
  win32: 'Windows',
  darwin: 'macOS',
  linux: 'Linux',
};

debugger;
$(document.querySelector('.carton-numbers')).css('top',$(document.querySelector('nav'))[0].offsetHeight + 'px')

document.querySelector('#start').addEventListener('click', function () {
  if(bingo.bingoStackOut.length>0)
    bingo.resumeBingo();
  else
    bingo.startBingo();
});

document.querySelector('#refresh').addEventListener('click', function () {
   bingo.resetBingo();
});

document.querySelector('#pause').addEventListener('click', function () {
   bingo.pauseBingo();
});

document.querySelector('#list').addEventListener('click', function () {
   bingo.displayList();
});
