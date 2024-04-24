function test(arr) {
  let [a, b, c] = arr;
  if (a && a === b && a === c) {
    return a;
  }
  return null;
}

export default function calculateWinner(arr) {
  for (let i = 0; i < 3; i++) {
    let row = arr[i];
    if (test(row)) return test(row);
    let col = [];
    for (let j = 0; j < 3; j++) {
      col.push(arr[j][i]);
    }
    if (test(col)) return test(col);
  }
  let [right, left] = [
    [arr[0][0], arr[1][1], arr[2][2]],
    [arr[0][2], arr[1][1], arr[2][0]],
  ];
  if (test(right)) return test(right);
  if (test(left)) return test(left);
  return null;
}
