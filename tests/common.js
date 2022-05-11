// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const numbers ='0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generateNumber(length) {
    let result = '';
    const numbersLength = numbers.length;
    for ( let i = 0; i < length; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    return result;
}

module.exports = {
    generateString,
    generateNumber
}
