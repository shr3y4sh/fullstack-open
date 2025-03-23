const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/noteApp';

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
});

const Note = mongoose.model('note', noteSchema);

mongoose.set('strictQuery', false);

mongoose.connect(DB_URL);

Note.find().then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// const note = new Note({
// 	content: 'GET and POST are the most important methods of HTTP protocol',
// 	important: true
// });

// note.save()
// 	.then((note) => {
// 		console.log(note);

// 		mongoose.disconnect();
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

/* let notes = [
    {
        id: '1',
        content: 'HTML is easy',
        important: false
    },
    {
        id: '2',
        content: 'Browser can execute only JavaScript',
        important: true
    },
    {
        id: '3',
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];

*/
