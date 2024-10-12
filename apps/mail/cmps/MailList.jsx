import { MailPreview } from './MailPreview.jsx'

export function MailList({
	mails,
	filterBy,
	loggedUser,
	onContextMenu,
	onChangeMailStatus,
	onRemoveMail,
	onLoadDraft,
	onSetIsHover,
	hoveredMailId
}) {
	let mailsToShow = mails.sort((m1, m2) => (m1.sentAt - m2.sentAt) * -1)

	window.mails = mailsToShow

	if (filterBy.status === 'trash')
		mailsToShow = mailsToShow.filter((mail) => mail.removedAt)

	else mailsToShow = mailsToShow.filter((mail) => !mail.removedAt)

	switch (filterBy.status) {
		case 'inbox':
			mailsToShow = mailsToShow.filter((mail) => mail.from !== loggedUser.mail)
			break;
	
		case 'starred':
			mailsToShow = mailsToShow.filter((mail) => mail.isStarred)
			break;

		case 'snoozed':
			mailsToShow = mailsToShow.filter((mail) => mail.isSnoozed)
			break;
	
		case 'important':
			mailsToShow = mailsToShow.filter((mail) => mail.isImportant)
			break;
	
		case 'sent':
			mailsToShow = mailsToShow.filter((mail) => mail.from === loggedUser.mail)
			break;
	
		case 'drafts':
			mailsToShow = mailsToShow.filter((mail) => !mail.sentAt).sort((m1, m2) => (m1.createdAt - m2.createdAt) * -1)
			break;
	
		case 'labels':
			mailsToShow = mailsToShow.filter((mail) =>
							mail.labels.some((label) => filterBy.label.includes(label)))
			break;
	}

	if (!mailsToShow.length) {
		return (
			<div className="flex justify-center">
				There are no conversations with this label.
			</div>
		)
	}
	
	return (
		<section>
			<table>
				<tbody className="mail-list full">
					{mailsToShow.map((mail) => (
						<MailPreview
							mail={mail}
							onSetIsHover={onSetIsHover}
							hoveredMailId={hoveredMailId}

							currFolder={filterBy.status}
							currLabel={filterBy.label}
							onContextMenu={onContextMenu}
							onChangeMailStatus={onChangeMailStatus}
							onRemoveMail={onRemoveMail}
							onLoadDraft={onLoadDraft}
							key={mail.id}
						/>
					))}
				</tbody>
			</table>
		</section>
	)
}
