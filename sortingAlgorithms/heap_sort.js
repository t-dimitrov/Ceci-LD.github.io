async function heap_root(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  states[i] = 0

  if (left < array_length && input[left] > input[max]){
    max = left;
  }

  if (right < array_length && input[right] > input[max]){
    max = right;
  }

  if (max != i) {
    await swap(input, i, max);
    await heap_root(input, max);
  }

  states[i] = -1
}

async function swap(input, index_A, index_B) {
  await sleep(100);

  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}

async function heapSort(input) {
  
  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1){
      states[i] = 0;
      states[input] = 0;
      await heap_root(input, i);
      states[i] = -1
    }

  for (i = input.length - 1; i > 0; i--) {

    await swap(input, 0, i);
    array_length--;
      
    states[i] = 1
    
    await heap_root(input, 0);
  }

  
  notSorting = true;
}