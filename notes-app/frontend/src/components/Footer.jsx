export default function Footer() {
	const footerStyle = {
		color: 'lightgreen',
		fontStyle: 'italic',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 30
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, Department of Computer Science, University of Helsinki
				2025
			</em>
		</div>
	);
}
