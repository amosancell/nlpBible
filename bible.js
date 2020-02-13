var biblePdf = './Bible_King_James_Version.pdf';
var bibleTxt = './KJV.txt';

//var pdfreader = require('pdfreader');
const fs = require('fs');
const nlp = require('compromise');


try {
    console.log("start reading");
    var bible = fs.readFileSync(bibleTxt,'utf8');
    console.log("end reading");
} catch(err) {
    console.log("error: " + err);
}

//console.log(typeof bible);
//console.log(JSON.stringify(bible.substring(0,500000)));
//console.log(bible.length);

// a function that returns an object with al 

// a function to split the bible by book
function splitByBook() {
    var books = {};
    var bookTitles = ['Genesis'];
    for(title of bible.matchAll(/\n\n(.*)\n\n/g)) {
        bookTitles.push(title[1]);
    }
    bookData = bible.split(/\n\n.*\n\n/g);
    for(let i=0; i < bookTitles.length; i++) {
        books[bookTitles[i]] = bookData[i];
    }
    return books;
}

// a method that splits a book into chapters
function splitByChapter(bookName) {
    var book = splitByBook()[bookName];
    var byVerse = {};
    var chaps = {};
    var search = /\n[A-z][a-z]*\.(?<chapter>[0-9]*):(?<verse>[0-9]*)\s/g;
    var splitSearch = /\n[A-z][a-z]*\.[0-9]*:[0-9]*\s/g;
    let match;
    let i=0;
    while((match = search.exec(book)) !== null) {
        //console.log(i,Object.keys(match),match['groups']['chapter'],match['groups']['verse'],match['1'],match['2']);
        byVerse[match['0']] = "";
        i++;
    }
    let vals = book.split(splitSearch);
    Object.keys(byVerse).forEach((key,index) => byVerse[key] = vals[index]);
    
    // TODO:finish line 54 to trim the verse keys to look nice
    // * then figure out how to recombine verses by chapter
    // * then actually do some nlp
    Object.keys(byVerse).forEach(key => )
    return {'v':byVerse,'vals':book.split(splitSearch)};
}

// an object with the books of the bible as keys and the actual book as values
let books = splitByBook();
var gen = books['Genesis'];

let v = splitByChapter('Genesis')['v'];
let vals = splitByChapter('Genesis')['vals'];
let byv = splitByChapter('Genesis')['byv'];
console.log(v);



//console.log(JSON.stringify(gen));
//var people = nlp(gen).people().text();
//console.log(people);






/* get the abbreviation for a book
    * return a string of the abbreviation
*/
function getAbbreviation(bookName) {
    book = splitByBook()[bookName];
    return book.match(/\n([A-Z][a-z]*)\.[0-9]*:[0-9]*\s/i)[1];
}

/* UNFINISHED, IM NOT SURE IF THIS WILL EVERY BE NEEDED*/

/* split a book into verses and return an object
    * return an object with verses as keys and the text as values
*/
/*
function splitByChapterVerse(bookName) {
    var b = {};
    var book = splitByBook()[bookName];
    var abv = getAbbreviation(bookName);
    var verseSearch = /\n[A-Z][a-z]*\.([0-9]*:[0-9])*\s/g

    while((match = verseSearch.exec(book)) !== null)  {
        console.log('match',Object.keys(match)[1],JSON.stringify(match[Object.keys(match)[1]]));
        b[match["0"]] = "hi"
        //console.log("hi");
    }
    return b;
    //var verses = book.match(/\n[A-Z][a-z]*\.([0-9]*):[0-9]*\s/g);
}

var bcv = splitByChapterVerse('Genesis');
console.log("bcv ");
console.log(bcv);
*/