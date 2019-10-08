//GUI
var generation_text;
let generation_num = 0;

var highscore_text;
let highscore_num = 0;

var globalhighscore_text;
let globalhighscore_num = 0;

var population_size;
var alive_text;


let enemies = [];

//frame counter to determine when to add enemy
let counter = 0

//NEAT stuff
let population = 550;
let activeDinos = [] // not dead
let allDinos = []; //all dinos for any given population
let bestDino;
let runBest = false;
var runBest_button;

var cnv
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
function windowResized() {
  centerCanvas();
}

function setup() {
  cnv = createCanvas(800, 450);
  centerCanvas();

  generation_text = createElement('h3', 'Generation: ');
  generation_text.position(20, height - 30)
  population_size = createElement('h3', 'Population size: ')
  population_size.position(20, height)
  highscore_text = createElement('h3', 'High score: ')
  highscore_text.position(20, height + 60)
  globalhighscore_text = createElement('h3', "Best: ")
  globalhighscore_text.position(20, height + 90)
  alive_text = createElement('h3', 'Alive: ')
  alive_text.position(20, height + 30)

  runBest_button = createButton('Show best')
  runBest_button.style('background-color', '#84e8ac');
  runBest_button.position(20, height + 140)
  runBest_button.mousePressed(toggleState)
  
  //Create a population
  for(let i = 0; i < population; i++){
    let dino = new Dino();
    activeDinos[i] = dino;
    allDinos[i] = dino;
  }
}

function draw() {
  background(20);
  generation_text.html('Generation: ' + generation_num);
  population_size.html('Population size: ' + population)
  highscore_text.html('High score: ' + highscore_num);
  globalhighscore_text.html('Best: ' + globalhighscore_num)
  alive_text.html('Alive: ' + activeDinos.length)

  //Spawn a new enemy every so often
  if(counter % 30 == 0){
    enemies.push(new Enemy());
  }
  counter++;

  // show all enemies;
  for (let e of enemies){
    e.show();
    e.move();
    if(e.offscreen()){
      enemies.splice(e, 1);
    }
  }

  if(runBest){ // Show the best

    bestDino.think(enemies);
    bestDino.show();
    bestDino.move();
    
    for(let i = 0; i < enemies.length; i++){
      if(bestDino.hits(enemies[i])){
        resetGame()
        break;
      }
    }

  }else{ //Training

    for (let i = activeDinos.length - 1; i >= 0; i--) {
      let dino = activeDinos[i];
      // dino uses its brain!
      dino.show();
      dino.think(enemies);
      dino.move();

      // Check all the enemies
      for (let j = 0; j < enemies.length; j++) {
        // It's hit a enemies
        if (activeDinos[i].hits(enemies[j])) {
          // Remove this dino
          activeDinos.splice(i, 1);
          break;
        }
      }

    }

    if (activeDinos.length == 0) {
      nextGeneration();
    }
  }

  let tempHighScore = 0;
  // If we're training
  if (!runBest) {
    // Which is the best bird?
    let tempBest = null;
    for (let i = 0; i < activeDinos.length; i++) {
      let s = activeDinos[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBest = activeDinos[i];
      }
    }

    // Is it the all time high scorer?
    if (tempHighScore > globalhighscore_num) {
      globalhighscore_num = tempHighScore;
      bestDino = tempBest;
    }
  } else {
    // Just one bird, the best one so far
    tempHighScore = bestDino.score;
    if (tempHighScore > highscore_num) {
      highscore_num = tempHighScore;
    }
  }
  
  highscore_num++;
  

}

function toggleState(){
  runBest = !runBest;
  if(runBest){
    resetGame();
    // show the best
    runBest_button.html('Continue Training')
  }else{
    nextGeneration();
    // train more
    runBest_button.html('Show best')
  }
}