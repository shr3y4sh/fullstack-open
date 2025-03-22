import axios from 'axios';

const BASE_URL = 'http://localhost:3001/persons';

const getAllListings = () => {
	const request = axios.get(BASE_URL);
	return request.then((response) => response.data);
};

const postListing = (person) => {
	const request = axios.post(BASE_URL, person);
	return request.then((response) => response.data);
};

const deleteListing = (id) => {
	const request = axios.delete(`${BASE_URL}/${id}`);
	return request.then((response) => response.data);
};

const updateListing = (person) => {
	const request = axios.put(`${BASE_URL}/${person.id}`, person);
	return request.then((response) => response.data);
};

export default {
	getAllListings,
	postListing,
	deleteListing,
	updateListing
};
