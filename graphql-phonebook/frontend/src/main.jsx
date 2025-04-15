import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('users-token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null
		}
	};
});

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</StrictMode>
);
