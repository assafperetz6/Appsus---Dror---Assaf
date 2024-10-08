import { MailPreview } from './MailPreview.jsx'

export function MailList({
	mails,
	filterBy,
	loggedUser,
	onContextMenu,
	onChangeMailStatus,
	onSetIsHover,
	hoveredMailId
}) {
	let mailsToShow = mails

	window.mails = mailsToShow

	if (filterBy.status === 'inbox')
		mailsToShow = mails.filter((mail) => mail.from !== loggedUser.mail)

	if (filterBy.status === 'sent')
		mailsToShow = mails.filter((mail) => mail.from === loggedUser.mail)

	if (filterBy.status === 'starred')
		mailsToShow = mails.filter((mail) => mail.isStarred)

	if (filterBy.status === 'important')
		mailsToShow = mails.filter((mail) => mail.isImportant)

	if (filterBy.status === 'labels') {
		mailsToShow = mails.filter((mail) =>
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
							key={mail.id}
						/>
					))}
				</tbody>
			</table>
		</section>
	)
}
