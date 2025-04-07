const canvas = document.getElementById("flockCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const flock = [];
let isTouching = false;
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

canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    touchX = touch.clientX - rect.left;
    touchY = touch.clientY - rect.top;
    isTouching = true;
}, { passive: true });  // NO bloquea el scroll

canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    touchX = touch.clientX - rect.left;
    touchY = touch.clientY - rect.top;
}, { passive: true });

canvas.addEventListener("touchend", () => {
    isTouching = false;
    touchX = null;
    touchY = null;
}, { passive: true });

function touchEnded() {
    touchX = null;
    touchY = null;
}
