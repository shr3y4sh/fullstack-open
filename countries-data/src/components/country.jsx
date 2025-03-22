import { useState, useEffect } from 'react';
import axios from 'axios';

const weatherQuery_uri =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

let weatherData = null;

export default function CountryDescription({ country, isList }) {
	const [showView, setShowView] = useState(false);

	function handleShowButton() {
		setShowView((s) => !s);
	}

	if (!isList && !showView) {
		setShowView(true);
	}

	useEffect(() => {
		axios
			.get(
				`${weatherQuery_uri}/${country.capital[0]}?key=${
					import.meta.env.VITE_WEATHER_APIKEY
				}`
			)
			.then((response) => {
				return response.data.currentConditions;
			})
			.then((data) => {
				weatherData = data;
				console.log(weatherData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [country.capital]);

	return !showView ? (
		<>
			{country.name.common}{' '}
			<button onClick={handleShowButton}>show</button>
		</>
	) : (
		<>
			{isList && <button onClick={handleShowButton}>hide</button>}
			<h1>{country.name.common}</h1>
			<p>Capital {country.capital[0]}</p>
			<p>
				Area {country.area} km<sup>2</sup>
			</p>
			<h2>Languages</h2>
			<ul>
				{Object.entries({ ...country.languages }).map(
					([key, value]) => (
						<li key={key}>{value}</li>
					)
				)}
			</ul>
			<div>
				<img
					src={country.flags.png}
					alt={`Flag of ${country.name.common}`}
				/>
			</div>
			{weatherData !== null && (
				<>
					<h1>Weather conditions</h1>

					<p>dateTime: {weatherData.datetime}</p>
					<p>temperature: {weatherData.temp} Celsius</p>
					<p>conditions: {weatherData.conditions}</p>
					<p>{weatherData.icon}</p>
				</>
			)}
		</>
	);
}
