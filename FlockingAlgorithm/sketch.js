const flock = [];
var numberOfBoids = 100;
var counter = 0;

function setup() {
    createCanvas(1920, 1080);
    for(let i = 0; i < numberOfBoids; i++){
        flock.push(new Boid());
    }
}

function draw() {
    background(51);
  
    for(let boid of flock)
    {
        boid.boundaries();
        boid.compute(flock);
        boid.draw();
    }

    counter++;
    if(counter >= 100)
    {
        counter = 0;
        flock.slice(0, 1);
        flock.push(new Boid());
    }
}