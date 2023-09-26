// Merge sort using recursion
function mergeArrays(leftArr, rightArr) {
    const resultArr = [];
    let i = 0;
    let j = 0;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] < rightArr[j]) {
            resultArr.push(leftArr[i++]);
        } else {
            resultArr.push(rightArr[j++]);
        }
    }

    while (i < leftArr.length) {
        resultArr.push(leftArr[i++]);
    }

    while (j < rightArr.length) {
        resultArr.push(rightArr[j++]);
    }

    return resultArr;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middOfArr = Math.floor(arr.length / 2);
    const leftSideOfArr = mergeSort(arr.slice(0, middOfArr));
    const rightSideOfArr = mergeSort(arr.slice(middOfArr));

    return mergeArrays(leftSideOfArr, rightSideOfArr);
}

const array = [4, 2, 10, 1, 19, 17, 8, 2];

    // console.log(mergeSort(array));