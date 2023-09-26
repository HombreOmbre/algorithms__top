// Fibonacci using loop
function fibs(n) {
    const arr = [];

    for (let i = 0; i <= n; i++) {
        if (i === 0) {
            arr.push(i);
        } else if (i === 1) {
            arr.push(i);
        } else {
            arr.push(arr[i - 1] + arr[i - 2]);
        }
    }

    return arr;
}

    // console.log(fibs(8));

// Fibonacci using recursion bottom-up
function fibsRec(n) {
    return fibsRec_aux(n, 0, 1, []);
}

function fibsRec_aux(n , i, j, arr) {
    arr.push(i);

    if (n <= 0) {
        return arr;
    }

    return fibsRec_aux(n - 1, j, j + i, arr);
}

    // console.log(fibsRec(8));

// Fibonacci using recursion top - down
const fibsRec2 = (n) => (n <= 1) ? n : fibsRec2(n - 1) + fibsRec2(n - 2);

function fibsRec3(n) {
    if (n <= 1) {
        return n;
    }

    return fibsRec3(n - 1) + fibsRec3(n - 2);
}

    // console.log(fibsRec2(8));
    // console.log(fibsRec3(8));
