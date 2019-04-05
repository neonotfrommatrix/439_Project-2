// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------
function repeat(times, fn) {
    for(let i = 0; i < times; i++) {
        fn();
    }
}

function rule_150(temp) {
    // will return true if lastRowCells == [1, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1].
    let result = 0;
    while(temp.getHeadCoords().x != 0) {
        temp.moveTape('left');
    }

    if(temp.readHead() == 1) {
        result += 4;
    }
    temp.moveTape('right');
    if(temp.readHead() == 1) {
        result += 2;
    }
    temp.moveTape('right');
    if(temp.readHead() == 1) {
        result += 1;
    }

    while(temp.getHeadCoords().x != 0) {
        temp.moveTape('left');
    }

    console.log(`result = ${result}`);
    return (result == 7 || result == 4 || result == 2 || result == 1);
    // return true; 
}

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill )
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  )
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix / 10, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy / 10, 0, iy + 10 );}
    }
    rctx.restore( );
}




function fill_cells (ctx, cells) {
    ctx.save();

    const cell_length = 10;
    ctx.fillStyle = 'DimGray';

    cells.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if(col == 1) {
                ctx.fillRect(colIndex * cell_length, rowIndex * cell_length, cell_length, cell_length);
            }
        })
    })

    ctx.restore();
}

function cella_rule_150(ctx) {
    const rowSize = 41;
    const colSize = 20;

    // debugger;

    

    const tm = new TuringMachine(rowSize, colSize);
    const temp = new TuringMachine(3, 1);

    tm.exampleFunction();
    // fill center cell in top row
    repeat(rowSize / 2, function() { tm.moveTape('right') });
    tm.writeHead(1);
    repeat(rowSize / 2, function() { tm.moveTape('left') });
    tm.moveTape('down');

    do { // row iteration
        do { // col iteration
            console.log(`Calculating (${tm.getHeadCoords().x}, ${tm.getHeadCoords().y})`);
            tm.moveTape('up');
    
            // first digit
            if(tm.moveTape('left')) {
                temp.writeHead(tm.readHead());
                tm.moveTape('right');
            }
            else {
                temp.writeHead(0);
            }
            temp.moveTape('right');
            
            // second digit
            temp.writeHead(tm.readHead());
            temp.moveTape('right');
            
            // third digit
            if(tm.moveTape('right')) {
                temp.writeHead(tm.readHead());
                tm.moveTape('left');
            }
            else {
                temp.writeHead(0);
            }
            
            tm.moveTape('down');
    
            tm.writeHead(rule_150(temp) ? 1 : 0);
            console.log('.');        
            
        }
        while(tm.moveTape('right')); // will continue until reaches bound

        while(tm.getHeadCoords().x > 0) {
            tm.moveTape('left');
        }
    }
    while(tm.moveTape('down'));
    

    fill_cells(ctx, tm.tape);
}
