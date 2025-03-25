import axios from 'axios';

const BASE_URL = '/api/persons';

const getAllListings = async () => {
	try {
		const response = await axios.get(BASE_URL);
		return await response.data;
	} catch (err) {
		throw err;
	}
};

const postListing = async (person) => {
	// try {
	const response = await axios.post(BASE_URL, person);
	return response.data;
	// } catch (err) {
	// 	throw err;
	// }
};

const deleteListing = async (id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/${id}`);
		return await response.data;
	} catch (err) {
		throw err;
	}
};

const updateListing = async (person) => {
	try {
		const response = await axios.put(`${BASE_URL}/${person.id}`, person);

		return await response.data;
	} catch (err) {
		throw err;
	}
};

export default {
	getAllListings,
	postListing,
	deleteListing,
	updateListing
};
