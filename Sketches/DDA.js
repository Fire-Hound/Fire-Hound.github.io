let x1 = 0
let y1 = 0
let x2 = 800
let y2 = 800
let dx;
let dy;
let countdown = 5
function setup()
{
  
  createCanvas(700, 700)
  background(0)
  dx = abs( x2 - x1 )
  dy = abs( y2 - y1 )
  frameRate(1)
}

function draw()
{
  let pixel;
  stroke(255)
  if(dx>dy) pixel=dx
  else      pixel=dy

  dx = dx/pixel  //if dx>dy: xk+1 = xk + dx/dx   //if dx<dy: xk+1 = xk + dx/dy
  dy = dy/pixel  //if dx>dy: yk+1 = yk + dy/dx   //if dx<dy: yk+1 = yk + dy/dy

  let endx
  if(x1<x2)
  {
    x = x1
    y = y1
    endx = x2
  }
  else
  {
    x = x2
    y = y2
    endx = x1
  }


  while(x<endx)
  {
    point(x,y);
    x += dx;
    y += dy;
    
  }

}
