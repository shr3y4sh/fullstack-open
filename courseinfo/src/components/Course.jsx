export default function Course({ course }) {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
}

function Header({ name }) {
	return <h2>{name}</h2>;
}

function Content({ parts }) {
	return (
		<>
			{parts.map((part) => (
				<Part
					key={part.id}
					name={part.name}
					exercise={part.exercises}
				/>
			))}
		</>
	);
}

function Total({ parts }) {
	const total = parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<p>
			<em>
				Total of <strong>{total}</strong> exercises
			</em>
		</p>
	);
}

function Part({ name, exercise }) {
	return (
		<p>
			{name} {exercise}
		</p>
	);
}
