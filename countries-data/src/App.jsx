import { useState, useEffect } from 'react';
import axios from 'axios';

import Display from './components/output.jsx';
const base_url = 'https://studies.cs.helsinki.fi/restcountries/api/';

let fullCountriesList;

function App() {
	const [countries, setCountries] = useState([]);
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		axios
			.get(`${base_url}all`)
			.then((response) => {
				return response.data;
			})
			.then((data) => {
				fullCountriesList = data;
				setCountries(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function handleCountryInput(e) {
		e.preventDefault();
		const countryName = e.target.value;

		if (countryName === '') {
			return setDisplay(false);
		}

		setDisplay(true);
		const filterCountries = fullCountriesList.filter((c) =>
			c.name.common.toLowerCase().includes(countryName.toLowerCase())
		);

		setCountries(filterCountries);
	}

	return (
		<>
			<div>
				<label htmlFor='countries'>Find Countries: </label>
				<input
					type='text'
					id='countries'
					name='countries'
					onChange={handleCountryInput}
				/>
			</div>
			<div>{display && <Display countries={countries} />}</div>
		</>
	);
}

export default App;
