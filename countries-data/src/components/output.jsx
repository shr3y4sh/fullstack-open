import CountryDescription from './country';

export default function Display({ countries }) {
	if (countries.length === 0) {
		return <p>No such country name!</p>;
	}

	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	if (countries.length > 1 && countries.length <= 10) {
		return (
			<ul>
				{countries.map((country) => (
					<li key={country.flag}>
						<CountryDescription country={country} isList={true} />
					</li>
				))}
			</ul>
		);
	}
	if (countries.length === 1) {
		const nextCountry = countries[0];
		return <CountryDescription country={nextCountry} isList={false} />;
	}
}
