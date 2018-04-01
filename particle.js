class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = 15;
        this.color = color(255, 255, 255);
    }

    move() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyforce(force) {
        let f = p5.Vector.div(force, this.mass)
        this.acc.add(f);
    }

    update() {
        this.move();
    }

    isHitGround() {
        return this.pos.y > height;
    }

    setColor(givenColor) {
        switch(givenColor) {
            case "red":
                this.color = color(255, 0, 0);
                break;
            case "blue":
                this.color = color(0, 0, 255);
                break;
            case "purple":
                this.color = color(255, 0, 255);
                break;
            default: break;
        }
    }

    isCollideWithBar(bar) {
        let x1 = bar.pos.x;
        let y1 = bar.pos.y;
        let x2 = bar.pos.x + bar.width;
        return ((x1 <= this.pos.x && this.pos.x <= x2) && this.pos.y > y1)
    }
}
