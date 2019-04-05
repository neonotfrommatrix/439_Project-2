// this can either be copied into the main js code or referenced using another <script> tag

// how to use turing machine functions:
// const tm = TuringMachine();
// tm.moveTape('right');
// let a = tm.readHead;
// if (a == 0) tm.writeHead(1);

// "use strict";

// babel compiler stuff
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


// tape = 2d array of size 41 x 20
function newTape(rowSize, colSize) {
	let tape = new Array(rowSize);
	for (let i=0; i < 41; i++) {
		tape[i]=new Array(colSize);
	}
	return tape;
}

const TuringMachine = function(rows, cols) {
  _classCallCheck(this, TuringMachine);

  this.head = {
    x: 0,
    y: 0
  };
  this.tape = newTape(rows, cols);
	this.rows = rows;
	this.cols = cols;

	this.moveTape = function(direction) {
		let success = false;
		let prevPosition = {
			x: this.head.x,
			y: this.head.y
		};

			switch (direction) {
				case 'left':
					if (this.head.x > 0) {
						this.head.x -= 1;
					}
					break;
	
				case 'right':
					if (this.head.x < this.tape.length) {
						this.head.x += 1;
					}
					break;

				case 'up':
					if (this.head.y > 0) {
						this.head.y -= 1;
					}
					break;

				case 'down':
					if (this.head.y < this.tape[0].length) {
						this.head.y += 1;
					}
					break;
			}	

			success = !(this.head.x == prevPosition.x && this.head.y == prevPosition.y);
			return success;
	};

	this.writeHead = function(num) {
		this.tape[this.head.y][this.head.x] = num;
	};

	this.readHead = function () {
    return this.tape[this.head.y][this.head.x];
	};
	
	this.getHeadCoords = function () {
    return new Object({
      x: this.head.x,
      y: this.head.y
    });
  };
};
