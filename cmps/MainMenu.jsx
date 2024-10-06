const { useSearchParams } = ReactRouterDOM

// import { mailService } from "../apps/mail/services/mail.service.js"

export function MainMenu() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	
	function setMarkedFolder(folderName) {
		const currFolder = searchPrms.get('status')

		if (currFolder === folderName) return 'marked'
	}
	return (
		<section className="main-menu">
			<button className="compose">Compose</button>
			
			<ul className="filter-folders clean-list">
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

			<section className="label-container">
				<div className="flex space-between">
					<h3>Labels</h3>
					<button className="add-label" onClick={() => console.log('New label added')}>+</button>
				</div>

				<ul className="label-list clean-list">
				<li>
					<button className={`label ${setMarkedFolder('critical')}`} onClick={() => setSearchPrms({status: 'label', labels: ['critical']})}>Critical</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('family')}`} onClick={() => setSearchPrms({status: 'label', labels: ['family']})}>Family</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('work')}`} onClick={() => setSearchPrms({status: 'label', labels: ['work']})}>Work</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('friends')}`} onClick={() => setSearchPrms({status: 'label', labels: ['friends']})}>Friends</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('spam')}`} onClick={() => setSearchPrms({status: 'label', labels: ['spam']})}>Spam</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('memories')}`} onClick={() => setSearchPrms({status: 'label', labels: ['memories']})}>Memories</button>
				</li>
				<li>
					<button className={`label ${setMarkedFolder('romantic')}`} onClick={() => setSearchPrms({status: 'label', labels: ['romantic']})}>Romantic</button>
				</li>
				</ul>
			</section>
		</section>
	)
}
