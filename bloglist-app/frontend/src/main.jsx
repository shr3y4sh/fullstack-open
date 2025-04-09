import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import './styles/index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
