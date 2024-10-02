export function MailPreview({ mail }) {

	function getSentTime(timeStamp) {
		var h = new Date(timeStamp).getHours()
		var m = new Date(timeStamp).getMinutes()

		h = h < 10 ? '0' + h : h
		m = m < 10 ? '0' + m : m

		return h + ':' + m
	}

	return (
		<tr className="mail-preview">
			<td>
				<img
					className="icon"
					src="../../assets/img/icons/check-box.png"
					alt="check-box-icon"
				/>
			</td>
			<td>
				<img
					className="icon"
					src="../../assets/img/icons/star.png"
					alt="star-icon"
				/>
			</td>
			<td>
				<img
					className="icon"
					src="../../assets/img/icons/label-marked.png"
					alt="label-icon"
				/>
			</td>
			<td>{mail.from}</td>
			<td>{mail.subject}</td>
			<td>{mail.body}</td>
			<td>{getSentTime(mail.sentAt)}</td>
		</tr>
	)
}
