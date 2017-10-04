const fs = require('fs');
const lineBreak = '\n----\n';

var fetchNotes = () => {
    try {
        // notesString = ;
        return JSON.parse(fs.readFileSync('notes.json'));
    } catch (e) {
        return []
    }
};


var saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicates = notes.filter((note) => note.title === title);

    if(duplicates.length === 0){
        notes.push(note);
        saveNotes(notes);
        return `'${note.title}' has been added to your notes!`;
    } else {
        return `'${note.title}' is already in your notes!`;
    }
};


var getAll = () => {
    var notes = fetchNotes();

    notes.forEach(function(note){
        console.log(lineBreak);
        console.log(`Title: ${note.title}`);
        console.log(`${note.body}`);
        console.log(lineBreak);
    });
};


var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title != title);
    saveNotes(filteredNotes);

    if(notes.length==filteredNotes.length){
        return `'${title}' isn't currently a note, you can add it though.`;
    } else {
        return `'${title}' has been removed!`;
    }
};


var readNote = (title) => {
    var notes = fetchNotes();

    var noteToRead = notes.filter(note => note.title == title);

    if(noteToRead.length > 0){
        return `Title: '${noteToRead[0].title}'\n${noteToRead[0].body}`;
    } else {
        return `'${title}' doesn't exist..... yet`;    }
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote
}
