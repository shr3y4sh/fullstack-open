import { CoursePart } from '../types';

interface ContentProps {
	courseParts: CoursePart[];
}

const Part = ({ courseParts }: ContentProps): React.ReactElement[] => {
	const assertNever = (value: never): never => {
		throw new Error(`Unhandled union member ${JSON.stringify(value)}`);
	};
	const heading = (name: string, count: number) => {
		return (
			<div>
				<strong>
					{name} {count}
				</strong>
			</div>
		);
	};

	const description = (description: string) => {
		return (
			<div>
				<em>{description}</em>
			</div>
		);
	};
	return courseParts.map((part) => {
		const head = heading(part.name, part.exerciseCount);
		switch (part.kind) {
			case 'basic':
				return (
					<div key={part.name}>
						{head}
						{description(part.description)}
						<br />
					</div>
				);
			case 'group':
				return (
					<div key={part.name}>
						{head}
						<div>project exercises {part.groupProjectCount}</div>
						<br />
					</div>
				);
			case 'background':
				return (
					<div key={part.name}>
						{head}
						{description(part.description)}
						<div>
							refer{' '}
							<a href={part.backgroundMaterial} target='blank'>
								{part.backgroundMaterial}
							</a>
						</div>
						<br />
					</div>
				);
			case 'special':
				return (
					<div key={part.name}>
						{head}
						{description(part.description)}
						<div>
							required skills:
							{part.requirements.map((p, i) => (
								<span key={i}> {p}</span>
							))}
						</div>
					</div>
				);
			default:
				return assertNever(part);
		}
	});
};
function Contents({ courseParts }: ContentProps) {
	return <Part courseParts={courseParts} />;
}

export default Contents;
