var reached = [];
var unreached = [];
var final;

function minimumSpanningTree()
{
    final = undefined;
    for(let i = 0; i < nodes.length; i++)
    {
        unreached.push(nodes[i]);
    }

    reached.push(unreached[0]);
    unreached.splice(0, 1);

    while(unreached.length > 0)
    {
        var record = 10000000000;
        var rIndex;
        var uIndex;

        for(let i = 0; i < reached.length; i++)
        {
            for(let j = 0; j < unreached.length; j++)
            {
                var v1 = reached[i];
                var v2 = unreached[j];
                var d = dist(v1.x, v1.y, v2.x, v2.y);

                if(d < record)
                {
                    record = d;
                    rIndex = i;
                    uIndex = j;
                }
            }
        }
        
        final = [reached[rIndex], unreached[uIndex]];
        reached.push(unreached[uIndex]);
        unreached.splice(uIndex, 1);
        
    }

    return final;
}