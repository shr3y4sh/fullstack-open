require('dotenv').config();

const PORT = process.env.NODE_ENV === 'test' ? 3002 : process.env.PORT;
const DB_URI =
	process.env.NODE_ENV === 'test'
		? process.env.MONGODB_TEST_URI
		: process.env.MONGODB_URI;

module.exports = { PORT, DB_URI };
