const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailContextMenu } from '../cmps/MailContextMenu.jsx'
import { Loader } from '../../../cmps/Loader.jsx'
import { FilterByTabs } from '../../../cmps/FilterByTabs.jsx'
import { utilService } from '../../../services/util.service.js'

export function MailIndex() {
	const [mails, setMails] = useState(null)
	const [isContextMenu, setIsContextMenu] = useState(false)
	const [cursorCoords, setCursorCoords] = useState({ top: 0, left: 0 })
	const [selectedMail, setSelectedMail] = useState(null)

	const [searchPrms, setSearchPrms] = useSearchParams()
	const [filterBy, setFilterBy] = useState(
		mailService.getFilterFromSearchParams(searchPrms)
	)

	useEffect(() => {
		loadMails(filterBy)
		setSearchPrms(utilService.getTruthyValues(filterBy))
	}, [])

	useEffect(() => {
		const newFilter = mailService.getFilterFromSearchParams(searchPrms)

		setFilterBy(newFilter)
	}, [searchPrms])

	useEffect(() => {
		loadMails(filterBy)
	}, [filterBy])

	function loadMails() {
		mailService
			.query()
			.then(setMails)
			.catch((err) => console.log('error: ', err))
	}

	function onContextMenu(ev) {
		ev.preventDefault()

		setIsContextMenu(false)

		const mailId = ev.currentTarget.dataset.id

		setCursorCoords({ top: `${ev.clientY}px`, left: `${ev.clientX}px` })

		loadContextMenu(mailId)
		setIsContextMenu(true)
	}

	function loadContextMenu(mailId) {
		const mail = mails.find((mail) => mail.id === mailId)
		setSelectedMail(mail)
	}

	function closeContextMenu(ev) {
		ev.stopPropagation()

		setIsContextMenu(false)
	}

	function onRemoveMail(mailId) {
		mailService
			.remove(mailId)
			.then(() => {
				setMails((mails) => mails.filter((mail) => mail.id !== mailId))
				showSuccessMsg(`mail removed successfully!`)
			})
			.catch((err) => {
				console.log('Problems removing mail:', err)
				showErrorMsg(`Problems removing mail (${mailId})`)
			})
	}

	function onLabelAs(selectedMail, label) {
		if (selectedMail.labels.includes(label)) return

		// setSelectedMail(mail => ({...mail, labels: [...selectedMail.labels, label]})) // TODO: CHANGING STATE WITHOUT SETSTATE. IS IT BAD?
		selectedMail.labels.push(label)
		setIsContextMenu(false)

		mailService
			.save(selectedMail)
			.then(() =>
				setMails((mails) => [...mails.filter((mail) => mail.id !== selectedMail.id), selectedMail]))
			.catch((err) => console.log('Err: ', err))
	}

	function onAddToFolder(mailId, folder) {
		const mailToUpdate = { ...mails.find(mail => mail.id === mailId) }

		if (folder === 'starred') mailToUpdate.isStarred = !mailToUpdate.isStarred
		else if (folder === 'important') mailToUpdate.isImportant = !mailToUpdate.isImportant

		console.log(mailToUpdate.isImportant)
		
		mailService.save(mailToUpdate)
			.then(() =>
				setMails((mails) => [...mails.filter((mail) => mail.id !== mailToUpdate.id), mailToUpdate]))
			.catch((err) => console.log('Err: ', err))		
	}

	if (!mails) return <Loader />
	return (
		<section className="mail-container" onClick={closeContextMenu}>
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
				mails={mails}
				filterBy={filterBy}
				loggedUser={mailService.loggedinUser}
				onContextMenu={onContextMenu}
				onAddToFolder={onAddToFolder}
			/>
			{isContextMenu && (
				<MailContextMenu
					cursorCoords={cursorCoords}
					selectedMail={selectedMail}
					onLabelAs={onLabelAs}
					onRemoveMail={onRemoveMail}
				/>
			)}
		</section>
	)
}
