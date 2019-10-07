async function swap(items, firstIndex, secondIndex){
    await sleep(10);

    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

async function partition(arr, start, end) {

    for(let i = start; i < end; i++){
        states[i] = 1;
    }
    let pivotValue = arr[end];
    let pivotIndex = start;

    states[pivotIndex] = 0;

    for(let i = start; i < end; i++){
        if(arr[i] < pivotValue){
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }

    await swap(arr, pivotIndex, end);

    for(let i = start; i < end; i++){
        if(i != pivotIndex){
            states[i] = -1;
        }
    }

    return pivotIndex;
}

async function quickSort(arr, start, end) {
    if ( start >= end){
        return;
    }

    let index = await partition(arr, start, end);

    await Promise.all([
        (quickSort(arr, start, index - 1)),
        (quickSort(arr, index + 1, end))
    ]);

    states[index] = -1;

    notSorting = true;
}