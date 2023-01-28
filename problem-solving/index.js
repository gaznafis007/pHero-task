// rotateLeft function

function rotateLeft(array, turn) {
  let counts = [...Array(turn).keys()];

  counts.map((count) => {
    let shiftItem = array.shift();
    array.push(shiftItem);
    // console.log(array);
  });
  return array;
}

// Testing purpose
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(rotateLeft(arr, 8));
