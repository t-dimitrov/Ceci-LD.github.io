let values = [];
let states = [];

let i = 0;
let w = 10;

var notSorting = true;

//Inputs
let input, bubble_button, heap_button, quick_button, randomize_button;
let slider;

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  cnv = createCanvas(800, 600);
  centerCanvas();

  //quickSort(values, 0, values.length - 1);
  //bubbleSort(values);
  //heapSort(values);

  bubble_button = createButton('Bubble Sort')
  bubble_button.size(100, 40)
  bubble_button.position(80, 20)

  heap_button = createButton('Heap Sort')
  heap_button.size(100, 40)
  heap_button.position(200, 20)

  quick_button = createButton('Quick Sort')
  quick_button.size(100, 40)
  quick_button.position(320, 20)

  randomize_button = createButton('Randomize Array')
  randomize_button.size(100, 40)
  randomize_button.position(480, 10)

  slider = createSlider(0, floor(width/w), floor(width/w), w)
  slider.position(465, 55)

  bubble_button.mousePressed(startBubbleSort)
  heap_button.mousePressed(startHeapSort)
  quick_button.mousePressed(startQuickSort)

  bubble_button.style('font-size', '1em')
  bubble_button.style('background-color', '#fae8c8');
  heap_button.style('font-size', '1em')
  heap_button.style('background-color', '#fae8c8');
  quick_button.style('font-size', '1em')
  quick_button.style('background-color', '#fae8c8');

  randomize_button.style('font-size', '1em')
  randomize_button.style('background-color', '#fae8c8');
  
  slider.style('font-size', '1em')
  slider.style('background-color', '#fae8c8');

  randomizeArray();

  randomize_button.mousePressed(randomizeArray)

}

function draw() {
  background("#fda77f");

  for(let i = 0; i < values.length; i++){

    noStroke();
    fill("#fda77f");

    if(states[i] == 0){
      fill("#445c3c");
    }else if(states[i] == 1){ 
      fill("#c9d99e");
    }else{
      fill("#fae8c8");
    }

    rect(i * w, height - values[i], w, values[i]);
  }

  console.log(notSorting)
}

// copied from StackOverflow
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeAlgorithm(algorithm){
  if(algorithm == 1){

    stopAlgorithms()
    bubbleSort(values)

  }else if (algorithm == 2){

    stopAlgorithms()
    heapSort(values)

  }else if (algorithm == 3){

    stopAlgorithms()
    quickSort(values)

  }else
    algorithm = 0
}

function startBubbleSort(){
  if(notSorting){
    bubbleSort(values)
    notSorting = false
  }
}

function startHeapSort(){
  if(notSorting){
    heapSort(values)
    notSorting = false
  }
}

function startQuickSort(){
  if(notSorting){
    quickSort(values, 0, values.length - 1)
    notSorting = false
  }
}

function randomizeArray(){
  if(notSorting){
    values = [] 
    values = new Array(slider.value());
    for(let i = 0; i < values.length; i++){
      values[i] = floor(random(height));
      states[i] = -1;
    } 
  }
}