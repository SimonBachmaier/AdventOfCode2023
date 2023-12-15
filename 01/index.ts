const file = Bun.file('input.txt');
const input = await file.text();
const lines = await input.split('\r\n');

function partOne(lines: string[]) {
    let sum = 0;
    for (const line of lines) {
        const digits = line.match(/\d/g);
    
        let doubleDigitValue = '';
        if (digits?.length && digits.length > 0) {
            doubleDigitValue += digits.shift();
        }
        if (digits?.length && digits.length > 0) {
            doubleDigitValue += digits.pop();
        }
        if(doubleDigitValue.length === 1) {
            doubleDigitValue += doubleDigitValue;
        }
        
        sum += Number(doubleDigitValue);
    }
    
    console.log('PART 1 | Callibrated coordinates:', sum);
}

function partTwo(lines: string[]) {
    const STR_TO_NUM: { [key:string]: number } = {
        'one': 1,  'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    };

    let sum = 0;
    for (const line of lines) {
        const reg = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
        const digits = Array.from(line.matchAll(reg), x => x[1])
        const digitsCopy = JSON.parse(JSON.stringify(digits));
    
        let doubleDigitValue = '';
        if (digits?.length && digits.length > 0) {
            const digit = digits.shift() as string;
            doubleDigitValue += STR_TO_NUM[digit];
        }
        if (digits?.length && digits.length > 0) {
            const digit = digits.pop() as string;
            doubleDigitValue += STR_TO_NUM[digit];
        }
        if(doubleDigitValue.length === 1) {
            doubleDigitValue += doubleDigitValue;
        }
        
        sum += Number(doubleDigitValue);
    }
    
    console.log('PART 2 | Callibrated coordinates:', sum);
}

partOne(lines);
partTwo(lines);