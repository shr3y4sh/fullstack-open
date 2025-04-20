import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import { DiagnoseContext } from './services/diagnose-context.ts';
import { diagnoseData } from './services/diagnose-context.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<DiagnoseContext.Provider value={diagnoseData}>
			<App />
		</DiagnoseContext.Provider>
	</StrictMode>
);
