const file = Bun.file('input.txt');
const input = await file.text();
const lines = input.split('\r\n');

/**
 * Prep input data
 */
const seeds = Array.from([...lines[0].matchAll(/\d+/g)], v => Number(v[0]));

const mapIds = [
    'seed-to-soil', 
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location'
]
const mapData = getMapData(input, mapIds);

/**
 * PART ONE
 */
const seedToLocation = seedsToLocation(mapData, seeds, mapIds);

console.log('PART ONE | Lowest location data', getLowestLocation(seedToLocation));

/**
 * PART TWO
 */
let seedsTwo: {[key:number]: { range: number }} = {};
for (let i = 0; i <= (seeds.length / 2); i += 2) {
    seedsTwo[seeds[i]] = { range: seeds[i+1] };
}

const lowestLocation = seedsToLowestLocation(mapData, seedsTwo, mapIds);

console.log('PART TWO | Lowest location data', lowestLocation);

/**
 * HELPERS
 */
function getLowestLocation(seedToLocation: { [key: number]: number; }) {
    let lowest = Number.MAX_VALUE;
    for (const seed in seedToLocation) {
        if (seedToLocation[seed] < lowest) {
            lowest = seedToLocation[seed];
        }
    }
    return lowest;
}
function seedsToLocation(mapData: { [key:string]: { destRangeStart: number, sourceRangeStart: number, rangeLength: number }[] }, seeds: number[], mapIds: string[]) {
    const seedToLocation: {[key:number]: number} = {};
    for (const seed of seeds) {
        let convertedValue = seed;
        for (const mapId of mapIds) {
            convertedValue = convertByMap(mapData[mapId], convertedValue);
        }
        seedToLocation[seed] = convertedValue;
    }
    return seedToLocation;
}
function seedsToLowestLocation(mapData: { [key:string]: { destRangeStart: number, sourceRangeStart: number, rangeLength: number }[] }, seedsTwo: {[key:number]: { range: number }}, mapIds: string[]) {
    // const seedToLocation: {[key:number]: number} = {};

    let lowestLocation = Number.MAX_VALUE;
    for (const startSeed in seedsTwo) {
        const range = seedsTwo[Number(startSeed)].range;
        
        for (let i = 0; i < range; i++) {
            const seed = Number(startSeed) + i;

            let convertedValue = seed;
            for (const mapId of mapIds) {
                convertedValue = convertByMap(mapData[mapId], convertedValue);
            }
            lowestLocation = convertedValue < lowestLocation ? convertedValue : lowestLocation;
        }
        console.log('done with seed', startSeed);
    }
    // return seedToLocation;
    
    return lowestLocation;
}
function convertByMap(mapData: { destRangeStart: number, sourceRangeStart: number, rangeLength: number }[], input: number) {
    let convertedNumber = -1;
    for (const mapEntry of mapData) {
        if ((mapEntry.sourceRangeStart <= input) && (input <= (mapEntry.sourceRangeStart + mapEntry.rangeLength - 1))) {
            const diff = Math.abs(mapEntry.sourceRangeStart - input);
            convertedNumber = mapEntry.destRangeStart + diff;
        }
    }

    return convertedNumber === -1 ? input : convertedNumber;
}
function getMapData(input: string, mapIds: string[]) {
    const maps = input.split('\r\n\r\n');
    const mapData: { [key:string]: { destRangeStart: number, sourceRangeStart: number, rangeLength: number }[] } = {};
    for (let i = 0; i < mapIds.length; i++) {
        const map = maps[i+1];
        const mapValues = [...map.matchAll(/\d+/g)];
    
        mapData[mapIds[i]] = [];
        for (let j = 0; j < mapValues.length; j+=3) {
            mapData[mapIds[i]].push({
                destRangeStart: Number(mapValues[j][0]),
                sourceRangeStart: Number(mapValues[j+1][0]),
                rangeLength: Number(mapValues[j+2][0])
            })
        }
    }
    return mapData;
}


/**
 * Regex not wanting to work
 */
// for (const mapId of mapIds) {
//     const mapIdEndsWith = mapId.split('-')[2];
//     const mapNumbersRegex = new RegExp(`(?<=${mapId} map:(.|\n)*)\\d+(?=(.|\n)*${mapIdEndsWith})`, 'g');

//     // console.log(input)
//     const mapValues = [...input.matchAll(/(?<=seed-to-soil map:(.|\n)*)\d+(?=(.|\n)*soil)/g)];

//     // 0 (?<=seed-to-soil map:(.|\n)*)\d+(?=(.|\n)*soil) g
//     console.log(mapValues.length, mapNumbersRegex.source, mapNumbersRegex.flags)

//     for (let i = 0; i < mapValues.length; i+=3) {
//         const destRangeStart = mapValues[i];
//         const sourceRangeStart = mapValues[i+1];
//         const rangeLength = mapValues[i+2];

//         console.log(mapId, destRangeStart, sourceRangeStart, rangeLength)
//     }

// }