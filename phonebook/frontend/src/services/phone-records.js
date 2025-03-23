import axios from 'axios';

const BASE_URL = '/api/persons';

const getAllListings = async () => {
	const response = await axios.get(BASE_URL);
	return await response.data;
};

const postListing = async (person) => {
	const response = await axios.post(BASE_URL, person);
	return await response.data;
};

const deleteListing = async (id) => {
	const response = await axios.delete(`${BASE_URL}/${id}`);
	return await response.data;
};

const updateListing = async (person) => {
	const response = await axios.put(`${BASE_URL}/${person.id}`, person);
	console.log(response.data.number);

	return await response.data;
};

export default {
	getAllListings,
	postListing,
	deleteListing,
	updateListing
};
