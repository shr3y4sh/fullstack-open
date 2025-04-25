import { MutableRefObject, useState } from 'react';
import { HealthCheckRating } from '../../types';

type Props = {
	rating: MutableRefObject<HealthCheckRating | undefined>;
};

const HealthCheck = ({ rating }: Props) => {
	const [switches, setSwitches] = useState<boolean>(false);

	return (
		<div>
			<label htmlFor='healthCheckRating'>Health Check Rating</label>
			<div>
				{Object.entries(HealthCheckRating)
					.slice(4)
					.map(([h, v]) => (
						<span key={h}>
							<input
								type='radio'
								name={h}
								value={v}
								checked={v == Number(rating.current)}
								onChange={({ target }) => {
									const newRating = target.value as unknown;
									rating.current =
										newRating as HealthCheckRating;
									console.log(switches);
									setSwitches((s) => !s);
								}}
							/>
							{h}
						</span>
					))}
			</div>
		</div>
	);
};

export default HealthCheck;
