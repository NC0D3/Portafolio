const canvas = document.getElementById("flockCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(canvas.width,canvas.height);
    colorMode(HSB, 360, 100, 100);
    for (let i = 0; i < 300; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(0);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.avoidMouse(); //parece que no pusiera esta linea jaja wtf
        boid.update();
        boid.show();
    }
}
