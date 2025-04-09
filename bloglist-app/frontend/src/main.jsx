import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './redux/UserProvider';
import NotificationProvider from './redux/NotificationProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<NotificationProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</NotificationProvider>
		</QueryClientProvider>
	</StrictMode>
);
