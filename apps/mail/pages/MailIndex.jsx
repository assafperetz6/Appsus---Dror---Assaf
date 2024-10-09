const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import { Loader } from '../../../cmps/Loader.jsx'
import { FilterByTabs } from '../../../cmps/FilterByTabs.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailContextMenu } from '../cmps/MailContextMenu.jsx'
import { ComposeForm } from '../cmps/ComposeForm.jsx'

export function MailIndex() {
	const [mails, setMails] = useState(null)
	const [isContextMenu, setIsContextMenu] = useState(false)
	const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 })
	const [isHover, setIsHover] = useState(false)
	const [hoveredMailId, setHoveredMailId] = useState(null)
	const [selectedMail, setSelectedMail] = useState(null)

	const [isMinimized, setIsMinimized] = useState(null)

	const [searchPrms, setSearchPrms] = useSearchParams()
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

	useEffect(() => {
		loadMails(filterBy)
		setSearchPrms(utilService.getTruthyValues(filterBy))

	}, [filterBy])

	useEffect(() => {
		const newFilter = mailService.getFilterFromSearchParams(searchPrms)

		setFilterBy(newFilter)
	}, [searchPrms])
	
	function loadMails() {
		mailService
			.query()
			.then(setMails)
			.catch((err) => console.log('error: ', err))
	}

	function onSetIsHover(boolian, mailId) {
		setIsHover(boolian)
		setHoveredMailId(mailId)
	}

	function onContextMenu(ev) {
		ev.preventDefault()

		
		// setIsContextMenu(false) WONDER IF NEEDED
		
		const mailId = ev.currentTarget.dataset.id
		
		setCursorPos({ top: ev.clientY, left: ev.clientX })
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
		const mailsBackup = structuredClone(mails)
		const mailToRemove = mails.find(mail => mail.id === mailId)

		if (mailToRemove.removedAt) {
			setMails(mails.filter(mail => mail.id !== mailToRemove.id))

			mailService
			.remove(mailId)
			.then(() => {
				showSuccessMsg(`mail removed successfully!`)
			})
			.catch((err) => {
				console.log('Problems removing mail:', err)
				showErrorMsg(`Problems removing mail (${mailId})`)
				setMails(mailsBackup)
			})
		}

		else {
				mailToRemove.removedAt = Date.now()
				setMails(mails => [...mails])
				
				mailService.save(mailToRemove)
				.then(() => showSuccessMsg(`mail moved to trash`))
				.catch((err) => {
					console.log('Err: ', err)
					showErrorMsg(`Problems adding mail to folder (${mailId})`)
					setMails(mailsBackup)
				})
			}
	}

	function onLabelAs(selectedMail, label) {
		if (selectedMail.labels.includes(label)) return

		const mailsBackup = structuredClone(mails)
		selectedMail.labels.push(label)

		setMails(mails => [...mails])
		setIsContextMenu(false)

		mailService
			.save(selectedMail)
			.catch((err) => {
				console.log('Err: ', err)
				showErrorMsg(`Problems adding label (${mailId})`)
				setMails(mailsBackup)
			})
	}

	function onChangeMailStatus(mailId, status) {
		const mailsBackup = structuredClone(mails)
		const mailToUpdate = mails.find(mail => mail.id === mailId)

		if (status === 'starred') mailToUpdate.isStarred = !mailToUpdate.isStarred
		else if (status === 'important') mailToUpdate.isImportant = !mailToUpdate.isImportant
		else if (status === 'read') mailToUpdate.isRead = !mailToUpdate.isRead
		
		setMails(mails => [...mails])

		mailService.save(mailToUpdate)
			.catch((err) => {
				console.log('Err: ', err)
				showErrorMsg(`Problems adding mail to folder (${mailId})`)
				setMails(mailsBackup)
			})
	}

	function onMinimizeCompose() {
		setIsMinimized(!isMinimized)
	}
	
	if (!mails) return <Loader />
	return (
		<React.Fragment>
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
					onChangeMailStatus={onChangeMailStatus}
					onRemoveMail={onRemoveMail}

					onSetIsHover={onSetIsHover}
					hoveredMailId={hoveredMailId}
				/>
				{isContextMenu && (
					<MailContextMenu
						cursorPos={cursorPos}
						selectedMail={selectedMail}
						onLabelAs={onLabelAs}
						onRemoveMail={onRemoveMail}
					/>
				)}
			</section>
			<ComposeForm onMinimizeCompose={onMinimizeCompose} isMinimized={isMinimized}/>
		</React.Fragment>
	)
}
