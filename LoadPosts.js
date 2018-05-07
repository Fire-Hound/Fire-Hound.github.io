let posts = [
    {
        image:"Sketches\\SpaceInvaders\\Images\\space_invaders.png",
        date:"05-May-2018",
        cavnvas:"Sketches\\SpaceInvaders\\main.js"
    }
]
    
window.onload = () => {
    divContainer = document.createElement("div");
for(post of posts)
{
    img = document.createElement("img");
    img.setAttribute("src", post.image);
    divContainer.appendChild(img);
    
}
    body = document.querySelector("body");
    body.appendChild(divContainer);
}