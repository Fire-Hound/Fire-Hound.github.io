let x1,x2,y1,y2,xmin,xmax,ymin,ymax
let TOP = 0x8, BOTTOM = 0x4, RIGHT = 0x2, LEFT = 0x1, CENTER = 0x0
let presses
function setup()
{
    createCanvas(600,600)
    presses = 0
    xmin = 100
    ymin = 100
    xmax = 200
    ymax = 200
    // x1 = 20
    // y1 = 150
    // x2 = 130
    // y2 = 0
    text("Cohen Sutherland algorithm - click two times for generating line",10,10)
    rectMode(CORNERS)
    rect(xmin, ymin, xmax, ymax)
    //clipAndDraw()

}
function mouseClicked()
{
    presses +=1
    if(presses%2==0)
    {
        x2 = mouseX
        y2 = mouseY
        //line(x1,y1,x2,y2)
        clipAndDraw()
    }
    else
    {
        x1 = mouseX
        y1 = mouseY
    }
}
function draw()
{
}

function getcode(x,y)
{
    if(x<xmin && y<ymin)   return TOP | LEFT
    if(x<xmin && y>ymax)   return BOTTOM | LEFT
    if(x>xmax && y>ymax)   return BOTTOM | RIGHT
    if(x>xmax && y<ymin)   return TOP | RIGHT
    if(x<xmin)             return LEFT
    if(x>xmax)             return RIGHT
    if(y<ymin)             return TOP
    if(y>ymax)             return BOTTOM
    return CENTER
}
function clipAndDraw()
{
    codeP1 = getcode(x1, y1)
    codeP2 = getcode(x2, y2)

    if (codeP1 == CENTER && codeP2 == CENTER)
    {
        line(x1, y1,x2,y2)
    }
    else if (codeP1 & codeP2)
    {
        return
    }
    else 
    {
        findIntersectionAndDraw(codeP1, codeP2)
    }
}
function findIntersectionAndDraw(codeP1, codeP2)
{
    outside = false
    outercode = codeP1 ? codeP1:codeP2
    // console.log(outercode)
    dy = y2 - y1
    dx = x2 -x1
    if(codeP1==CENTER) console.log("CENTER codeP1")
    if(codeP2==CENTER) console.log("CENTER codeP2")
    if (outercode & TOP)
    {
        console.log("top")
        slope = dx/dy
        x = slope * (ymin - y1) + x1
        y = ymin
    }
    else if (outercode & BOTTOM)
    {
        console.log("bottom")
        slope = dx/dy
        x = slope * (ymax - y1) + x1
        y = ymax
    }
    else if (outercode & RIGHT)
    {
        console.log("right")

        slope = dy/dx
        y = slope * (xmax - x1) + y1
        x = xmax
    }
    else 
    {
        console.log("left")

        slope = dy/dx
        y = slope * (xmin - x1) + y1
        x = xmin
    }
    if(outercode == codeP1)
    {
        x1 = x
        y1 = y
    }
    else{
        x2 = x
        y2 = y
    }
    codeP1 = getcode(x1,y1)
    codeP2 = getcode(x2,y2)
    if(codeP1 != CENTER && codeP2 != CENTER) return;
    if(codeP1 != CENTER || codeP2 != CENTER)
    {
        findIntersectionAndDraw(codeP1, codeP2)
        return
    }
    console.log("codeP1: "+ codeP1)
    console.log("codeP2: "+ codeP2)
    
    line(x1,y1,x2,y2) //draw the line when both codes are 0
}