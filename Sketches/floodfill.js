function setup()
{
    createCanvas(200, 200);
    ellipse(100, 100, 100);
    stroke(100, 0, 100);
    flood(100,100,[255,255,255,255]);

}

function flood(x, y, old_color)
{
    
    //if(get(x,y).every(function(v,i) { return v === old_color[i]}))//pls javascript, why u so bad?
    if(get(x,y)[0]===old_color[0])
    {
        point(x,y);
        flood(x+1,y,old_color);
        flood(x,y-1,old_color);
        flood(x-1,y,old_color);
        flood(x,y+1,old_color);

    }
}