const file = Bun.file('input.txt');
const input = await file.text();

/**
 * Parse Input
 */
const lines = input.split('\r\n');
const times = Array.from(lines[0].matchAll(/\d+/g), v => Number(v[0]))
const distances = Array.from(lines[1].matchAll(/\d+/g), v => Number(v[0]))

/**
 * PART ONE
 */

let winningStrategiesMultiplied = 1;
for (const round in times) {
    let winningStrategies = 0;
    for (let i = 0; i < times[round]; i++) {
        const restTime = times[round] - i;
        if ((restTime * i) > distances[round]) {
            winningStrategies += 1;
        }
    }
    winningStrategiesMultiplied *= winningStrategies;
}
console.log('PART ONE | Winning strategies multiplied', winningStrategiesMultiplied);

/**
 * PART TWO
 */

const timeTwo = times.reduce((sum: string, next: number) => {
    return sum + String(next);
}, '');
const distanceTwo = distances.reduce((sum: string, next: number) => {
    return sum + String(next);
}, '');
console.log(timeTwo, distanceTwo);

let winningStrategies = 0;
for (let i = 0; i < Number(timeTwo); i++) {
    const restTime = Number(timeTwo) - i;
    if ((restTime * i) > Number(distanceTwo)) {
        winningStrategies += 1;
    }
}
console.log('PART Two | Winning strategies', winningStrategies);