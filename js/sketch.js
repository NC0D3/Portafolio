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
    for (let i = 0; i < 400; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(50);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.avoidMouse();
        boid.update();
        boid.show();
    }
}
