export function MailPreview({ mail }) {

	function getSentTime(timeStamp) {
		var h = new Date(timeStamp).getHours()
		var m = new Date(timeStamp).getMinutes()

		h = h < 10 ? '0' + h : h
		m = m < 10 ? '0' + m : m

		return h + ':' + m
	}

	return (
		<tr className={`mail-preview ${mail.isRead ? 'read' : ''}`}>
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
			<td className="from">{mail.from}</td>
			<td className="subject">{mail.subject}</td>
			<td className="mail-body">{mail.body}</td>
			<td className="sent-at">{getSentTime(mail.sentAt)}</td>
		</tr>
	)
}
