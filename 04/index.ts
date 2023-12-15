const file = Bun.file('input.txt');
const input = await file.text();
const lines = input.split('\r\n');

const cards = getCardValues(lines);

/**
 * PART ONE
 */
let pointsSum = 0;
for (const cardId in cards) {
    const card = cards[cardId];

    let points = 0.5;
    for (const ownNumber of card.ownNumbers) {
        if (card.winningNumbers.includes(ownNumber)) {
            points *= 2;
        }
    }

    if (points >= 1) {
        pointsSum += points;
    }
}
console.log('PART ONE | Card points sum:', pointsSum);

/**
 * PART TWO
 */

let cardsSum = 0;
for (const cardId in cards) {
    const card = cards[cardId];
    cardsSum += card.amount;

    let numberMatches = 0;
    for (const ownNumber of card.ownNumbers) {
        if (card.winningNumbers.includes(ownNumber)) {
            numberMatches += 1;
        }
    }

    for (numberMatches; numberMatches > 0; numberMatches--) {
        const nextCardId = Number(cardId) + numberMatches;
        if (Object.keys(cards).includes(String(nextCardId))) {
            cards[String(nextCardId)].amount += card.amount;
        }
    }
}
console.log('PART TWO | Cards sum:', cardsSum);

/**
 * HELPERS
 */

function getCardValues(lines: string[]) {
    const cards: { [key:string]: { winningNumbers: number[], ownNumbers: number[], amount: number }} = {};
    for (const line of lines) {
        const cardId = line.match(/\d+(?=:)/g)?.[0] as string;
        const winningNumbers = [...line.matchAll(/(?<=(\d+):.+)\d+(?=.+\|)/g)];
        const ownNumbers = [...line.matchAll(/(?<=(\|).+)\d+/g)];
        cards[cardId] = { 
            winningNumbers: Array.from(winningNumbers, v => Number(v[0])),
            ownNumbers: Array.from(ownNumbers, v => Number(v[0])),
            amount: 1
        }
    }
    return cards;
}