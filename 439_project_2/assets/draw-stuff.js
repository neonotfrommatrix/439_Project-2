// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

function rule_150(lastRowCells) {
    // will return true if lastRowCells == [1, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1].
    if(lastRowCells[0] == 1) {
        return ((lastRowCells[1] == 1 && lastRowCells[2] == 1) ||
         (lastRowCells[1] == 0 && lastRowCells[2] == 0));
    }
    else {
        return ((lastRowCells[1] == 1 && lastRowCells[2] == 0) ||
                (lastRowCells[1] == 0 && lastRowCells[2] == 1));
    }
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
        row.forEach(col => {
            ctx.fillRect(col * cell_length, rowIndex * cell_length, cell_length, cell_length);
        })
    })

    ctx.restore();
}

function cella_rule_150(ctx) {
    const rowSize = 41;
    const colSize = 20;

    var myarray=new Array(rowSize);

    for (i=0; i < 41; i++)
    {
      myarray[i]=new Array(colSize);
    }



    const grid = myarray; // 2d array of all cells 41*20
    let lastRow, lastRowCells = [];

    // row iteration
    grid.forEach((row, i) => {
        if(i == 0) {
            row.push(colSize - 1); // this will fill the 20th column of the first row, assuming 41 * 20 gridSize
        }
        else {
            // column iteration
            for(let col = 0; col < colSize; col++) {
                lastRow = grid[i - 1];
                // console.log(lastRow);

                lastRowCells = [
                    (lastRow.indexOf(col - 1) !== -1)  ? 1 : 0,
                    (lastRow.indexOf(col) !== -1)  ? 1 : 0,
                    (lastRow.indexOf(col + 1) !== -1)  ? 1 : 0
                ];

                // console.log(`${i},${col}: [${lastRowCells[0]}, ${lastRowCells[1]}, ${lastRowCells[2]}]`);
                if(rule_150(lastRowCells)) {
                    // console.log(col);
                    row.push(col);
                }
            }
        }
    });

    fill_cells(ctx, grid);
}
