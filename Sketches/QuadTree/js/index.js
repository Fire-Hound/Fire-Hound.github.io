var points = []
var qt
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255)
    qt = new Quadtree(0,0,windowHeight, windowWidth)
    qt.insert(100,100)

}
function draw(){


}
function mousePressed(){
    stroke("#800080")
    strokeWeight(7)
    x = mouseX
    y = mouseY
    point(x, y)
    points.push(x,y)
    qt.insert(x,y)
}