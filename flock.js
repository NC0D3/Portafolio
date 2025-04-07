const canvas = document.getElementById("flockCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Boid {
    constructor(){
        this.position = createVector(canvas.width/2,canvas.height/2);
        this.velocity = createVector();
        this.acceleration = createVector();
        
    }

    show(){
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}



const flock = [];
for (let i = 0; i < 1; i++) {
    flock.push(new Boid());
}

function draw(){
    for (let boid of flock) {
        boid.show();
    }
}
