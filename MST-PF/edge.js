function edge(p1, p2)
{
    this.value = (abs(p2.x - p1.x) + abs(p2.y - p1.y));
    p1.edges.push(this);
    p2.edges.push(this);
    p1.neighbours.push(p2);
    p2.neighbours.push(p1);

    this.draw = function()
    {
        stroke(255);
        strokeWeight(2);
        line(p1.x, p1.y, p2.x, p2.y);
    }

    this.drawPath = function()
    {
        stroke(0, 0, 255);
        strokeWeight(4);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}