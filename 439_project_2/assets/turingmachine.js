// this can either be copied into the main js code or referenced using another <script> tag

// how to use turing machine functions:
// tm.moveTape('right');
// let a = tm.readHead;
// if (a == 0) tm.writeHead(1);

const rowSize = 41;
const colSize = 20;

// tape = 2d array of size 41 x 20
const tape = new Array(rowSize);
for (let i=0; i < 41; i++) {
    tm.tape[i]=new Array(colSize);
}

const tm = { // turing machine
    head: {
        x: 0,
        y: 0
    },
    tape: tape,
    moveTape (direction) {
        switch(direction) {
            case 'left':
                if(tm.head.x > 0) {
                    tm.head.x -= 1;
                }
                break;
            case 'right':
                if(tm.head.x < tm.tape.length) {
                    tm.head.x += 1;
                }
                break;
            case 'up':
                if(tm.head.y > 0) {
                    tm.head.y -= 1;
                }
                break;
            case 'down':
                if(tm.head.y < tm.tape[0].length) {
                    tm.head.x += 1;
                }
                break;
        }
    },
    writeHead(num) {
        tm.tape[tm.head.x][tm.head.y] = num;
    },
    readHead() {
        return tm.tape[tm.head.x][tm.head.y];
    }
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
