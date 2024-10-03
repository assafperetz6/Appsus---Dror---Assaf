const { useSearchParams } = ReactRouterDOM

export function MainMenu() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	
	return (
		<ul className="main-menu clean-list">
			<li>
				<button className="compose">
					<span className="material-symbols-outlined">edit</span>
					<div>Compose</div>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'inbox'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">inbox</span>
                        <span>Inbox</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'starred'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">star</span>
                        <span>Starred</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'snoozed'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>Snoozed</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'important'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">label_important</span>
                        <span>Important</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'sent'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">send</span>
                        <span>Sent</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button onClick={() => setSearchPrms({status: 'drafts'})}>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">draft</span>
                        <span>Drafts</span>
                    </div>
                    <span className="mail-counter">23</span>
				</button>
			</li>
			<li>
				<button>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">label</span>
                        <span>Categories</span>
                    </div>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<div className="flex space-between align-center">
                        <span className="material-symbols-outlined">chevron_right</span>
                        <span>More</span>
                    </div>
                    <span>23</span>
				</button>
			</li>
		</ul>
	)
}
