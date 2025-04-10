import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import Providers from './Providers';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
);
