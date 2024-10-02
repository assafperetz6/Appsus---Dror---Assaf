import { MailPreview } from './MailPreview.jsx'

export function MailList() {
	return (
		<table>
			<tbody className="mail-list">
                < MailPreview />
                < MailPreview />
                < MailPreview />
                < MailPreview />
                < MailPreview />
                < MailPreview />
            </tbody>
		</table>
	)
}
