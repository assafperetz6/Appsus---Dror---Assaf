const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'
import { eventBusService, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { ComposeForm } from './ComposeForm.jsx'
import { MenuFilter } from '../../../cmps/MenuFilter.jsx'

export function MailMenu({searchPrms, setSearchPrms, ...props }) {
  const [unreadMailsCount, setUnreadMailsCount] = useState(null)
	const [mailToCompose, setMailToCompose] = useState(null)
	const [isMinimized, setIsMinimized] = useState(null)
	const clearAutoSave = useRef(null)

  useEffect(() => {
    mailService.getInitUnreadCount().then(setUnreadMailsCount)
		const unsubscribe = eventBusService.on('unreadCount', setUnreadMailsCount)
		
		return () => {
			unsubscribe()
		}
	}, [])

	useEffect(() => {
		if (mailToCompose) {
			mailToCompose.id ? setSearchPrms({ ...Object.fromEntries(searchPrms.entries()), compose: mailToCompose.id })
			: setSearchPrms({ ...Object.fromEntries(searchPrms.entries()), compose: 'new' })
		}

		handleAutoSave()
		return () => {
			if (clearAutoSave.current) {
        clearInterval(clearAutoSave.current)
        clearAutoSave.current = null
		  }
    }
	}, [mailToCompose])

	function handleAutoSave() {
		if (mailToCompose && mailToCompose.to && mailToCompose.body) {
			const autoSaveDraft = setInterval(saveDraft, 5000)
			clearAutoSave.current = autoSaveDraft
      
		} else if (clearAutoSave.current) {
			clearInterval(clearAutoSave.current)
			clearAutoSave.current = null
		}
	}

	function saveDraft() {
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
	  saveDraft().then(() => {
      setMailToCompose(null)
      showSuccessMsg('Your draft was saved!')
    })
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
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="inbox" unreadMailsCount={unreadMailsCount} />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="starred" />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="snoozed" />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="important" />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="sent" />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="drafts" />
				<MenuFilter setSearchPrms={setSearchPrms} {...props} path="trash" />
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
