// Start the game over
function resetGame() {
  counter = 0;
  enemies = [];
  if(!runBest)
    generation_num++;
    
  highscore_num = 0;
}

// Create the next generation
function nextGeneration() {
  resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allDinos);
  // Generate a new set of agents
  activeDinos = generate(allDinos);
  // Copy those agents to another array
  allDinos = activeDinos.slice();
}

// Generate a new population of agents
function generate(oldDinos) {
  let newDinos = [];
  for (let i = 0; i < oldDinos.length; i++) {
    // Select a agent based on fitness
    let dino = poolSelection(oldDinos);
    newDinos[i] = dino;
  }
  return newDinos;
}

// Normalize the fitness of all agents
function normalizeFitness(dinos) {
  // Make score exponentially better?
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].score = pow(dinos[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < dinos.length; i++) {
    sum += dinos[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].fitness = dinos[i].score / sum;
  }
}


// An algorithm for picking one agent from an array
// based on fitness
function poolSelection(dinos) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= dinos[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;
  
  // Make sure it's a copy!
  // (this includes mutation)
  return dinos[index].copy();
}