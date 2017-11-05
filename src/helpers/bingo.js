const say = require('say')
const Store = require('electron-store');
const store = new Store();

exports.timeStep = 0;
exports.pause = false;
exports.timeout = null;
exports.timeStep = 3000;
exports.bingoStackOut = [];

exports.shuffle = function(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

exports.fillBingoArray = function() {
  var bingoNumbers = Array.from(new Array(90), (x, i) => i + 1);
  return exports.shuffle(bingoNumbers);
}

exports.nextBall = function() {
    exports.timeout = setTimeout(function() {
        var bingoNumber = exports.bingoStack.shift();
        if (bingoNumber != undefined) {
          document.querySelector('#bingo-number').innerHTML = bingoNumber;
          exports.bingoStackOut.push(bingoNumber);
          exports.refreshTable();
          if (bingoNumber < 10) {
            say.speak(bingoNumber, nul);
          } else {
            bingoNumber = bingoNumber +' '+ Math.floor(bingoNumber / 10) +' ' +(bingoNumber % 10);
            say.speak(bingoNumber, null);
          }
          exports.nextBall(exports.timeStep, exports.bingoStack, exports.bingoStackOut);
        }
        }, exports.timeStep);
    }

    exports.startBingo = function() {
      document.querySelector('#start').style.display = 'none';
      document.querySelector('#pause').style.display = 'block';
      var timeStepStored = store.get('timeStep');
      if (timeStepStored != null)
        exports.timeStep = timeStepStored;
      exports.bingoStack = this.fillBingoArray();
      exports.nextBall();
    }

    exports.pauseBingo = function() {
      document.querySelector('#start').style.display = 'block';
      document.querySelector('#pause').style.display = 'none';
      if (exports.timeout) {
        clearTimeout(exports.timeout);
      }
    }

    exports.resumeBingo = function() {
      document.querySelector('#start').style.display = 'none';
      document.querySelector('#pause').style.display = 'block';
      exports.nextBall();
    }

    exports.resetBingo = function() {
      if (exports.timeout) {
        clearTimeout(exports.timeout);
      }
      exports.bingoStackOut = [];
      exports.startBingo();
    }

    exports.timeStepChange = function(up) {
      if (up) {
        exports.timeStep = exports.timeStep + 200;
      } else {
        exports.timeStep = exports.timeStep - 200;
      }
      store.set('timeStep', exports.timeStep);
    }

    exports.displayList = function() {
      if (document.querySelector('#player').style.display == 'none') {
        document.querySelector('#player').style.display = 'block';
        document.querySelector('#played').style.display = 'none';
      } else {
        document.querySelector('#player').style.display = 'none';
        document.querySelector('#played').style.display = 'block';
        exports.refreshTable();
      }
    }

    exports.refreshTable = function() {
      var innerHTML = '';
      for (var i = 1; i < 90; i++) {
        if (i % 10 == 1) {
          innerHTML += '<tr>';
        }
        if (exports.bingoStackOut.indexOf(i) >= 0)
          innerHTML += '<td>' + i + '</td>';
        else {
          innerHTML += '<td class="dark">' + i + '</td>';

        }
        if (i % 10 == 0) {
          innerHTML += '</tr>';
        }
      }
      document.querySelector('#tableBody').innerHTML = innerHTML;
      // console.log(innerHTML);
    }
