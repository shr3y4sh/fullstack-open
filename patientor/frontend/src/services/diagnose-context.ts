import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { createContext } from 'react';

export const getDiagnoseData = async (): Promise<Diagnosis[]> => {
	const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
	return data;
};

export const diagnoseData = await getDiagnoseData();

export const DiagnoseContext = createContext<Diagnosis[]>([]);
