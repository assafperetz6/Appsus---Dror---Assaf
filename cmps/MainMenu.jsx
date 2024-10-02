export function MainMenu() {
	return (
		<ul className="main-menu clean-list">
			<li>
				<button className="compose">
					<span className="material-symbols-outlined">edit</span>
					<span>Compose</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">inbox</span>
					<span>Inbox</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">star</span>
					<span>Starred</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">schedule</span>
					<span>Snoozed</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">label_important</span>
					<span>Important</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">send</span>
					<span>Sent</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">draft</span>
					<span>Drafts</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">label</span>
					<span>Categories</span>
                    <span>23</span>
				</button>
			</li>
			<li>
				<button>
					<span className="material-symbols-outlined">chevron_right</span>
					<span>More</span>
                    <span>23</span>
				</button>
			</li>
		</ul>
	)
}
