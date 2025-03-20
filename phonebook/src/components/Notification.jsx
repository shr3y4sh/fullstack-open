export default function Notification({ notification }) {
	return notification.message !== null ? (
		<div className={notification.className}>{notification.message}</div>
	) : null;
}
