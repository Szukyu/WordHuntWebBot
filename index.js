// Constants
const UPLEFT = 0;
const UP = 1;
const UPRIGHT = 2;
const RIGHT = 3;
const DOWNRIGHT = 4;
const DOWN = 5;
const DOWNLEFT = 6;
const LEFT = 7;

const DIRECTIONS = [UPLEFT, UP, UPRIGHT, RIGHT, DOWNRIGHT, DOWN, DOWNLEFT, LEFT];

const MAX_LENGTH = 10;

const englishWords = new Set();
const validWordsOnly = new Set();
const valids = new Set();
const wordStarts = new Set();

// Classes
class Letter {
  constructor(ch, index, visit = false) {
    this.char = ch;
    this.pos = index;
    this.visited = visit;
  }

  copyLetter() {
    return new Letter(this.char, this.pos, this.visited);
  }

  markVisited() {
    this.visited = true;
  }
}

class Board {
  constructor(lettersArr) {
    this.lb = lettersArr;
  }

  copyBoard() {
    const newArr = [];
    for (let i = 0; i < this.lb.length; i++) {
      newArr.push(this.lb[i].copyLetter());
    }
    return new Board(newArr);
  }

  peekUpperLeft(pos) {
    if (pos % 4 === 0 || pos <= 3) {
      return -1;
    }
    return this.lb[pos - 5];
  }

  peekUp(pos) {
    if (pos <= 3) {
      return -1;
    }
    return this.lb[pos - 4];
  }

  peekUpperRight(pos) {
    if (pos <= 3 || pos % 4 === 3) {
      return -1;
    }
    return this.lb[pos - 3];
  }

  peekRight(pos) {
    if (pos % 4 === 3) {
      return -1;
    }
    return this.lb[pos + 1];
  }

  peekLowerRight(pos) {
    if (pos >= 12 || pos % 4 === 3) {
      return -1;
    }
    return this.lb[pos + 5];
  }

  peekDown(pos) {
    if (pos >= 12) {
      return -1;
    }
    return this.lb[pos + 4];
  }

  peekLowerLeft(pos) {
    if (pos % 4 === 0 || pos >= 12) {
      return -1;
    }
    return this.lb[pos + 3];
  }

  peekLeft(pos) {
    if (pos % 4 === 0) {
      return -1;
    }
    return this.lb[pos - 1];
  }

  visitDirection(pos, dir) {
    const directionDict = {
      [UPLEFT]: this.peekUpperLeft.bind(this),
      [UP]: this.peekUp.bind(this),
      [UPRIGHT]: this.peekUpperRight.bind(this),
      [RIGHT]: this.peekRight.bind(this),
      [DOWNRIGHT]: this.peekLowerRight.bind(this),
      [DOWN]: this.peekDown.bind(this),
      [DOWNLEFT]: this.peekLowerLeft.bind(this),
      [LEFT]: this.peekLeft.bind(this)
    };

    const visitedLetter = directionDict[dir](pos);
    if (visitedLetter === -1 || visitedLetter.visited) {
      return -1;
    }
    visitedLetter.markVisited();
    return visitedLetter;
  }
}

class Boarder {
  constructor(lettersArr) {
    this.lb = lettersArr;
  }

  copyBoard() {
    const newArr = []
    for (let i = 0; i < this.lb.length; i++) {
      newArr.push(this.lb[i].copyLetter());
    }
    return new Boarder(newArr);
  }

  peekUpperLeft(pos) {
    if (pos % 5 == 0 || pos  < 5) {
      return -1;
    }
    return this.lb[pos - 6]; 
  }

  peekUp(pos) {
    if (pos < 5) {
      return -1;
    }
    return this.lb[pos - 5];
  }

  peekUpperRight(pos) {
    if (pos < 5 || pos % 5 == 4) {
      return -1;
    }
    return this.lb[pos - 4];
  }

  peekRight(pos) {
    if (pos % 5 == 4) {
      return -1;
    }
    return this.lb[pos + 1];
  }

