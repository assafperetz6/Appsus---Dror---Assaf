import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, filterBy, loggedUser }) {
	let mailsToShow = mails

	if (filterBy.status === 'label') {
		// console.log(mails.filter((mail) => mail.labels.some(label => filterBy.labels.includes(label))))

		mailsToShow = mails.filter((mail) => mail.labels.some(label => filterBy.labels.includes(label)))
	}

	// console.log(filterBy)
	

	window.mails = mailsToShow

	if (filterBy.status === 'inbox')
		mailsToShow = mails.filter((mail) => mail.from !== loggedUser.mail)

	if (filterBy.status === 'sent')
		mailsToShow = mails.filter((mail) => mail.from === loggedUser.mail)

	if (filterBy.status === 'starred')
		mailsToShow = mails.filter(mail => mail.isStarred)

	return (
		<table>
			<tbody className="mail-list full">
				{mailsToShow.map((mail) => (
					<MailPreview mail={mail} key={mail.id} />
				))}
			</tbody>
		</table>
	)
}