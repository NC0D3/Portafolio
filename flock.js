    const canvas = document.getElementById("flockCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Boid {
      constructor() {
        this.position = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        };
        const angle = Math.random() * 2 * Math.PI;
        this.velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle),
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = 2.5;  // Incrementar la velocidad máxima
        this.maxForce = 0.08;  // Fuerza máxima ajustada
      }

      update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        const speed = Math.hypot(this.velocity.x, this.velocity.y);
        if (speed > this.maxSpeed) {
          this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
          this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

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
        const perception = 100;  // Aumentar el rango de percepción
        let total = 0;
        let align = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let separation = { x: 0, y: 0 };

        for (let other of boids) {
          const dx = other.position.x - this.position.x;
          const dy = other.position.y - this.position.y;
          const d = Math.hypot(dx, dy);
          if (other !== this && d < perception) {
            // Alineación
            align.x += other.velocity.x;
            align.y += other.velocity.y;

            // Cohesión
            cohesion.x += other.position.x;
            cohesion.y += other.position.y;

            // Separación
            separation.x -= dx / (d * d);
            separation.y -= dy / (d * d);
            separation.x *= 0.6;
            separation.y *= 0.6;

            total++;
          }
        }

        if (total > 0) {
          // Alineación
          align.x /= total;
          align.y /= total;
          let mag = Math.hypot(align.x, align.y);
          if (mag > 0) {
            align.x = (align.x / mag) * this.maxSpeed - this.velocity.x;
            align.y = (align.y / mag) * this.maxSpeed - this.velocity.y;
          }

          // Cohesión
          cohesion.x /= total;
          cohesion.y /= total;
          cohesion.x -= this.position.x;
          cohesion.y -= this.position.y;
          mag = Math.hypot(cohesion.x, cohesion.y);
          if (mag > 0) {
            cohesion.x = (cohesion.x / mag) * this.maxSpeed - this.velocity.x;
            cohesion.y = (cohesion.y / mag) * this.maxSpeed - this.velocity.y;
          }

          // Separación
          mag = Math.hypot(separation.x, separation.y);
          if (mag > 0) {
            separation.x = (separation.x / mag) * this.maxSpeed - this.velocity.x;
            separation.y = (separation.y / mag) * this.maxSpeed - this.velocity.y;
          }

          this.applyForce({ x: align.x * 1.5, y: align.y * 1.5 });
          this.applyForce({ x: cohesion.x * 1.2, y: cohesion.y * 1.2 });
          this.applyForce({ x: separation.x * 0.8, y: separation.y * 0.8 });
        }
      }

      draw() {
        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, 4);
        ctx.lineTo(-10, -4);
        ctx.closePath();
        ctx.fillStyle = "#ff0000cc";
        ctx.fill();
        ctx.restore();
      }
    }

    const flock = [];
    for (let i = 0; i < 70; i++) {
      flock.push(new Boid());
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let boid of flock) {
        boid.flock(flock);
        boid.update();
        boid.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();
