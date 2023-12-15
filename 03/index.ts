const file = Bun.file('input.txt');
const input = await file.text();
const lines = await input.split('\r\n');

const partNumbersByCoords: { [key:string]: number } = {};
for(let y = 0; y < lines.length; y++) {
    const specialCharacters = [...lines[y].matchAll(/[^A-Za-z0-9\.]/g)]

    for (const character of specialCharacters) {
        let x = character.index as number;

        // upper left
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x-1, y-1);
        // upper
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x, y-1);
        // upper right
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x+1, y-1);
        // left
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x-1, y);
        // lower left
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x-1, y+1);
        // lower
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x, y+1);
        // lower right
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x+1, y+1);
        // right
        addPartsNumberWithCoordsToObject(partNumbersByCoords, lines, x+1, y);
    }
}

let partNumberSum = 0;
for (const coords in partNumbersByCoords) {
    partNumberSum += partNumbersByCoords[coords];
}

console.log('PART ONE | Part number sum:', partNumberSum);

/**
 * PART TWO
 */

let gearSum = 0;
for(let y = 0; y < lines.length; y++) {
    const stars = [...lines[y].matchAll(/\*/g)]

    for (const star of stars) {
        let x = star.index as number;

        const foundNumbersWithCoords: { [key:string]: number } = {};
        // upper left
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x-1, y-1);
        // upper
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x, y-1);
        // upper right
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x+1, y-1);
        // left
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x-1, y);
        // lower left
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x-1, y+1);
        // lower
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x, y+1);
        // lower right
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x+1, y+1);
        // right
        addPartsNumberWithCoordsToObject(foundNumbersWithCoords, lines, x+1, y);

        // star is GEAR
        if (Object.keys(foundNumbersWithCoords).length === 2) {
            let gearPower = 1;
            for (const key in foundNumbersWithCoords) {
                gearPower *= foundNumbersWithCoords[key];
            }
            gearSum += gearPower;
        }
    }
}

console.log('PART TWO | Gear power sum:', gearSum);

/**
 * HELPER
 */

function checkForNumber(lines: string[], x: number, y: number) {
    if (y < 0 || x < 0 || y >= lines.length || x >= lines[0].length) {
        return false;
    }
    return /\d/g.test(lines[y][x]);
}
function getPartNumberWithCoords(lines: string[], x: number, y: number) {
    let cx = x;
    while (checkForNumber(lines, cx-1, y)) {
        cx -= 1;
    }

    const coords = `${cx}|${y}`;
    
    let partNumber = lines[y][cx];
    while (checkForNumber(lines, cx+1, y)) {
        cx += 1;
        partNumber += lines[y][cx];
    }
    
    return { partNumber: Number(partNumber), coords: coords};
}
function addPartsNumberWithCoordsToObject(objectToAddTo: any, lines: string[], x: number, y: number) {
    if (checkForNumber(lines, x, y)) {
        const numberWithCords = getPartNumberWithCoords(lines, x, y);
        objectToAddTo[numberWithCords.coords] = numberWithCords.partNumber;
    }
}