
let tris = [];

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style("position", "fixed");
  cnv.style("top", "0");
  cnv.style("left", "0");
  cnv.style("z-index", "-1");

  angleMode(DEGREES);
  noStroke();

  for (let i = 0; i < 45; i++) {
    tris.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      angle: random(360),
      rotSpeed: random(-0.4, 0.4),
      vx: random(-0.3, 0.3),
      vy: random(-0.3, 0.3),
      alpha: random(40, 90)
    });
  }
}

function draw() {
  clear();

  for (let t of tris) {
    let d = dist(mouseX, mouseY, t.x, t.y);

    // Mouse interaction
    if (d < 150) {
      let dir = atan2(t.y - mouseY, t.x - mouseX);
      t.vx += cos(dir) * 0.08;
      t.vy += sin(dir) * 0.08;
      t.rotSpeed += 0.02;
    }

    // Smooth movement
    t.vx *= 0.97;
    t.vy *= 0.97;
    t.rotSpeed *= 0.98;

    // Update position
    t.x += t.vx;
    t.y += t.vy;
    t.angle += t.rotSpeed;

    // Wrap around edges
    if (t.x < -t.size) t.x = width + t.size;
    if (t.x > width + t.size) t.x = -t.size;
    if (t.y < -t.size) t.y = height + t.size;
    if (t.y > height + t.size) t.y = -t.size;

    // Draw triangle
    push();
    translate(t.x, t.y);
    rotate(t.angle);

    fill(0, t.alpha);
    const s = t.size;
    triangle(
      0, -s * 0.6,
      -s * 0.5, s * 0.4,
      s * 0.5, s * 0.4
    );

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
