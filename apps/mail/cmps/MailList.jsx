import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails }) {
	return (
		<table>
			<tbody className="mail-list full">
                {mails.map(mail => (
                    <MailPreview mail={mail} key={mail.id} />
                ))}
            </tbody>
		</table>
	)
}
