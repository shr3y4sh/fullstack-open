const { createServer } = require('http');

const port = 3001;

let notes = {
	notes: [
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
			content:
				'GET and POST are the most important methods of HTTP protocol',
			important: true
		}
	]
};

const app = createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'application/json' });
	res.end(JSON.stringify(notes));
});

app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});
