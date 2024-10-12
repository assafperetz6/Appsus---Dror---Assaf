import { useMailContext } from '../services/mailContext.js'

import { MailList } from './MailList.jsx'
import { FilterByTabs } from './FilterByTabs.jsx'

export function MailDashboard() {
	const {
        loc,
		searchPrms,
		mails,
		filterBy,
		loggedUser,
		onContextMenu,
		onChangeMailStatus,
		onRemoveMail,
		onLoadDraft,
		onSetIsHover,
		hoveredMailId,
	} = useMailContext()
    
	return (
		<React.Fragment>
			<section className="actions-pagination">
				<section className="select-options flex">
					<button>
						<span className="material-symbols-outlined">
							check_box_outline_blank
						</span>
					</button>
					<button>
						<span className="material-symbols-outlined">
							keyboard_arrow_down
						</span>
					</button>

					<button>
						<span className="material-symbols-outlined">refresh</span>
					</button>

					<button>
						<span className="material-symbols-outlined">more_vert</span>
					</button>
				</section>

				<section className="info-pagination flex">
					<div className="shown-mails">1-50 of 2,000</div>
					<button>
						<span className="material-symbols-outlined">chevron_left</span>
					</button>
					<button>
						<span className="material-symbols-outlined">chevron_right</span>
					</button>
				</section>
			</section>

			{searchPrms.get('status') === 'inbox' && <FilterByTabs />}

			<MailList
                loc={loc}
				mails={mails}
				filterBy={filterBy}
				loggedUser={loggedUser}
				onContextMenu={onContextMenu}
				onChangeMailStatus={onChangeMailStatus}
				onRemoveMail={onRemoveMail}
				onLoadDraft={onLoadDraft}
				onSetIsHover={onSetIsHover}
				hoveredMailId={hoveredMailId}
			/>
            <footer><div>A mail app for those who hate Emails.</div></footer>
		</React.Fragment>
	)
}
