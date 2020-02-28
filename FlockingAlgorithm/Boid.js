class Boid
{
    constructor()
    {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 5));
        this.acceleration = createVector();
        this.mass = random(1, 10);
        this.maxForce = 0.1;
        this.maxSpeed = 3;
    }

    boundaries()
    {
        if(this.position.x > width)
            this.position.x = 0;
        else if(this.position.x < 0)
            this.position.x = width
        if(this.position.y > height)
            this.position.y = 0;
        else if(this.position.y < 0)
            this.position.y = height
    }

    allignment(flock)
    {
        let sight = 50;
        let desiredVel = createVector();
        let counter = 0;
        for(let other of flock)
        {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && distance < sight){
                desiredVel.add(other.velocity);
                counter++;
            }
        }
        if(counter > 0){
            desiredVel.div(counter);
            desiredVel.setMag(this.maxSpeed);
            desiredVel.sub(this.velocity);
            desiredVel.limit(this.maxForce);
        }
        return desiredVel;
    }

    cohesion(flock)
    {
        let sight = 50;
        let desiredVel = createVector();
        let counter = 0;
        for(let other of flock)
        {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && distance < sight){
                desiredVel.add(other.position);
                counter++;
            }
        }
        if(counter > 0){
            desiredVel.div(counter);
            desiredVel.sub(this.position);
            desiredVel.setMag(this.maxSpeed);
            desiredVel.sub(this.velocity);
            desiredVel.limit(this.maxForce);
        }
        return desiredVel;
    }

    separation(flock)
    {
        let sight = 50;
        let desiredVel = createVector();
        let counter = 0;
        for(let other of flock)
        {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && distance < sight){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(distance);
                desiredVel.add(diff);
                counter++;
            }
        }
        if(counter > 0){
            desiredVel.div(counter);
            desiredVel.setMag(this.maxSpeed);
            desiredVel.sub(this.velocity);
            desiredVel.limit(this.maxForce);
        }
        return desiredVel;
    }

    compute(flock)
    {
        let align = this.allignment(flock);
        align = align.div(this.mass);
        let cohesion = this.cohesion(flock)
        cohesion = cohesion.div(this.mass);
        let separation = this.separation(flock);
        separation = separation.div(this.mass);

        this.acceleration.add(align);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);

        //update movement
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration.mult(this.mass));
        this.acceleration.mult(0);
    }

    draw()
    {
        circle(this.position.x, this.position.y, this.mass * 5);
        fill(255, 255, 0, 55);
    }
}