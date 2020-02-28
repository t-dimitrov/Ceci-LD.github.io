function node(x, y)
{
    this.x = x;
    this.y = y;

    this.f;
    this.g;
    this.h;

    this.edges = [];
    this.neighbours = [];
    this.searched = false;
    this.parent = null;

    this.draw = function()
    {
        fill(255);
        stroke(255);
        ellipse(this.x, this.y, 16, 16);
    }

    this.drawStarting = function()
    {
        fill(0, 255, 0);
        stroke(255);
        ellipse(this.x, this.y, 16, 16);
    }

    this.drawEnding = function()
    {
        fill(255, 0, 0);
        stroke(255);
        ellipse(this.x, this.y, 16, 16);
    }

    this.drawPath = function()
    {
        fill(0, 0, 255);
        stroke(255);
        ellipse(this.x, this.y, 16, 16);
    }
}