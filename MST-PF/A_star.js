function removeFromArray(arr, elem)
{
    for(let i = arr.length - 1; i >= 0; i--)
    {
        if(arr[i] == elem)
            arr.splice(i, 1);
    }
}

function heuristics(a, b)
{
    var d = dist(a.x, a.y, b.x, b.y);
    return d;
}

function A_star()
{
    this.openSet = [];
    this.closedSet = [];
    this.path = [];
    this.edges = [];

    this.start = function()
    {
        this.openSet.push(startingNode);
    }

    this.execute = function()
    {
        if(this.openSet.length > 0)
        {
            var bestIndex = 0;
            for(var i = 0; i < this.openSet.length; i++)
            {
                if(this.openSet[i].f < this.openSet[bestIndex].f)
                    bestIndex = i;
            }
            var current = this.openSet[bestIndex];

            if(this.openSet[bestIndex] == endingNode){

                this.path = [];
                this.edges = [];
                var temp = current;
                this.path.push(temp);
                while(temp.parent){
                    this.path.push(temp.parent);
                    let newEdge = new edge(temp, temp.parent);
                    this.edges.push(newEdge);
                    temp = temp.parent;
                }
                console.log("DONE!");
            }

            removeFromArray(this.openSet, current);
            this.closedSet.push(current);

            var neighbours = current.neighbours;

            for(var i = 0; i < neighbours.length; i++)
            {
                var neighbour = neighbours[i];

                if(!this.closedSet.includes(neighbour))
                {
                    var tempG = current.g + abs(dist(current.x, current.y, neighbour.x, neighbour.y));

                    if(this.openSet.includes(neighbour))
                    {
                        if(tempG < neighbour.g)
                        {
                            neighbour.g = tempG;
                        }
                    }
                    else
                    {
                        neighbour.g = tempG;
                        this.openSet.push(neighbour);
                    }

                    neighbour.h = heuristics(neighbour, endingNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = current;
                }
            }

        }
        else
        {
            return;
        }
    }

    this.draw = function()
    {
        for(var i = 0; i < this.path.length; i++)
        {
            this.path[i].drawPath();
        }

        for(var i = 0; i < this.edges.length; i++)
        {
            this.edges[i].drawPath();
        }
    }

}