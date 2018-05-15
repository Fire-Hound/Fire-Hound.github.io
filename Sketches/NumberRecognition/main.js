let img, g, releasedCount; //our global variables
function setup(){
    releasedCount = 0 //sometimes mobile browsers call the mouse events multiple times.
                     //this variable will be incremented everytime mouseReleased is called


    g = createCanvas(280, 280) //creates the main canvas

    //position of the canvas 
    //windowWidth is window's width and windowHeight is window's height
    g.position( (windowWidth-width)/2, (windowHeight-height)/2 ) //height is canvas's height and width is canvas's width

    g.background(0) //background color set to (0,0,0) -> black
    g.stroke(255) //color of all drawable objects set to (255,255,255) -> white
    g.strokeWeight(30) //outline strength set to 30pixels

    
    detect = createButton("PREDICT") //create a button named PREDICT
    detect.mouseReleased(guess) //calls guess() when mouse button is released
    detect.position(    
        (windowWidth-width)/2,
        (windowHeight+height+20)/2
    )         //this defines the x and y of the predict button. set to bottom left of the canvas
                    
    clear = createButton("CLEAR") //create a button named CLEAR
    clear.mouseReleased(clearCanvas) //calls clearCanvas() when mouse button is released
    clear.position(     
        ((windowWidth+width)/2)-clear.size().width,
        (windowHeight+height+20)/2
    ) //set to bottom right of the canvas
}

function mouseDragged() {
    //this function is called every time by p5 when the mouse is dragged 
    line(pmouseX, pmouseY, mouseX, mouseY); //this is the MAIN code that allows the user to
                                            //draw on the canvas. pmouseX and pmouseY are previous 
                                            //x and y locations of the mouse. And as the name suggests
                                            //mouseX and mouseY is the current mouse position 
}

function guess(){
    //gets called when the user presses on the predict button
    if(releasedCount!=0) return; //if the function has been called before; return
    g.loadPixels() //load all the pixel values of our canvas
    img = g.get() //get the canvas as an image
    img.loadPixels() //load the pixels of the image created
    img.resize(28,28) //resize the image to be of 28x28. This is because
                      //our neural network axpects a 28x28 image.
    numberPredict(serialize(img.pixels))//give the image to the neural network
                                        //after serializing it ie making it one dimensional
    img.updatePixels() //update the pixels of the image created
    g.updatePixels() //update the pixel values of our canvas
    releasedCount++ //increment the release count to show the function 
                    //has been called more than once
    return false    //some browsers have default behaviour for these events.
                    //this is said to nullify the behaviours
}

function clearCanvas(){
    //gets called when the clear button is pressed
    releasedCount = 0 //the release count is set to zero. 
                      //Signifying that predict button can be pressed again.
    g.background(0) //the background of canvas to black again; clearing the canvas
}