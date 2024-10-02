export function MailPreview({ mail }) {
	return (
		<tr className="mail-preview">
			<td>
				<img className="icon" src="../../assets/img/icons/check-box.png" alt="check-box-icon" />
			</td>
			<td>
				<img className="icon" src="../../assets/img/icons/star.png" alt="star-icon" />
			</td>
			<td>
				<img className="icon" src="../../assets/img/icons/label-marked.png" alt="label-icon" />
			</td>
			<td>{mail.sender}</td>
			<td>{mail.subject}</td>
			<td>{mail.content}</td>
			<td>Time sent/recieved</td>
		</tr>
	)
}
