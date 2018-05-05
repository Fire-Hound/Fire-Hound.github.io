let x,y,xc,yc,r,angle;
function setup()
{
    createCanvas(800, 800);
    background(0);
    xc = width/2;
    yc = height/2;
    r = 200;
    angleMode(true);
    angle = 0;
    //noLoop();
}

function draw()
{
    stroke(42,201,158);
    strokeWeight(3);
    noFill()
    //ellipse(xc, yc, r);
    //rcircle();
    rcircle();

}
function rcircle()
{
    

    stroke(42,201,158);
    strokeWeight(3);
    angle=0;
    while(angle<=360)
    {
        x = r/2 * sin(radians(angle));
        y = r/2 * cos(radians(angle));
        point(x + xc, y + yc);
        angle+=0.01;
        
    }
    
}
function acircle()
{

    stroke(42,201,158);
    strokeWeight(3);
    angle=0;
    while(angle<=45)
    {
        x = r/2 * sin(angle);
        y = r/2 * cos(angle);
        point(x + xc, y + yc);
        angle+=0.1;
        
    }
    
}