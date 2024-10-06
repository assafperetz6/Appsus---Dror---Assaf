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
				<span className="material-symbols-outlined">check_box_outline_blank</span>
			</td>
			<td>
				<span className="material-symbols-outlined">star</span>
			</td>
			<td>
				<span className="material-symbols-outlined">label_important</span>
			</td>
			<td className="from">{mail.from}</td>
			<td className="subject">{mail.subject} -</td>
			<td className="mail-body">{mail.body}</td>
			<td className="sent-at">{getSentTime(mail.sentAt)}</td>
		</tr>
	)
}
