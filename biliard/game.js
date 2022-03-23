class ball {
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  hasCollided = 0;
  accelX = 0;
  accelY = 0;
  constructor(x, y) {
    this.speedX = Math.random() * 2 - 1;
    this.x = x;
    this.y = y;
  }
  updateSelf() {
    if (this.x < 0 || this.x > canvas.width) {
      this.speedX *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX += this.accelX;
    this.speedY += this.accelY;
    this.speedY += 0.04;
    if (this.y >= canvas.height - 20) {
      this.speedY *= -1;
    }
    for (let i = 0; i < balls.length; i++) {
      if (i != balls.indexOf(this)) {
        if (Math.hypot(this.x - balls[i].x, this.y - balls[i].y) <= 10) {
          this.angleOfCollision = Math.atan2(
            this.y - balls[i].y,
            this.x - balls[i].x
          );
          let tanangle = Math.atan2(
            this.y +
              20 * Math.sin(this.angleOfCollision) -
              this.y +
              20 * Math.sin(this.angleOfCollision + 0.1),
            this.x +
              20 * Math.cos(this.angleOfCollision) -
              this.x +
              20 * Math.cos(this.angleOfCollision + 0.1)
          );

          let speed = Math.hypot(this.speedX, this.speedY);
          this.speedX = 0.5 * speed * Math.cos(tanangle);
          this.speedY = 0.5 * speed * Math.sin(tanangle);

          this.hasCollided = 0;

          // this.speedY = 0;
        }
      }
    }
  }
  drawSelf() {
    if (this.hasCollided == 1) {
      let tanangle = Math.atan2(
        this.y +
          20 * Math.sin(this.angleOfCollision) -
          this.y +
          20 * Math.sin(this.angleOfCollision + 0.1),
        this.x +
          20 * Math.cos(this.angleOfCollision) -
          this.x +
          20 * Math.cos(this.angleOfCollision + 0.1)
      );

      drawLine(
        this.x - 20 * Math.cos(this.angleOfCollision),
        this.y - 20 * Math.sin(this.angleOfCollision),
        this.x -
          20 * Math.cos(this.angleOfCollision) +
          200 * Math.cos(tanangle + Math.PI / 2),
        this.y -
          20 * Math.sin(this.angleOfCollision) +
          200 * Math.sin(tanangle + Math.PI / 2)
      );
    }

    context.beginPath();
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.stroke();
  }
}
balls = [];

for (let i = 0; i < 300; i++) {
  balls.push(
    new ball(Math.random() * canvas.width, Math.random() * canvas.height)
  );
}

function update() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].updateSelf();
  }
}
function draw() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawSelf();
  }
}
