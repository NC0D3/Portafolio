const canvas = document.getElementById("flockCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const flock = [];
let touchX = null;
let touchY = null;

function setup() {
    createCanvas(canvas.width,canvas.height);
    colorMode(HSB, 360, 100, 100);
    let isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    let boidCount = isMobile ? 100 : 400;
    for (let i = 0; i < boidCount; i++) {
        flock.push(new Boid());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.avoidMouse();
        boid.update();
        boid.show();
    }
}
