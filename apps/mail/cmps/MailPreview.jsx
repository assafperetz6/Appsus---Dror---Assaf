const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onSetIsHover, hoveredMailId, currFolder, currLabel, onContextMenu, onChangeMailStatus, onRemoveMail, onLoadDraft }) {
	const navigate = useNavigate()

	function getSentTime(timeStamp) {		
		if ((Date.now() - timeStamp) < (1000 * 60 * 60 * 24)) {
			var hours = new Date(timeStamp).getHours()
			var minutes = new Date(timeStamp).getMinutes()
	
			hours = hours < 10 ? '0' + hours : hours
			minutes = minutes < 10 ? '0' + minutes : minutes
	
			return hours + ':' + minutes
		}
		const date = new Date(timeStamp)
		const options = { month: 'short', day: 'numeric'}

		return date.toLocaleDateString('en-US', options)
	}

	function setLabelsToShow(labels) {
		let labelsToShow = [...labels]

		if (currFolder !== 'inbox') labelsToShow.unshift('inbox')
		if (labelsToShow.length > 2) labelsToShow = labelsToShow.slice(0, 2)

		return labelsToShow.map(label => {
			if (currFolder === 'inbox') return <span key={label}>{label}</span>
			else if (currFolder === 'labels') {
				if (label !== currLabel) return <span key={label}>{label}</span>
			} else return <span key={label}>{label}</span>
		})
	}

	function onShowDetails() {
		if (!mail.sentAt) onLoadDraft(mail)
		// navigate(`/mail/${mail.id}`)
	}

	return (
		<tr
			className={`mail-preview ${mail.isRead ? 'read' : ''}`}
			data-id={mail.id}
			onClick={onShowDetails}
			onContextMenu={onContextMenu}
			onMouseOver={(ev) => onSetIsHover(true, ev.currentTarget.dataset.id)}
			onMouseOut={() => onSetIsHover(false)}
		>
			<td className="mail-actions">
				<button className="check-box"></button>
				<button
					className={`starred ${mail.isStarred ? 'marked' : ''}`}
					onClick={() => onChangeMailStatus(mail.id, 'starred')}
				></button>
				<button
					className={`important ${mail.isImportant ? 'marked' : ''}`}
					onClick={() => onChangeMailStatus(mail.id, 'important')}
				></button>
			</td>
			<td className="from"><span>{mail.from}</span></td>
			<td className="info">
				<div className="labels">{setLabelsToShow(mail.labels)}</div>
				<div className="subject">{mail.subject}</div>
				<p className="mail-body">- {mail.body}</p>
			</td>

			{hoveredMailId === mail.id ? (
				<td className="mail-actions">
					<button className="trash" onClick={() => onRemoveMail(mail.id)}></button>
					<button
						className={`${mail.isRead ? 'mail-read' : 'mail-unread'}`}
						onClick={() => onChangeMailStatus(mail.id, 'read')}
					></button>
				</td>
			) : (
				<td className="sent-at">{getSentTime(mail.sentAt)}</td>
			)}
		</tr>
	)
}
