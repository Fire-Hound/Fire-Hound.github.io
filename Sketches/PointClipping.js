let rectHeight = 100
let rectWidth = 100
let rectX = 100
let rectY = 100
let rectTopLeft = {x:rectX, y:rectY}
let rectBottomRight = {x:rectX + rectWidth, y:rectY + rectHeight}
let button

points = []
function setup() {
    createCanvas(displayHeight, displayWidth); 
    noFill()
    button = createButton('clip point', 'true')
    button.position(10,10)
    
    
    button.mousePressed(setClear)

}


function setClear()
{

    for(p of points)
    {
        if(p['x'] > rectBottomRight['x'] || p['x'] < rectTopLeft['x'] 
        ||p['y'] > rectBottomRight['y'] || p['y'] < rectTopLeft['y'])
                p['color'] = 255
        //console.log(p['x'], p['y'])

    } 

}
function draw() {
    strokeWeight(3)
    if(mouseIsPressed) 
    {   
        p = {x:mouseX, y: mouseY, color:0}
        points.push(p)

    }
    
    if(points.length>0)
    {
        for(p of points)
        {
            stroke(p['color'])
            point(p['x'], p['y'])
        }
    }
    rect(rectX,rectY,rectHeight,rectWidth)
    
    
}