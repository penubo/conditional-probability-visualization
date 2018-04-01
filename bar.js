class Bar {
    constructor(x, y, percentage) {
        this.pos = createVector(x, y);
        this.width = width*percentage;
        this.height = 10;
    }

    update() {
        if(this.pos.x+this.width > width) {
            let overAmount = this.pos.x+this.width - width;
            this.moveXPos(-overAmount);
        } else if(this.pos.x < 0) {
            let lessAmount = this.pos.x - 0;
            this.moveXPos(-lessAmount);
        }
    }

    setWidthPercentage(percentage) {
        this.width = width*percentage;
    }

    moveXPos(amount) {
        this.pos.x += amount;
    }

    setXPos(amount) {
        this.pos.x = amount;
    }

    getWidth() {
        return this.width;
    }

    getEdges() {
        return [this.pos.x, this.pos.x+this.width];
    }

}