  peekLowerRight(pos) {
    if (pos >= 20 || pos % 5 == 4) {
      return -1;
    }
    return this.lb[pos + 6];
  }

  peekDown(pos) {
    if (pos >= 20) {
      return -1;
    }
    return this.lb[pos + 5];
  }

  peekLowerLeft(pos) {
    if (pos % 5 == 0 || pos >= 20) {
      return -1;
    }
    return this.lb[pos + 4];
  }

  peekLeft(pos) {
    if (pos % 5 == 0) {
      return -1;
    }
    return this.lb[pos - 1];
  }
  
  visitDirection(pos, dir) {
    const directionDict = {
      [UPLEFT]: this.peekUpperLeft.bind(this),
      [UP]: this.peekUp.bind(this),
      [UPRIGHT]: this.peekUpperRight.bind(this),
      [RIGHT]: this.peekRight.bind(this),
      [DOWNRIGHT]: this.peekLowerRight.bind(this),
      [DOWN]: this.peekDown.bind(this),
      [DOWNLEFT]: this.peekLowerLeft.bind(this),
      [LEFT]: this.peekLeft.bind(this)
    };

    const visitedLetter = directionDict[dir](pos);
    if (visitedLetter === -1 || visitedLetter.visited) {
      return -1;
    }
    visitedLetter.markVisited();
    return visitedLetter;
  }
}

class Donut {
  constructor(lettersArr) {
    this.lb = lettersArr;
  }

  copyBoard() {
    const newArr = []
    for (let i = 0; i < this.lb.length; i++) {
      newArr.push(this.lb[i].copyLetter());
    }
    return new Boarder(newArr);
  }

  peekUpperLeft(pos) {
    if (pos <= 4 || pos == 8 || pos == 12 || pos == 15) {
      return -1;
    }
    else if (pos == 9 || pos == 16) {
      return this.lb[pos - 6];
    } else {
      return this.lb[pos -5];
    }
  }

  peekUp(pos) {
    if (pos <= 3 || pos % 7 == 0) {
      return -1;
    } else if (pos == 8 || pos == 9 || pos == 15 || pos == 16) {
      return this.lb[pos - 5];
    } else {
      return this.lb[pos - 4];
    }
  }

  peekUpperRight(pos) {
    if (pos < 3 || pos == 6 || pos == 7 || pos == 11 || pos == 16 || pos == 13) {
      return -1;
    } else if (pos == 8 || pos ==  9 || pos == 14 || pos == 15) {
      return this.lb[pos - 4];
    } else {
      return this.lb[pos - 3];
    }
  }

  peekRight(pos) {
    if (pos == 2 || pos == 7 || pos == 9 || pos == 11 || pos == 16 || pos == 19) {
      return -1;
    } else {
      return this.lb[pos + 1];
    }
  }

  peekLowerRight(pos) {
    if (pos == 4 || pos == 7 || pos == 11 || pos >= 15) {
      return -1;
    } else if (pos == 3 || pos == 10) {
      return this.lb[pos + 6];
    } else {
      return this.lb[pos + 5];
    }
  }

  peekDown(pos) {
    if (pos == 5 || pos == 12 || pos >= 17) {
      return -1;
    } else if (pos == 4 || pos == 5 || pos == 10 || pos == 11) {
      return this.lb[pos + 5];
    } else {
      return this.lb[pos + 4];
    }
  }

  peekLowerLeft(pos) {
    if (pos == 3 || pos == 8 || pos == 13 || pos >= 17 || pos % 6 == 0) {
      return -1;
    } else if (pos == 4 || pos == 5 || pos == 10 || pos == 11) {
      return this.lb[pos + 4];
    } else {
      return this.lb[pos + 3];
    }
  }

  peekLeft(pos) {
    if (pos == 0 || pos == 3 || pos == 8 || pos == 10 || pos == 12 || pos == 17) {
      return -1;
    } else {
      return this.lb[pos - 1];
    }
  }

