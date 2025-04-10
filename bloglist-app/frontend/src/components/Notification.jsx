import { Alert } from '@mui/material';

const Notification = ({ message, error }) => {
	const variant = error ? 'error' : 'success';

	return <Alert severity={variant}>{`${message}`}</Alert>;
};

export default Notification;
