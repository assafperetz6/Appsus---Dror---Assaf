const { useSearchParams } = ReactRouterDOM

// import { mailService } from "../apps/mail/services/mail.service.js"

export function MainMenu() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	
	function setMarkedFolder(folderName) {
		const currFolder = searchPrms.get('status')

		if (currFolder === folderName) return 'marked'
	}

	return (
		<ul className="main-menu clean-list">
			<li>
				<button className="compose">
					Compose
				</button>
			</li>
			<li>
				<button className={`inbox ${setMarkedFolder('inbox')}`} onClick={() => setSearchPrms({status: 'inbox'})}>
					Inbox
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className={`starred ${setMarkedFolder('starred')}`} onClick={() => setSearchPrms({status: 'starred'})}>
					Starred
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className={`snoozed ${setMarkedFolder('snoozed')}`} onClick={() => setSearchPrms({status: 'snoozed'})}>
					Snoozed
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className={`important ${setMarkedFolder('important')}`} onClick={() => setSearchPrms({status: 'important'})}>
					Important
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className={`sent ${setMarkedFolder('sent')}`} onClick={() => setSearchPrms({status: 'sent'})}>
					Sent
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className={`drafts ${setMarkedFolder('drafts')}`} onClick={() => setSearchPrms({status: 'drafts'})}>
					Drafts
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="categories">
					Categories
                    <span>23</span>
				</button>
			</li>
			<li>
				<button className="see-more">
					More
                    <span>23</span>
				</button>
			</li>
		</ul>
	)
}
