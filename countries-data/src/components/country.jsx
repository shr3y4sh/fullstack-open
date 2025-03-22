import { useState } from 'react';

export default function CountryDescription({ country, isList }) {
	const [showView, setShowView] = useState(false);

	function handleShowButton() {
		setShowView((s) => !s);
	}

	if (!isList && !showView) {
		setShowView(true);
	}

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
		</>
	);
}
