import '../styles/notification.css';
const Notification = (props) => {
	return <div className='notification'>{`${props.message}`}</div>;
};

export default Notification;
