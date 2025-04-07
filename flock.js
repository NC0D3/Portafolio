const canvas = document.getElementById("flockCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Boid {
      constructor() {
        this.position = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        };
        const angle = Math.random() * 2 * Math.PI;
        this.velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = 2;
        this.maxForce = 0.05;
      }

      update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > this.maxSpeed) {
          this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
          this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Reset acceleration
        this.acceleration.x = 0;
        this.acceleration.y = 0;

        // Wrap around edges
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = canvas.height;
        if (this.position.y > canvas.height) this.position.y = 0;
      }

      applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
      }

      flock(boids) {
        const separation = { x: 0, y: 0 };
        const alignment = { x: 0, y: 0 };
        const cohesion = { x: 0, y: 0 };
        let count = 0;

        for (let other of boids) {
          const dx = other.position.x - this.position.x;
          const dy = other.position.y - this.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const range = 50;

          if (other !== this && distance < range) {
            // Separation
            separation.x -= dx / distance;
            separation.y -= dy / distance;

            // Alignment
            alignment.x += other.velocity.x;
            alignment.y += other.velocity.y;

            // Cohesion
            cohesion.x += other.position.x;
            cohesion.y += other.position.y;

            count++;
          }
        }

        if (count > 0) {
          // Separation
          separation.x /= count;
          separation.y /= count;
          const magSep = Math.sqrt(separation.x ** 2 + separation.y ** 2);
          if (magSep > 0) {
            separation.x = (separation.x / magSep) * this.maxSpeed - this.velocity.x;
            separation.y = (separation.y / magSep) * this.maxSpeed - this.velocity.y;
          }

          // Alignment
          alignment.x /= count;
          alignment.y /= count;
          const magAli = Math.sqrt(alignment.x ** 2 + alignment.y ** 2);
          if (magAli > 0) {
            alignment.x = (alignment.x / magAli) * this.maxSpeed - this.velocity.x;
            alignment.y = (alignment.y / magAli) * this.maxSpeed - this.velocity.y;
          }

          // Cohesion
          cohesion.x /= count;
          cohesion.y /= count;
          cohesion.x = cohesion.x - this.position.x;
          cohesion.y = cohesion.y - this.position.y;
          const magCoh = Math.sqrt(cohesion.x ** 2 + cohesion.y ** 2);
          if (magCoh > 0) {
            cohesion.x = (cohesion.x / magCoh) * this.maxSpeed - this.velocity.x;
            cohesion.y = (cohesion.y / magCoh) * this.maxSpeed - this.velocity.y;
          }

          // Apply weights
          this.applyForce({ x: separation.x * 1.5, y: separation.y * 1.5 });
          this.applyForce({ x: alignment.x * 1.0, y: alignment.y * 1.0 });
          this.applyForce({ x: cohesion.x * 1.0, y: cohesion.y * 1.0 });
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${(this.position.x + this.position.y) % 360}, 100%, 60%)`;
        ctx.fill();
      }
    }

    const boids = [];
    for (let i = 0; i < 100; i++) {
      boids.push(new Boid());
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let boid of boids) {
        boid.flock(boids);
        boid.update();
        boid.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();
