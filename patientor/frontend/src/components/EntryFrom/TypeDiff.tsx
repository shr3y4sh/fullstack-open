import { MutableRefObject } from 'react';
import {
	EntryFormType,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthcareEntry
} from '../../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import Occupational from './Occupational';

type Props = {
	type: EntryFormType;
	healthCheck: MutableRefObject<HealthCheckRating | undefined>;
	occupation: MutableRefObject<
		| Pick<OccupationalHealthcareEntry, 'sickLeave' | 'employerName'>
		| undefined
	>;
	discharge: MutableRefObject<Pick<HospitalEntry, 'discharge'> | undefined>;
};

const TypeDifferentiator = ({
	type,
	healthCheck,
	occupation,
	discharge
}: Props) => {
	let display;
	switch (type) {
		case EntryFormType.healthCheckRating:
			display = () => <HealthCheck rating={healthCheck} />;

			break;

		case EntryFormType.occupationalHealthcare:
			display = () => <Occupational occupation={occupation} />;
			break;

		case EntryFormType.hospital:
			display = () => <Hospital discharge={discharge} />;
			break;
		default:
			display = () => null;
			break;
	}
	return display();
};

export default TypeDifferentiator;
