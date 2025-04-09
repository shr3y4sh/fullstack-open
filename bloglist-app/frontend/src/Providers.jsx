import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './contexts/UserProvider';
import NotificationProvider from './contexts/NotificationProvider';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<NotificationProvider>
				<UserProvider>{children}</UserProvider>
			</NotificationProvider>
		</QueryClientProvider>
	);
};

export default Providers;
