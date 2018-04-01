class BarModifier {

    constructor(aSlider, bSlider, abSlider) {
        this.aSlider = aSlider;
        this.bSlider = bSlider;
        this.abSlider = abSlider;

        this.probA = aSlider.value();
        this.probB = bSlider.value();
        this.probAB = abSlider.value();

        this.abLength = width * this.probAB;

        this.barA = new Bar(0, 100, this.probA);
    	this.barB = new Bar(100, 200, this.probB);
        let positionOfBarAB = this.getXRangeOfBarAB();
        this.barAB = new Bar(positionOfBarAB[0] , this.barB.pos.y, this.probAB);
    }

    update() {
        this.updateProbabilities();
        this.updateProbabilityOfAandB();
        this.updatePositionOfBarB();
    }

    updateProbabilities() {
        this.probA = this.aSlider.value();
        this.probB = this.bSlider.value();
        this.probAB = this.abSlider.value();

        this.barA.setWidthPercentage(this.probA);
        this.barB.setWidthPercentage(this.probB);
        this.barAB.setWidthPercentage(this.probAB);
    }

    updateProbabilityOfAandB() {
        if(this.getAorB() > 1) {
            this.probAB = this.probA + this.probB - 1;
            this.abSlider.value(this.probAB);
        } else if(this.probAB > min(this.probA, this.probB)) {
            this.probAB = min(this.probA, this.probB);
            this.abSlider.value(this.probAB);
        }
        this.updateABLength()
    }

    updateABLength() {
        this.abLength = width * this.probAB;
    }

    getAorB() {
        return this.probA + this.probB - this.probAB
    }

    getAGivenB() {
        return this.probAB / this.probB
    }

    getBGivenA() {
        return this.probAB / this.probA
    }
    
    updatePositionOfBarB() {
        let tailOfBarA = this.barA.getEdges()[1];
        let abStartX = tailOfBarA - this.abLength;
        this.barB.setXPos(abStartX);
        this.barAB.setXPos(abStartX);
    }

    getXRangeOfBarAB() {
        let tailOfBarA = this.barA.getEdges()[1];
        let abStartX = tailOfBarA - this.abLength;
        let abEndX = tailOfBarA;
        return [abStartX, abEndX];
    }
}
