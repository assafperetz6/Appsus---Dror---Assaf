const { useSearchParams } = ReactRouterDOM

export function MainMenu() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	
	return (
		<ul className="main-menu clean-list">
			<li>
				<button className="compose">
					Compose
				</button>
			</li>
			<li>
				<button className="inbox" onClick={() => setSearchPrms({status: 'inbox'})}>
					Inbox
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="starred" onClick={() => setSearchPrms({status: 'starred'})}>
					Starred
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="snoozed" onClick={() => setSearchPrms({status: 'snoozed'})}>
					Snoozed
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="important" onClick={() => setSearchPrms({status: 'important'})}>
					Important
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="sent" onClick={() => setSearchPrms({status: 'sent'})}>
					Sent
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button className="drafts" onClick={() => setSearchPrms({status: 'drafts'})}>
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
