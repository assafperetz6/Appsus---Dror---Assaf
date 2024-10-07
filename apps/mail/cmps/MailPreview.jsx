export function MailPreview({ mail, currFolder, currLabel, onContextMenu, onAddToFolder }) {
	function getSentTime(timeStamp) {
		var h = new Date(timeStamp).getHours()
		var m = new Date(timeStamp).getMinutes()

		h = h < 10 ? '0' + h : h
		m = m < 10 ? '0' + m : m

		return h + ':' + m
	}

	function setLabelsToShow(label) {
		if (currFolder === 'inbox') {
			if (label !== 'inbox') return <span key={label}>{label}</span>
		}
		else if (currFolder === 'labels') {
			if (label !== currLabel) return <span key={label}>{label}</span>
		}
		
		else return <span key={label}>{label}</span>
	}

	return (
		<tr
			className={`mail-preview ${mail.isRead ? 'read' : ''}`}
			data-id={mail.id}
			onContextMenu={onContextMenu}
		>
			<td className="mail-actions">
				<button className="check-box"></button>
				<button className={`starred ${mail.isStarred ? 'marked' : ''}`} onClick={() => onAddToFolder(mail.id, 'starred')}></button>
				<button className={`important ${mail.isImportant ? 'marked' : ''}`} onClick={() => onAddToFolder(mail.id, 'important')}></button>
			</td>
			<td className="from">{mail.from}</td>
			<td className="labels">{mail.labels.map(setLabelsToShow)}</td>
			<td className="subject">{mail.subject} -</td>
			<td className="mail-body">{mail.body}</td>
			<td className="sent-at">{getSentTime(mail.sentAt)}</td>
		</tr>
	)
}
