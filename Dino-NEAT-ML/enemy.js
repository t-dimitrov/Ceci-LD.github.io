
class Enemy{
    constructor(){
        this.r = 50;
        this.x = width;
        this.y = this.yPosition();
        this.speed = 12
    }

    show(){
        fill('#992b29')
        stroke(0)
        rect(this.x, this.y, this.r, this.r)
    }

    move(){
        this.x -= this.speed;
    }

    yPosition(){
        //return random(height - this.r)

        let x = random(1);
        if(x > 0.75){
            return height - this.r
        }else {
            let y = random(1);
            if(y > 0.75) return height - this.r * 4
            else {
                let z = random(1);
                if(z > 0.5)
                    return height - this.r * 3
                else
                    return height - this.r * 2
            }
        }
    }


    offscreen(){
        if(this.x < 0 - this.r) return true;
        else return false;
    }
}