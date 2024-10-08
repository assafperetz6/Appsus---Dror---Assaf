import { MailPreview } from './MailPreview.jsx'

export function MailList({
	mails,
	filterBy,
	loggedUser,
	onContextMenu,
	onChangeMailStatus,
	onRemoveMail,
	onSetIsHover,
	hoveredMailId
}) {
	let mailsToShow = mails

	window.mails = mailsToShow

	if (filterBy.status === 'trash')
		mailsToShow = mailsToShow.filter((mail) => mail.removedAt)

	else mailsToShow = mailsToShow.filter((mail) => !mail.removedAt)

	if (filterBy.status === 'inbox')
		mailsToShow = mailsToShow.filter((mail) => mail.from !== loggedUser.mail)

	else if (filterBy.status === 'starred')
		mailsToShow = mailsToShow.filter((mail) => mail.isStarred)

	else if (filterBy.status === 'important')
		mailsToShow = mailsToShow.filter((mail) => mail.isImportant)

	else if (filterBy.status === 'sent')
		mailsToShow = mailsToShow.filter((mail) => mail.from === loggedUser.mail)

	else if (filterBy.status === 'labels') {
		mailsToShow = mailsToShow.filter((mail) =>
			mail.labels.some((label) => filterBy.label.includes(label))
	)

		if (!mailsToShow.length)
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
							key={mail.id}
						/>
					))}
				</tbody>
			</table>
		</section>
	)
}
