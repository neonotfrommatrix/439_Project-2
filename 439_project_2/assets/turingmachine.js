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
                if(tm.head.x >= 0) {
                    tm.head.x = 1;
                }
                break;
            case 'right':
                if(tm.head.x <= tm.tape.length) {
                    tm.head.x += 1;
                }
                break;
            case 'up':
                if(tm.head.y >= 0) {
                    tm.head.y -= 1;
                }
                break;
            case 'down':
                if(tm.head.y <= tm.tape[0].length) {
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
