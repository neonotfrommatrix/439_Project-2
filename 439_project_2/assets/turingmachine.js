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

const TuringMachine = function TuringMachine(rows, cols) {
  _classCallCheck(this, TuringMachine);

  this.head = {
    x: 0,
    y: 0
  };
  this.tape = newTape(rows, cols);
	this.rows = rows;
	this.cols = cols;
	

//   return this;
};

TuringMachine.prototype.exampleFunction = function() {
	// console.log(this.head);
}

TuringMachine.prototype.moveTape = function (direction) {
	let success = false;
	let prevPosition = {
		x: this.head.x,
		y: this.head.y
	};
	// console.log(this.head);

    switch (direction) {
      case 'left':
        if (this.head.x > 0) {
          this.head.x -= 1;
				}
				else {
					console.log('stop');
				}

        break;
 
      case 'right':
        if (this.head.x < this.tape.length) {
					this.head.x += 1;
				}
				else {
					console.log('stop');
				}

        break;

      case 'up':
        if (this.head.y > 0) {
          this.head.y -= 1;
				}
				else {
					console.log('stop');
				}

        break;

      case 'down':
        if (this.head.y < this.tape[0].length) {
          this.head.y += 1;
				}
				else {
					console.log('stop');
				}

        break;
    }	

		if(!(this.rows == 3 && this.cols == 1)) {
			// console.log("(".concat(this.head.x, ", ").concat(this.head.y, ")"));
		}
		success = !(this.head.x == prevPosition.x && this.head.y == prevPosition.y);
		console.log(success);
    return success;
  };

  TuringMachine.prototype.writeHead = function (num) {
    this.tape[this.head.y][this.head.x] = num;
  };

  TuringMachine.prototype.readHead = function () {
    // console.log(this.head.x);
    return this.tape[this.head.y][this.head.x];
  };

  TuringMachine.prototype.getHeadCoords = function () {
    return new Object({
      x: this.head.x,
      y: this.head.y
    });
  };





// I worked out the logic for the turing machine reading and writing as well as the states
/*

// Its mostly pseudo code


//Initialize the first row
moveTape(right)	x col /2
writeHead(num)

for each row:
   moveTape(down)
   moveTape(left) x col
   for each col:
	moveTape(up)
	num = readHead()
	temp.writeHead(num) //to temp[0]
	moveTape(right)
	temp.moveTape(right)
	num = readHead()
	temp.writeHead(num) //to temp[1]
	moveTape(right)
	temp.moveTape(right)
	num = readHead()
	temp.writeHead(num) //to temp[2]
	moveTape(left)
	moveTape(down)
	num = evalTemp()
	writeHead(num)





 s0	s1	s3	s7
 ---	1--	11-	111
			s8
			110

		s4	s9
		10-	101
	 		s10
			100


	s2	s5	s11
	0--	01-	011
			s12
			010

		s6	s13
		00-	001
			s14
			000



evalTemp(){
state = 0
temp.moveTape(left)
temp.moveTape(left)
temp.moveTape(left)

	if state == 0
	{
		if temp.readHead() == 1
			state = 1
		else
			state = 2
		temp.moveTape(right)
		if state == 1
		{
			if temp.readHead() == 1
				state = 3
			else
				state = 4
			temp.moveTape(right)
			if state == 3
			{
				if temp.readHead() == 1
					state = 7
				else
					state = 8
			}
			else if state == 4
			{
				if temp.readHead() == 1
					state = 9
				else
					state = 10
			}
		}
		else if state == 2
		{
			if temp.readHead() == 1
				state = 5
			else
				state = 6
			temp.moveTape(right)
			if state == 5
			{
				if temp.readHead() == 1
					state = 11
				else
					state = 12
			}
			else if state == 6
			{
				if temp.readHead() == 1
					state = 13
				else
					state = 14
			}
		}
	}
	
	return (state = 7 || 10 || 12 || 13) 
}
*/
