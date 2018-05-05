let img,player,monsters,bullets, monsterBullets, monsterImage,score,playerDead,monsterHerd;
let  forceX=-2, forceY=0;

//MAIN WINDOW SETUP
function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    buttonsIfMobile();
    score = 0;
    player = new Player(width/2,height/1.2);
    playerDead=false;
    bullets = [];
    monsterBullets = [];
    bulletImage = loadImage("Sketches\\SpaceInvaders\\Images\\bullet.png");
    monsterBulletImage = loadImage("Sketches\\SpaceInvaders\\Images\\monsterBullet.png");
    monsterImage = loadImage("Sketches\\SpaceInvaders\\Images\\monster1.png");
    gameOverImage = loadImage("Sketches\\SpaceInvaders\\Images\\gameOver.jpg");
    monsters = fill_monsters();
    fill(255);
}


//MAIN GAME LOOP
function draw()
{
    background(0);
    textSize(16);
    text("SCORE: "+score,10,20);
    setForces();//Set global forces of monsters
    for(i=0; i<monsters.length; i++)   //Loop for collision detection and monster drawing
    {
        monsters[i].draw();
        monsters[i].attack();
        monsters[i].move(forceX,forceY);
        monsters[i].collision(bullets);
    }
    
    player.draw();
    player.collision();

    for(i=0; i<bullets.length; i++)     //Loop for boundary check and player bullet drawing
    {
        bullets[i].draw();
        if(bullets[i].y<0) bullets.splice(i,1); 
    }
    for(i=0; i<monsterBullets.length; i++)     //Loop for boundary check and player bullet drawing
    {
        monsterBullets[i].draw();
        if(monsterBullets[i].y>height) monsterBullets.splice(i,1); 
    }
    if(playerDead) 
    {
        noLoop();
        image(gameOverImage,0,0);
        fill(203, 63, 12);//#cb4015
        text("SCORE: "+score,270,290);
    }
    if(monsters.length==0)
    {        
        noLoop();
        remove();
        document.body.innerHTML = "<img src='Sketches\\SpaceInvaders\\Images\\win.gif', alt='YOU WON'>";
    }
}


//GAME CODE
class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.rightX = x + 31;
        this.bottomY = y + 17;
        this.force = 0;
        this.img = loadImage("Sketches\\SpaceInvaders\\Images\\player.png");
    }
    draw(){
        this.x += this.force;
        this.rightX += this.force;
        image(this.img,this.x,this.y)
    }
    setForce(f){
        this.force = f;
    }
    collision()
    {
        for(let j=0; j<monsterBullets.length; j++)
        {
            if(this.detectCollision(monsterBullets[j])) 
            {
                playerDead = true;
            }
        }
    }
    detectCollision(bullet){
        //detects if bullet is inside player

        return (this.x<bullet.tip && this.rightX>bullet.tip) 
            && (this.y<bullet.bottomY && this.bottomY>bullet.bottomY) 
    }
}
class Monster{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.img = monsterImage;
        this.rightX = this.x + 26; // hard coded height of monster
        this.bottomY = this.y + 18;// hard coded width of monster
    }
    draw(){
        image(this.img,this.x,this.y)
    }
    collision(bullets)
    {
        for(let j=0; j<bullets.length; j++)
        {
            if(this.detectCollision(bullets[j])) 
            {
                score++;
                monsters.splice(i,1);
                bullets.splice(j,1);
            }
        }
    }
    detectCollision(bullet){
        //detects if bullet is inside monster
        try {
        return (this.bottomY>bullet.y && this.x<bullet.tip && this.rightX>bullet.tip)
        }
        catch(e){return false}//sometimes m is undefined
    }
    attack(){
        if(random()<0.01) this.fireBullet()
    }
    fireBullet(){
        //hardcoded 13 for the bullet to start at the bottom center of the monster
        append(monsterBullets,new MonsterBullet(this.x+13,this.bottomY));
    }
    move(fx,fy)
    {
        this.x += fx;
        this.y += fy;
        this.rightX += fx;
        this.bottomY += fy;
    }
}
class Bullet{
    constructor(){
        this.x = player.x + 19;//10 is to draw the bullet from center of the player
        this.y = player.y;
        this.tip = this.x+3;
        this.force = 3;
        this.img = bulletImage;
    }
    draw(){
        this.y -= this.force;
        image(this.img,this.x,this.y)
    }
}
class MonsterBullet{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.bottomY = y+14;
        this.rightX = x+6;
        this.tip = x+3;
        this.force = 3;
        this.img = monsterBulletImage;
    }
    draw(){
        this.y += this.force;
        this.bottomY += this.force;
        image(this.img,this.x,this.y)
    }
}

function fill_monsters()
{   
    spacing = 50;
    rows = floor(height/(spacing*2));
    cols = floor(width/(spacing*2));
    //fills the monsters in a grid of row and columns
    x = width/3;
    y = height/8;//where the first monster should be placed
    m = []
    for(row=0; row<rows; row++)
        for(col=0; col<cols; col++)
            append(m, new Monster(x + (col*spacing),y + (row*spacing)));//this might look hard at first but its not
    return m;
}

function setForces()
{
    for(monster of monsters)
    {
        if(monster.x<0)
        { 
            forceX = 2;
            forceY = 2;
            break;
        }
        else if(monster.x>width)
        { 
            forceX = -2;
            forceY = 2;
            break;
        }
        forceY = 0;
    }
}
function buttonsIfMobile()
{
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        frameRate(20);
        Lbutton = createButton("Left");
        Lbutton.position(0,height/1.2);
        Lbutton.mousePressed(()=>{player.setForce(-2)});
        Rbutton = createButton("Right");
        Rbutton.position(width/1.2,height/1.2);
        Rbutton.mousePressed(()=>{player.setForce(2)});
    }
}
//EVENTS
function keyPressed()
{
    if(keyCode == 65) player.setForce(-5);
    if(keyCode == 68) player.setForce(5);
     
}
function keyReleased()
{
    if(keyCode == 65) player.setForce(0);    //65 is 'a'
    if(keyCode == 68) player.setForce(0);    //68 is 'd'
}
function mouseClicked()
{   
    append(bullets, new Bullet())
}