import { Alert } from '@mui/material';

const Notification = ({ message }) => {
	return <Alert severity='success'>{`${message}`}</Alert>;
};

export default Notification;
