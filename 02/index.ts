const file = Bun.file('input.txt');
const input = await file.text();
const lines = await input.trim().split('\r\n');

const cubesPartOne = { 
    red: 12,
    green: 13,
    blue: 14
};

function parseLines(lines: string[]) {

    const scores: {[key:string]: {[key:string]: number}[] }  = {};
    for (const line of lines) {
        const gameId = line.match(/\d+(?=:)/g)?.[0] as string;
        const games = line.split(':')[1].trim().split(';');

        const score = Array.from(games, game => {
            const cubes = game.split(',');
            let score: {[key:string]: number} = {};
    
            for (const cube of cubes) {
                const cubeSplit = cube.trim().split(' ');
                score[cubeSplit[1]] = Number(cubeSplit[0]);
            }
    
            return { 
                red: score['red'] ?? 0,
                green: score['green'] ?? 0,
                blue: score['blue'] ?? 0
            };
        })
        scores[gameId] = score;
    }

    return scores;
}

const games = parseLines(lines);

const gamesPossiblePartOne: number[] = []
let gamesPossiblePartOneSum = 0;

for (const gameId in games) {
    let gamePossible = true;
    for (const round of games[gameId]) {
        if (round.red > cubesPartOne.red || round.green > cubesPartOne.green || round.blue > cubesPartOne.blue) {
            gamePossible = false;
        }
    }
    if (gamePossible === true) {
        gamesPossiblePartOne.push(Number(gameId));
        gamesPossiblePartOneSum += Number(gameId);
    }
}

console.log('PART ONE | Possible Games:', gamesPossiblePartOneSum);

const powers: number[] = [];
let powersSum = 0;

for (const gameId in games) {
    let minimumCubes = {
        red: 0,
        green: 0,
        blue: 0
    };

    for (const round of games[gameId]) {
        minimumCubes = {
            red: round.red > minimumCubes.red ? round.red : minimumCubes.red,
            green: round.green > minimumCubes.green ? round.green : minimumCubes.green,
            blue: round.blue > minimumCubes.blue ? round.blue : minimumCubes.blue
        }
    }

    const power = minimumCubes.red * minimumCubes.green * minimumCubes.blue;

    powers.push(power);
    powersSum += power;
}

console.log('PART TWO | Power sum:', powersSum);