  visitDirection(pos, dir) {
    const directionDict = {
      [UPLEFT]: this.peekUpperLeft.bind(this),
      [UP]: this.peekUp.bind(this),
      [UPRIGHT]: this.peekUpperRight.bind(this),
      [RIGHT]: this.peekRight.bind(this),
      [DOWNRIGHT]: this.peekLowerRight.bind(this),
      [DOWN]: this.peekDown.bind(this),
      [DOWNLEFT]: this.peekLowerLeft.bind(this),
      [LEFT]: this.peekLeft.bind(this)
    };

    const visitedLetter = directionDict[dir](pos);
    if (visitedLetter === -1 || visitedLetter.visited) {
      return -1;
    }
    visitedLetter.markVisited();
    return visitedLetter;
  }
}

// Main
document.addEventListener('DOMContentLoaded', function() {
  fetch('words.txt')
    .then(response => response.text())
    .then(words => {
      words.split("\n").forEach(word => {
        const strippedWord = word.trim();
        if (strippedWord.length > MAX_LENGTH) {
          return;
        }
        englishWords.add(strippedWord);
        for (let i = 3; i <= strippedWord.length; i++) {
          wordStarts.add(strippedWord.substring(0, i));
        }
      });
      console.log(englishWords);
    })
});

document.getElementById("submit").onclick = function() {
  const inputLetters = [];

  let letters = document.getElementById("letters").value.trim().toLowerCase();
  document.querySelector(".input-wrapper").style.display = "none";
  if (letters.length == 16) {
    for (let i = 0; i < 16; i++) {
      inputLetters.push(letters[i]);
    }
    const lettersObjs = []
    for (let i = 0; i < 16; i++) {
      lettersObjs.push(new Letter(inputLetters[i], i));
    }
    const board = new Board(lettersObjs);
    findValidWords(board);
    printOutput();
  } else if (letters.length == 25) {
    for (let i = 0; i < 25; i++) {
      inputLetters.push(letters[i]);
    }
    const lettersObjs = [];
    for (let i = 0; i < 25; i++) {
      lettersObjs.push(new Letter(inputLetters[i], i));
    }
    const board = new Boarder(lettersObjs);
    findValidWords(board);
    printOutput();
  } else if (letters.length == 20) {
    for (let i = 0; i < 20; i++) {
      inputLetters.push(letters[i]);
    }
    const letterObjs = [];
    for (let i = 0; i < 20; i++) {
      letterObjs.push(new Letter(inputLetters[i], i));
    }
    const board = new Donut(letterObjs);
    findValidWords(board);
    printOutput();
  }
}

function findValidWords(board) {
  board.lb.forEach(letter => {
    letter.markVisited();
    findValidFrom(board, letter.char, letter, 1, letter.pos);
    letter.visited = false;
  });
}

function findValidFrom(board, word, letter, length, pos) {
  if (length >= 3 && !wordStarts.has(word)) {
    return;
  }
  if (englishWords.has(word) && !validWordsOnly.has(word)) {
    validWordsOnly.add(word);
    const tup = { pos, word };
    valids.add(tup);
  }
  if (length >= MAX_LENGTH) {
    return;
  }
  for (let dir of DIRECTIONS) {
    const copyBoard = board.copyBoard();
    const neighborLetter = copyBoard.visitDirection(letter.pos, dir);
    if (neighborLetter !== -1) {
      findValidFrom(copyBoard, word + neighborLetter.char, neighborLetter, length + 1, pos);
    }
  }
}

function word_compare(a, b) {
  if (a.word.length < b.word.length) return 1;
  if (a.word.length > b.word.length) return -1;
  return a.word.localeCompare(b.word);
}

function printOutput() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<h2>${valids.size} words were found.</h2>`;
  const sortedWords = Array.from(valids).sort(word_compare);
  sortedWords.forEach((entry, index) => {
    outputDiv.innerHTML += `<p>${index + 1}: ${entry.word}</p>`;
  });
}
