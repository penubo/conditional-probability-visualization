class ParticleCloud {
    constructor(frequency=1, barA, barB, barAB) {
        this.frequency = frequency;
        this.particles = [];
        this.gravity = createVector(0, 1);
        this.barA = barA;
        this.barB = barB;
        this.barAB = barAB
    }

    run() {
        this.makeParticle();

        for (let i = 0; i < this.particles.length; i++) {
            // logic
            let particle = this.particles[i];
            particle.applyforce(gravity);
            particle.update();
            if(particle.isCollideWithBar(this.barA)){
                particle.setColor("red");
            }
            if(particle.isCollideWithBar(this.barB)) {
                if(particle.isCollideWithBar(this.barAB)) {
                    particle.setColor("purple");
                } else {
                    particle.setColor("blue");
                }
            }
            if(particle.isHitGround()) {
                this.particles.splice(i, 1);
            }
            // render
            fill(particle.color);
            ellipse(particle.pos.x, particle.pos.y, 5, 5);
        }
    }

    makeParticle() {
        // depend on frequency
        if (random() < this.frequency) {
            this.particles.push(new Particle(random(0, width), 0));
        }
        return;
    }

    updatePositionOfBars(barA, barB) {
        this.barA = barA;
        this.barB = barB;
    }
}
