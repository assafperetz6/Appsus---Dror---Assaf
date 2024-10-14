import { useMailContext } from '../services/mailContext.js'

import { MailList } from './MailList.jsx'
import { FilterByTabs } from './FilterByTabs.jsx'

export function MailDashboard() {
	const {
        loc,
		mails,
		filterBy,
		searchPrms,
		loggedUser,
		onRefresh,
		onContextMenu,
		onChangeMailStatus,
		onRemoveMail,
		onRemoveLabel,
		onLoadDraft,
		onSetIsHover,
		hoveredMailId,
	} = useMailContext()
	
	return (
		<React.Fragment>
			<section className="actions-pagination">
				<section className="select-options flex">
					<button className="unchecked"></button>
					<button className="see-more"></button>
					<button className="refresh" onClick={() => onRefresh()}></button>
					<button className="options"></button>
				</section>

				<section className="info-pagination flex">
					<div className="shown-mails">{`Total of ${mails.length} mails`}</div>
					<button className="prev-mail"></button>
					<button className="next-mail"></button>
				</section>
			</section>

			{loc.pathname === '/mail/inbox' && <FilterByTabs />}

			<MailList
                loc={loc}
				mails={mails}
				filterBy={filterBy}
				searchPrms={searchPrms}
				loggedUser={loggedUser}
				onContextMenu={onContextMenu}
				onChangeMailStatus={onChangeMailStatus}
				onRemoveMail={onRemoveMail}
				onRemoveLabel={onRemoveLabel}
				onLoadDraft={onLoadDraft}
				onSetIsHover={onSetIsHover}
				hoveredMailId={hoveredMailId}
			/>
            <footer><div>A mail app for those who hate Emails.</div></footer>
		</React.Fragment>
	)
}
