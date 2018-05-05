let lineStarted, lineEnded, startPoint, endPoint
function setup()
{
    createCanvas(800,800)
    
    lineStarted = false
    lineEnded = true
    startPoint = {
        x: 0,
        y: 0
    }
    endPoint = {
        x: 0,
        y: 0
    }
    rectMode(CENTER)
    noFill()
}

function draw()
{
    if(mouseButton == "left"){  
        lineStarted = !lineStarted
        lineEnded = !lineEnded
    
        if(lineStarted){
            startPoint['x'] = mouseX
            startPoint['y'] = mouseY
            console.log(lineStarted)
        }
        if(lineEnded){
            endPoint['x'] = mouseX
            endPoint['y'] = mouseY
            line(startPoint['x'], startPoint['y'], endPoint['x'], endPoint['y'])
            console.log(lineEnded)
        }
        mouseButton = ""
    }
    rect(400,400, 400, 400)
}
