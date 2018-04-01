
var particleCloud;
var modifier;
var aSlider, bSlider, abSlider, labelA, labelB, labelAB, labelAGivenB, labelBGivenA, labelAOrB;
var gravity;
var percentage;

function setup() {
	createCanvas(400, 400);
	gravity = createVector(0, 1);

	createSliders();
	createLabels();


	modifier = new BarModifier(aSlider, bSlider, abSlider);
	particleCloud = new ParticleCloud(0.99, modifier.barA, modifier.barB, modifier.barAB);

}

function updateLabels() {
	labelA.elt.innerHTML = percentage.format(modifier.probA*100) + '%'
	labelB.elt.innerHTML = percentage.format(modifier.probB*100) + '%'
	labelAB.elt.innerHTML = percentage.format(modifier.probAB*100) + '%'
	labelAGivenB.elt.innerHTML = 'P(A|B) = ' + percentage.format(modifier.getAGivenB()*100)+'%'
	labelBGivenA.elt.innerHTML = 'P(B|A) = ' + percentage.format(modifier.getBGivenA()*100)+'%'
	labelAOrB.elt.innerHTML = 'P(A or B) = ' + percentage.format(modifier.getAorB()*100)+'%'
}

function draw() {
	background(0);
	particleCloud.run()
	modifier.update();

	//draw bar
	fill(color('red'));
	rect(modifier.barA.pos.x, modifier.barA.pos.y, modifier.barA.width, modifier.barA.height);
	fill(color('blue'));
	rect(modifier.barB.pos.x, modifier.barB.pos.y, modifier.barB.width, modifier.barB.height);

}

function createSliders() {
	aSlider = createSlider(0, 1, 0.3, 0.001);
	bSlider = createSlider(0, 1, 0.5, 0.001);
	abSlider = createSlider(0, 1, 0.2, 0.001);

	aSlider.position(500, 100);
	bSlider.position(500, 200);
	abSlider.position(500, 300);

	aSlider.changed(updateLabels);
	bSlider.changed(updateLabels);
	abSlider.changed(updateLabels);
}

function createLabels() {
	let a = createP('A');
	let b = createP('B');
	let ab = createP('A and B');

	a.position(425, 75);
	b.position(425, 175);
	ab.position(425, 275);

	percentage = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
	labelA = createP(percentage.format(30)+'%');
	labelB = createP(percentage.format(50)+'%');
	labelAB = createP(percentage.format(20)+'%');

	labelA.position(650, 75);
	labelB.position(650, 175);
	labelAB.position(650, 275);

	let conditionalProbability = getConditionalProbability()
	let aorb = getAorBProbability()
	labelAGivenB = createP('P(A|B) = ' + percentage.format(conditionalProbability[0]*100)+'%')
	labelBGivenA = createP('P(B|A) = ' + percentage.format(conditionalProbability[1]*100)+'%')
	labelAOrB = createP('P(A or B) = ' + percentage.format(aorb*100)+'%')

	labelBGivenA.position(800, 75)
	labelAGivenB.position(800, 175)
	labelAOrB.position(800, 275)
}


function getConditionalProbability() {
	let probAB = abSlider.value()
	let probA = aSlider.value()
	let probB = bSlider.value()
	let probAGivenB = probAB / probB
	let probBGivenA = probAB / probA
	return [probAGivenB, probBGivenA]
}

function getAorBProbability() {
	let probAB = abSlider.value()
	let probA = aSlider.value()
	let probB = bSlider.value()
	return probA + probB - probAB
}






//
