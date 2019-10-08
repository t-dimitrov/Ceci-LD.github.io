// Mutation function to be passed into dino.brain
function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
}

class Dino{

    constructor(brain){
        this.r = 50
        this.x = this.r;
        this.y = height - this.r;
        this.yVelocity = 0;
        this.gravity = 2;

        // is this a copy of another bird or a new one?
        if(this.brain instanceof NeuralNetwork){
            this.brain = brain.copy;
            this.brain.mutate(mutate)
        }else{
            this.brain = new NeuralNetwork(7, 16, 1);
        }

        this.score = 0;
        this.fitness = 0;
    }

    show(){
        fill(132, 232, 172, 50)
        stroke("#84e8ac");
        rect(this.x, this.y, this.r, this.r)
    }

    jump(){
        if(this.y == height - this.r)
            this.yVelocity = -25;
    }

    move(){
        this.y += this.yVelocity;
        this.yVelocity += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);

        //every frame it is alive increases the score
        this.score++;
    }

    hits(enemy){
        return collideRectRect(this.x, this.y, this.r, this.r, enemy.x, enemy.y, enemy.r, enemy.r)
    }

    //Neural Network stuff
    copy(){
        return new Dino(this.brain);
    }

    think(enemies){
        //find the closest enemy
        let closest = enemies[0];
        let maximumX = Infinity
        let maximumY = Infinity
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x - this.x > maximumX && enemies[i].y - this.y < maximumY ){
                closest = enemies[i];
                maximumX = enemies[i].x - this.x
                maximumY = enemies[i].y - this.y
            }
        }

        //create inputs to the neural network
        if(closest != null){
           
            let inputs = [];

            inputs[0] = this.x; // dino x pos
            inputs[1] = this.y;
            inputs[2] = this.yVelocity; // dino y velocity
            inputs[3] = closest.y - this.y; // height diff b/w dino and enemy
            inputs[4] = closest.x - this.x; // distance b/w dino and enemy
            inputs[5] = closest.x; // enemy x pos
            inputs[6] = closest.y; // enemy y pos

            //get the outputs from the network
            let output = this.brain.predict(inputs);
            if(output[0] > 0.5){
                this.jump();
            }
         
        }
    }

}