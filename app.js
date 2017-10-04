const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const title = {
    describe: 'Title of your note',
    alias: 't',
    demand: true
};

const argv = yargs
    .command('add', 'add a new note', {
        title,
        body: {
            describe: 'What you want to say',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'list all notes')
    .command('read', 'read an individual note',{
        title
    })
    .command('remove', 'remove a note', {
        title
    })
    .help()
    .argv;


var command = process.argv[2];

console.log("Command: ", command);

switch(command){
    case 'add':
    var note = notes.addNote(argv.title, argv.body);
    console.log(note);
    break;

    case 'remove':
    var note = notes.removeNote(argv.title);
    console.log(note);
    break;

    case 'list':
    notes.getAll();
    break;

    case 'read':
    var note = notes.readNote(argv.title);
    console.log(note);
    break;

    default:
    console.log('not a recognized command')
}
