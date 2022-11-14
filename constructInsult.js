<<<<<<< HEAD
import fs from 'fs';
import xml2js from 'xml2js';

// Read ./assets/DirtyWords.xml and return an array of objects
function readDirtyWords() {
    const xml = fs.readFileSync('./assets/DirtyWords.xml', 'utf8');
    const words = [];
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            const wordList = result.DirtyWords.Word;
            for (let word of wordList) {
                words.push({
                    word: word._,
                    type: word.$.type,
                });
            }
        }
    });
    return words;
}

let noun = [];
let adjective = [];

// Read the dirty words, make them lowercase and split them into nouns and adjectives
const dirtyWords = readDirtyWords();
for (let word of dirtyWords) {
    word.word = word.word.toLowerCase();
    if (word.type === 'f') {
        noun.push(word.word);
    } else if (word.type === 'm') {
        adjective.push(word.word);
    }
}



// Pick the given number of adjectives and a noun at random and return the insult
export function constructInsult(a, userId) {
    let insult;

    if (userId == undefined) {
        insult = 'Te ';
    }
    else {
        insult = `<@${userId}> egy `;
    }
    
    if (a > 0) {
        for (let i = 0; i < a; i++) {
            insult += adjective[Math.floor(Math.random() * adjective.length)];
            
            // Do we need a comma?
            if (i < a - 1) {
                insult += ', ';
            }
            else {
                insult += ' ';
            }
        }
    }
    insult += noun[Math.floor(Math.random() * noun.length)];
    insult += '!';
    return insult;
=======
import fs from 'fs';
import xml2js from 'xml2js';

// Read ./assets/DirtyWords.xml and return an array of objects
function readDirtyWords() {
    const xml = fs.readFileSync('./assets/DirtyWords.xml', 'utf8');
    const words = [];
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            const wordList = result.DirtyWords.Word;
            for (let word of wordList) {
                words.push({
                    word: word._,
                    type: word.$.type,
                });
            }
        }
    });
    return words;
}

let noun = [];
let adjective = [];

// Read the dirty words, make them lowercase and split them into nouns and adjectives
const dirtyWords = readDirtyWords();
for (let word of dirtyWords) {
    word.word = word.word.toLowerCase();
    if (word.type === 'f') {
        noun.push(word.word);
    } else if (word.type === 'm') {
        adjective.push(word.word);
    }
}



// Pick the given number of adjectives and a noun at random and return the insult
export function constructInsult(a, userId) {
    let insult;

    if (userId == undefined) {
        insult = 'Te ';
    }
    else {
        insult = `<@${userId}> egy `;
    }
    
    if (a > 0) {
        for (let i = 0; i < a; i++) {
            insult += adjective[Math.floor(Math.random() * adjective.length)];
            
            // Do we need a comma?
            if (i < a - 1) {
                insult += ', ';
            }
            else {
                insult += ' ';
            }
        }
    }
    insult += noun[Math.floor(Math.random() * noun.length)];
    insult += '!';
    return insult;
>>>>>>> 47d2c335fd0429d45bb15a2e580d51644c92f0b5
}