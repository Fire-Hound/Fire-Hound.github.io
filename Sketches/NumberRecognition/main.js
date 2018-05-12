let  imageshow = false, img, imgData,g, grids, detect, releasedCount;
function setup(){
    releasedCount = 0;
    g = createCanvas(280, 280);
    g.parent("canvas-holder")
    g.position((windowWidth-width)/2,(windowHeight-height)/2)
    //position(windowWidth,windowHeight)
    g.background(0)
    g.stroke(255)
    g.strokeWeight(30);
    // grids = createGrids()
    detect = createButton("PREDICT")
    detect.class("detect-button")
    detect.mouseReleased(()=>{
        if(releasedCount!=0) return;
        g.loadPixels();
        img = g.get();  
        img.loadPixels()
        img.resize(28,28)
        numberPredict(serialize(img.pixels))
        img.updatePixels();
        g.updatePixels();
        releasedCount++;
        return false;
    })
    detect.position((windowWidth-detect.size().width)/2,
    (windowHeight+height+20)/2)
}
function canvaspixels(){
    // let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    g.loadPixels()
    img = g.get()
    img.loadPixels()
    img.resize(28,28)
    createImg(img)
    data = img.pixels
    console.log(data)
    img.updatePixels()
    g.updatePixels()
    return data;
}
function draw(){


}
function mouseDragged() {
    
    line(pmouseX, pmouseY, mouseX, mouseY);

}

// function mousePressed(){
//     for(grid of grids){
//         if(grid.inside(mouseX, mouseY)){
//             fill(255)
//             rect(grid.startx, grid.starty, grid.width, grid.height)
//         }
//     }
// }
       
function keyPressed()
{
    if(key = " "){
        g.background(0)
    }
}

class Grid{
    constructor(startx, starty, h, w){
        this.height = h;
        this.width = w;
        this.startx = startx;
        this.starty = starty;
    }
    inside(x,y){
        if( x>this.startx &&
        y>this.starty &&
        x<this.startx + this.width &&
        y<this.starty + this.height
        ) return true;
        return false;
    }
}
function createGrids()
{
    h = 10
    w = 10
    startx = 0
    starty = 0
    arr = []
    for(i=0;i<28;i++){
        startx = 0;
        for(j=0;j<28;j++){
            append(arr, new Grid(startx, starty, h, w));
            startx += w;
        }
        starty += h;
    }
    return arr
}