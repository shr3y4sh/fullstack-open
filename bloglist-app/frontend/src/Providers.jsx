import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import NotificationProvider from './contexts/NotificationProvider';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<NotificationProvider>
					<UserProvider>{children}</UserProvider>
				</NotificationProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

export default Providers;
