let  imageshow = false, img, imgData,g, grids, detect, releasedCount, clear;
function setup(){
    releasedCount = 0;
    g = createCanvas(280, 280);
    g.parent("canvas-holder")
    g.position( (windowWidth-width)/2, (windowHeight-height)/2 )
    g.background(0)
    g.stroke(255)
    g.strokeWeight(30);

    detect = createButton("PREDICT")
    detect.class("detect-button")
    detect.mouseReleased(()=>{
        if(releasedCount!=0) return;
        g.loadPixels();
        img = g.get();  
        img.loadPixels()
        img.resize(28,28)
        console.log(img.pixels)
        numberPredict(serialize(img.pixels))
        img.updatePixels();
        g.updatePixels();
        releasedCount++;
        return false;
    })
    detect.position(    
        (windowWidth-width)/2,
        (windowHeight+height+20)/2
                    )
                    
    clear = createButton("CLEAR")
    clear.mouseReleased(()=>{
        releasedCount = 0;
        g.background(0);
    })
    clear.position(     
        ((windowWidth+width)/2)-clear.size().width,
        (windowHeight+height+20)/2
                    )
}

function draw(){
}
function mouseDragged() {
    line(pmouseX, pmouseY, mouseX, mouseY);
}
      
function keyPressed(){
    if(key = " "){
        g.background(0)
    }
}


