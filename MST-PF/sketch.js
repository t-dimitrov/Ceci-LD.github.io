var nodes = [];
var edges = [];

var reached = [];
var unreached = [];

var initializationNodes = 0;

var startNodeChosen = false;
var startingNode;
var endingNode;

var a_star;
var startAlgorithm = false;

function setup() {
  createCanvas(800, 600);
}

function mousePressed()
{
  //Choose starting/ ending node
  if(initializationNodes >= 20)
  {
    if(!startNodeChosen){ //Choose starting point
      for(let i = 0; i < nodes.length; i++)
      {
        //Check for collision on a node
        if(mouseX < nodes[i].x + 16 &&
          mouseX + 16 > nodes[i].x &&
          mouseY < nodes[i].y + 16 &&
          mouseY + 16 > nodes[i].y)
        {
          startingNode = nodes[i]; //Set starting Node
          startNodeChosen = true;
        }
      }
    }else{
      for(let i = 0; i < nodes.length; i++) //Choose ending point
      {
        //Check for collision on a node
        if(mouseX < nodes[i].x + 16 &&
          mouseX + 16 > nodes[i].x &&
          mouseY < nodes[i].y + 16 &&
          mouseY + 16 > nodes[i].y)
        {
          endingNode = nodes[i]; //Set ending point
          startAlgorithm = true;
        }
      }
    }
  }

  if(initializationNodes < 20){
    let n = new node(mouseX, mouseY);
    nodes.push(n);

    let e = minimumSpanningTree();
    if(e){
      let edge1 = new edge(e[0], e[1]);
      edges.push(edge1);
    }
    initializationNodes++;

    // for(let i = 0; i < 50; i++)
    // {
    //   let n = new node(random(1)* (800 - 16), random(1)* (600 - 16));
    //   nodes.push(n);
    //   let e = minimumSpanningTree();
    //   if(e){
    //     let edge1 = new edge(e[0], e[1]);
    //     edges.push(edge1);
    //   }
    // }
    
    // initializationNodes = 100;
  }
  if(startAlgorithm)
  {
    a_star = new A_star();
    a_star.start();
  }
}

function draw() {
  background(51);

  //Draw each node on the screen
  for(let i = 0; i < nodes.length; i++)
  {
    if(nodes[i]){
      if(nodes[i] === startingNode)
        nodes[i].drawStarting();
      else if(nodes[i] === endingNode)
        nodes[i].drawEnding();
      else
        nodes[i].draw();
    }
  }

  for(let i = 0; i < edges.length; i++)
  {
    if(edges[i])
      edges[i].draw();
  }

  if(startAlgorithm){
    a_star.execute();
    a_star.draw();
  }
}
