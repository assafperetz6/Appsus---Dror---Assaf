const { useState, useEffect } = React
const { useLocation, useSearchParams, Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailContext } from '../services/mailContext.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg, updateUnreadCount, loadDraft, eventBusService } from '../../../services/event-bus.service.js'

import { Loader } from '../../../cmps/Loader.jsx'
import { MailContextMenu } from '../cmps/MailContextMenu.jsx'

export function MailIndex() {
	const [mails, setMails] = useState(null)
	const [isContextMenu, setIsContextMenu] = useState(false)
	const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 })
	const [isHover, setIsHover] = useState(false)
	const [hoveredMailId, setHoveredMailId] = useState(null)
	const [selectedMail, setSelectedMail] = useState(null)

	const loc = useLocation()
	const [searchPrms, setSearchPrms] = useSearchParams({ status: 'inbox' })
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

	useEffect(() => {
		loadMails(filterBy)
		setSearchPrms(utilService.getTruthyValues(filterBy))
	}, [])

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

	function emitUnreadCount() {
		return updateUnreadCount(
			mails.reduce((acc, mail) => {
				if (!mail.isRead) acc++
				return acc
			}, 0)
		)
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

	function onRemoveMail(ev, mailId) {
		ev.stopPropagation()
		
		const mailsBackup = structuredClone(mails)
		const mailToRemove = mails.find((mail) => mail.id === mailId)

		if (mailToRemove.removedAt) {
			setMails(mails.filter((mail) => mail.id !== mailToRemove.id))

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
		} else {
			mailToRemove.removedAt = Date.now()
			setMails((mails) => [...mails])

			mailService
				.save(mailToRemove)
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

		setMails((mails) => [...mails])
		setIsContextMenu(false)

		mailService.save(selectedMail).catch((err) => {
			console.log('Err: ', err)
			showErrorMsg(`Problems adding label (${mailId})`)
			setMails(mailsBackup)
		})
	}

	function onChangeMailStatus(ev, mailId, status) {
		ev.stopPropagation()

		const mailsBackup = structuredClone(mails)
		const mailToUpdate = mails.find((mail) => mail.id === mailId)

		if (status === 'starred') mailToUpdate.isStarred = !mailToUpdate.isStarred
		else if (status === 'important')
			mailToUpdate.isImportant = !mailToUpdate.isImportant
		else if (status === 'read') {
			mailToUpdate.isRead = !mailToUpdate.isRead
			emitUnreadCount()
		}

		setMails((mails) => [...mails])

		mailService.save(mailToUpdate).catch((err) => {
			console.log('Err: ', err)
			showErrorMsg(`Problems adding mail to folder (${mailId})`)
			setMails(mailsBackup)
		})
	}

	function onLoadDraft(mailId) {
		return loadDraft(mailId)
	}

	if (!mails) return <Loader />

	const dashboardProps = {
		loggedUser: mailService.loggedinUser,
		loc,
		searchPrms,
		mails,
		filterBy,
		onContextMenu,
		onChangeMailStatus,
		onRemoveMail,
		onLoadDraft,
		onSetIsHover,
		hoveredMailId,
	}
	
	return (
		<React.Fragment>
			<section className="mail-container" onClick={closeContextMenu}>
				<MailContext.Provider value={dashboardProps}>
					<Outlet/>
				</MailContext.Provider>
			</section>
			{isContextMenu && (
				<MailContextMenu
					cursorPos={cursorPos}
					selectedMail={selectedMail}
					onLabelAs={onLabelAs}
					onRemoveMail={onRemoveMail}
				/>
			)}
		</React.Fragment>
	)
}