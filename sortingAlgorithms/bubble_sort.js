async function swap(items, firstIndex, secondIndex){
    await sleep(50);

    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

async function bubbleSort(arr){
    let swapped;
    let unSorted = arr.length - 1;

    do{
        swapped = false;
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr.length; j++){
                if(arr[j] > arr[j + 1]){

                    states[j] = 0;
                    
                    await swap(arr, j, j + 1);
                    swapped = true;
                    states[j] = -1;
                }

                if(j == unSorted){
                    states[j] = 1;
                    unSorted--;
                }
                
            }

        }
    } while(swapped);

    
    notSorting = true;
    return arr;
}
