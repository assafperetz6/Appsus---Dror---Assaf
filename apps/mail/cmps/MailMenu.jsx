const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { eventBusService, showSuccessMsg, showErrorMsg, emitSentMail } from '../../../services/event-bus.service.js'
import { ComposeForm } from './ComposeForm.jsx'
import { MailMenuFilter } from '../../../cmps/MenuFilter.jsx'

export function MailMenu(props) {
 	const [unreadMailsCount, setUnreadMailsCount] = useState(null)
	const [mailToCompose, setMailToCompose] = useState(null)
	const [isMinimized, setIsMinimized] = useState(null)
	const clearAutoSave = useRef(null)
	const isFirstRender = useRef(true)
	const {searchPrms, setSearchPrms} = props
	
	
	useEffect(() => {
		mailService.getInitUnreadCount().then(setUnreadMailsCount)
		const unsubUnreadCount = eventBusService.on('unreadCount', count => setUnreadMailsCount(prev => count ? count : prev))
		const unsubLoadDraft = eventBusService.on('mailToCompose', setMailToCompose)
		
		const unsubReplyToMail = eventBusService.on('mailToReply', mailToReply => {
			onComposeMail()
			onSetMailToCompose({ to: mailToReply.from, from: mailToReply.to, subject: `Reply to: ${mailToReply.subject}` })
		}, [])
		
		return () => {
			unsubUnreadCount()
			unsubLoadDraft()
			unsubReplyToMail()
		}
	}, [])

	useEffect(() => {				
		handleAutoSave()

		return () => {
			if (clearAutoSave.current) {
				clearInterval(clearAutoSave.current)
				clearAutoSave.current = null
			}
		}

	}, [mailToCompose])

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (mailToCompose) {
			mailToCompose.id ? setSearchPrms({ ...Object.fromEntries(searchPrms.entries()), compose: mailToCompose.id })
			: setSearchPrms({ ...Object.fromEntries(searchPrms.entries()), compose: 'new' })
		}

		else {
			const currPrms = Object.fromEntries(searchPrms.entries())
			const { compose, ...filteredPrms } = currPrms
			setSearchPrms(filteredPrms)
			emitSentMail('mail!')
		}
	}, [searchPrms, mailToCompose])

	function handleAutoSave() {
		if (mailToCompose && mailToCompose.to && mailToCompose.body) {
			const autoSaveDraft = setInterval(saveDraft, 5000)
			clearAutoSave.current = autoSaveDraft
		}

		else if (clearAutoSave.current) {
			clearInterval(clearAutoSave.current)
			clearAutoSave.current = null
		}
	}

	function saveDraft() {
		if(!mailToCompose.to || !mailToCompose.body) return
		
		return mailService
			.save(mailToCompose)
			.then((mail) => setMailToCompose(mail))
			.catch((err) => {
				console.log('Error: ', err)
				showErrorMsg('Failed to save draft')
			})
	}

	function onComposeMail() {
		const newMail = mailService.getEmptyMail()
		setMailToCompose(newMail)

		setIsMinimized(false)

		return newMail
	}

	function onSetMailToCompose(mailData) {
		setMailToCompose((prev) => ({ ...prev, ...mailData }))
	}

	function sendMail() {
		const mailToSend = { ...mailToCompose, sentAt: Date.now() }

		mailService
			.save(mailToSend)
			.then(() => {
				setMailToCompose(null)
				showSuccessMsg('Message sent')
			})
			.catch((err) => {
				console.log('Error: ', err)
				showErrorMsg('Failed to send mail')
			})
	}

	function onMinimizeCompose() {
    	saveDraft()
		setIsMinimized(!isMinimized)
	}

	function onCloseComposeWindow() {
	  if (!mailToCompose.to || !mailToCompose.body) return setMailToCompose(null)

	  saveDraft().then(() => {
      	setMailToCompose(null)
      	showSuccessMsg('Your draft was saved!')})
	  .catch(err => {
		console.log('Error: ', err)
		showErrorMsg('Could not save draft')
		})
	}

	return (
		<React.Fragment>
			<button className="compose" onClick={onComposeMail}>
				Compose
			</button>

			<ul className="filter-folders clean-list">
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="inbox" unreadMailsCount={unreadMailsCount} />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="starred" />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="snoozed" />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="important" />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="sent" />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="drafts" />
				<MailMenuFilter Link={Link} searchPrms={searchPrms} setSearchPrms={setSearchPrms} {...props} path="trash" />
			</ul>
			{mailToCompose && (
				<ComposeForm
					onMinimizeCompose={onMinimizeCompose}
					isMinimized={isMinimized}
          			mailToCompose={mailToCompose}
					onSetMailToCompose={onSetMailToCompose}
					sendMail={sendMail}
          			onCloseComposeWindow={onCloseComposeWindow}
				/>
			)}
		</React.Fragment>
	)
}
