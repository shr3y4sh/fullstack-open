import addBook from './mutations/add-book.js';
import editAuthor from './mutations/edit-author.js';
import createUser from './mutations/create-user.js';
import login from './mutations/login.js';

const Mutation = {
	addBook: addBook,

	editAuthor: editAuthor,

	createUser: createUser,

	login: login
};

export default Mutation;
