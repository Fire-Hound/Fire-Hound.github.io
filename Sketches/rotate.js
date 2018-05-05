let x,y,rx,ry,angle,cx,cy, rotated
function setup()
{
    x = 1; y = 0; angle = 0;

    createCanvas(400, 400)
    cx = width/2
    cy = height/2
    strokeWeight(2)
    point(x+cx,y+cy)
    
    rotated = myrotate(x,y,angle)
    point(rotated['x']+cx, rotated['y']+cy)
}
function draw(){
    background(255)
    text("rx = " + rotated['x'] + " ry = " + rotated['y'] + " | x = "+ x + " y = "+ y, 10,10)
    point(x+cx*200,y+cy*200)
    
    rotated = myrotate(x,y,angle)
    point(rotated['x']+cx, rotated['y']+cy)
    angle++
}
function mysin(x) { return sin(radians(x))}
function mycos(x) { return cos(radians(x))}
function myrotate(x,y,angle) {
    
    return {  
        'x':    x*mycos(angle)-y*mysin(angle) ,  
        'y':    x*mysin(angle)+y*mycos(angle)  
    }  
}