const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onSetIsHover, hoveredMailId, currFolder, currLabel, onContextMenu, onChangeMailStatus, onRemoveMail, onRemoveLabel, onLoadDraft, onSaveAsNote }) {
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

		// if (currFolder !== 'inbox') labelsToShow.unshift('inbox')
		// if (labelsToShow.length > 2) labelsToShow = labelsToShow.slice(0, 2)

		return labelsToShow.map(label => {
			if (currFolder === 'inbox') return <span onClick={(ev) => onRemoveLabel(ev, mail.id, label)} key={label}>{label}</span>
			else if (currFolder === 'labels') {
				if (label !== currLabel) return <span onClick={(ev) => onRemoveLabel(ev, mail.id, label)} key={label}>{label}</span>
			} else return <span onClick={(ev) => onRemoveLabel(ev, mail.id, label)} key={label}>{label}</span>
		})
	}

	function onShowDetails(ev) {
		if (!mail.sentAt) onLoadDraft(mail)
		else {
			onChangeMailStatus(ev, mail.id)
			navigate(`/mail/details/${mail.id}`)
		}
	}

	return (
		<tr
			className={`mail-preview ${mail.isRead ? 'read' : ''}`}
			data-id={mail.id}
			onClick={(ev) => onShowDetails(ev)}
			onContextMenu={onContextMenu}
			onMouseOver={(ev) => onSetIsHover(ev.currentTarget.dataset.id)}
			onMouseOut={() => onSetIsHover(null)}
		>

			<td className="mail-actions">
				<button className="check-box"></button>
				<button
					className={`starred ${mail.isStarred ? 'marked' : ''}`}
					onClick={(ev) => onChangeMailStatus(ev, mail.id, 'isStarred')}
				></button>
				<button
					className={`important ${mail.isImportant ? 'marked' : ''}`}
					onClick={(ev) => onChangeMailStatus(ev, mail.id, 'isImportant')}
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
					<button className="save-as-note" onClick={(ev) => onSaveAsNote(ev, mail)}></button>
					<button className="trash" onClick={(ev) => onRemoveMail(ev, mail.id)}></button>
					<button
						className={`${mail.isRead ? 'mail-read' : 'mail-unread'}`}
						onClick={(ev) => onChangeMailStatus(ev, mail.id, 'isRead')}
					></button>
				</td>
			) : (
				<td className="sent-at">{getSentTime(mail.sentAt)}</td>
			)}
		</tr>
	)
}
