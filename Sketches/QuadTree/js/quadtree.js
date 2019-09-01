class Quadtree{
 constructor(x,y,height,width){
        this.node_capacity = 1
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.TOPLEFT = null
        this.TOPRIGHT = null
        this.BOTTOMLEFT = null
        this.BOTTOMRIGHT = null
        this.numOfPoints = 0
    }
    subdivide(){
        if(this.TOPLEFT != null) 
            return
        this.TOPLEFT = new Quadtree(this.x, this.y, this.height/2, this.width/2)
        this.TOPRIGHT = new Quadtree(this.x+(this.width/2), this.y, this.height/2, this.width/2)
        this.BOTTOMLEFT = new Quadtree(this.x, this.y+(this.height/2), this.height/2, this.width/2)
        this.BOTTOMRIGHT = new Quadtree(this.x+(this.width/2), this.y+(this.height/2), this.height/2, this.width/2)
        this.draw()
    }
    draw(){
        noFill()
        stroke("#008080")
        strokeWeight(4)
        if(this.TOPLEFT == null)
            return
        rect(this.TOPLEFT.x, this.TOPLEFT.y, this.TOPLEFT.width, this.TOPLEFT.height)
        rect(this.TOPRIGHT.x, this.TOPRIGHT.y, this.TOPRIGHT.width, this.TOPRIGHT.height)
        rect(this.BOTTOMLEFT.x, this.BOTTOMLEFT.y, this.BOTTOMLEFT.width, this.BOTTOMLEFT.height)
        rect(this.BOTTOMRIGHT.x, this.BOTTOMRIGHT.y, this.BOTTOMRIGHT.width, this.BOTTOMRIGHT.height)

    }
    insert(x,y){
        //return if point doesn't intersect the quad
        if(!(x>this.x  &&  x<(this.x+this.width)  && y>this.y  &&  y<(this.y+this.height))){
            console.log("hmm")
            return
        }
        this.numOfPoints++
        if(this.numOfPoints>=2){
            this.subdivide()
            this.TOPLEFT.insert(x,y)
            this.TOPRIGHT.insert(x,y)
            this.BOTTOMLEFT.insert(x,y)
            this.BOTTOMRIGHT.insert(x,y)
        }


        
    }
}