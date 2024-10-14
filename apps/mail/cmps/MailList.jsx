import { MailPreview } from './MailPreview.jsx'

export function MailList({
	loc,
	mails,
	filterBy,
	searchPrms,
	loggedUser,
	onContextMenu,
	onChangeMailStatus,
	onRemoveMail,
	onRemoveLabel,
	onLoadDraft,
	hoveredMailId,
	onSetIsHover
}) {
	let mailsToShow = mails.sort((m1, m2) => (m1.sentAt - m2.sentAt) * -1)

	if (searchPrms.get('isAdvanced') === 'true') mailsToShow = mails
	else if (!filterBy.txt) {
		
		if (loc.pathname === '/mail/trash')
			mailsToShow = mailsToShow.filter((mail) => mail.removedAt)
		else mailsToShow = mailsToShow.filter((mail) => !mail.removedAt)

		if (loc.pathname !== '/mail/labels') mailsToShow = mailsToShow.filter(mail => !mail.labels.includes('spam'))

		switch (loc.pathname) {

			case '/mail/labels':
				mailsToShow = mailsToShow.filter((mail) =>
								mail.labels.some((label) => filterBy.label.includes(label)))
				break;

			case '/mail/inbox':
				mailsToShow = mailsToShow.filter((mail) => mail.from !== loggedUser.mail)
				break;
		
			case '/mail/starred':
				mailsToShow = mailsToShow.filter((mail) => mail.isStarred)
				break;

			case '/mail/snoozed':
				mailsToShow = mailsToShow.filter((mail) => mail.isSnoozed)
				break;
		
			case '/mail/important':
				mailsToShow = mailsToShow.filter((mail) => mail.isImportant)
				break;
		
			case '/mail/sent':
				mailsToShow = mailsToShow.filter((mail) => mail.from === loggedUser.mail)
				break;
		
			case '/mail/drafts':
				mailsToShow = mailsToShow.filter((mail) => !mail.sentAt).sort((m1, m2) => (m1.createdAt - m2.createdAt) * -1)
				break;
		}

	}
	
	if (!mailsToShow.length) {
		return (
			<div className="no-mails-container flex justify-center">
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
							currFolder={loc.pathname}
							currLabel={filterBy.label}
							onContextMenu={onContextMenu}
							onChangeMailStatus={onChangeMailStatus}
							onRemoveMail={onRemoveMail}
							onRemoveLabel={onRemoveLabel}
							onLoadDraft={onLoadDraft}
							key={mail.id}
						/>
					))}
				</tbody>
			</table>
		</section>
	)
}
