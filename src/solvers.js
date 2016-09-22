/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});

  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      board.togglePiece(x, y);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(x, y);
      }
    }
  }

  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return true;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  return true;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var possibilities = [];
  var solutions = [];
  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      possibilities.push([x, y]);
    }
  }
  
  var removeBadTuples = function(array, x, y) {
    return array.filter(function(tuple) {
      if (tuple[0] === x ||
          tuple[1] === y ||
          Math.abs(tuple[0] - x) === Math.abs(tuple[1] - y)
        ) {
        return false;
      } return true;
    });
  };

  var recursePossibilities = function(pL, currentSolution) {
    var currentSolution = currentSolution || [];
    if (pL.length === 0) {
      // push current possibility tree to array of solutions
      if (currentSolution.length === n) {
        // console.log(currentSolution);
        solutions.push(currentSolution.slice());
        // console.log(currentSolution.toString());
      } 
    } else {
      pL.forEach(t => {
        if (t[0] === currentSolution.length) {
          // store that tuple somewhere
          currentSolution.push(t);
          // make new possibilites array without that tuple and all its bad associates
          var nextPossibilities = removeBadTuples(pL, t[0], t[1]);
          recursePossibilities(nextPossibilities, currentSolution);
          currentSolution.pop();
        }
      });
    }
  };

  recursePossibilities(possibilities);

  solutions.map( answers => answers.map( tuple => 
    (tuple[0] * n + tuple[1]))
    );
  solutions = solutions.map( answers => answers.map( tuple => 
    (tuple[0] * n + tuple[1])).sort().toString()
    );
  var result = _.uniq(solutions);

  return result.length;
};
