const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg, updateUnreadCount, composeReply } from '../../../services/event-bus.service.js'
import { Loader } from '../../../cmps/Loader.jsx'

export function MailDetails() {
	const [mail, setMail] = useState(null)
    const navigate = useNavigate()
	const { mailId } = useParams()
    const { mail: loggedinUser } = mailService.loggedinUser

	useEffect(() => {
		if (mailId) loadMail()
	}, [])

	function loadMail() {
		mailService
			.get(mailId)
			.then(setMail)
			.catch((err) => {
				console.log('Problem getting mail', err)
				navigate('/mail')
			})
	}

    function formatTimestamp(timestamp) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        }
        return new Date(timestamp).toLocaleString('en-US', options)
    }

    function emitUnreadCount() {
		return updateUnreadCount(
			mailService.query().then(mails => mails.reduce((acc, mail) => {
				if (!mail.isRead) acc++
				return acc
			}, 0)
		))
	}

    function onRemoveMail(mailId) {
        const mailToRemove = structuredClone(mail)

		if (mailToRemove.removedAt) {
			mailService
				.remove(mailId)
				.then(() => {
					showSuccessMsg(`mail removed successfully!`)
				})
				.catch((err) => {
					console.log('Problems removing mail:', err)
					showErrorMsg(`Problems removing mail (${mailId})`)
				})
                .finally(() => navigate('/mail'))
                
		} else {
			mailToRemove.removedAt = Date.now()
            
			mailService
				.save(mailToRemove)
				.then(() => showSuccessMsg(`mail moved to trash`))
				.catch((err) => {
					console.log('Err: ', err)
					showErrorMsg(`Problems adding mail to folder (${mailId})`)
				})
                .finally(() => navigate('/mail'))
		}
	}

    function onChangeMailStatus(mail, status) {
		const mailBackup = structuredClone(mail)

		if (status === 'starred') mail.isStarred = !mail.isStarred
		else if (status === 'important')
			mail.isImportant = !mail.isImportant

		else if (status === 'unread') {
			mail.isRead = false
		}

		setMail(mail => ({ ...mail }))

		mailService.save(mail)
			.then(() => {
				if (status === 'unread') navigate('/mail')
			})
			.catch((err) => {
				console.log('Err: ', err)
				showErrorMsg(`Problems adding mail to folder (${mail.id})`)
				setMail(mailBackup)
		})
	}
    
	function onLabelAs(mail, label) {
		if (mail.labels.includes(label)) return

		const mailBackup = structuredClone(mail)
		selectedMail.labels.push(label)

		setMail(mail => ({ ...mail }))

		mailService.save(selectedMail).catch((err) => {
			console.log('Err: ', err)
			showErrorMsg(`Problems adding label (${mail.id})`)
			setMails(mailsBackup)
		})
	}

	function onMarkSpam() {
		const mailToMark = mail
		if (mailToMark.labels.includes('spam')) {
			showSuccessMsg('Mail already marked as spam')
			return
		}

		const mailBackup = structuredClone(mailToMark)
		
		mailToMark.labels.push('spam')
		mailService.save(mailToMark)
			.then(() => {
				navigate('/mail')
				showSuccessMsg('Conversation marked as spam')
			})
			.catch((err) => {
				console.log('Err: ', err)
				showErrorMsg(`Problems marking as spam (${mailToMark.id})`)
				setMail(mailBackup)
		})
	}

    if (!mail) return <Loader/>

	const { subject, body, isStarred, isImportant, sentAt, from, to } = mail
	return (
		<article className="details-container">
			<section className="actions-pagintation">
				<section className="details-actions">
					<button className="go-back" onClick={() => navigate('/mail')}></button>

					<div className="flex space-evenly">
						<button className="archive"></button>
						<button className="report" onClick={onMarkSpam}></button>
						<button className="trash" onClick={onRemoveMail}></button>
					</div>
					<div className="flex space-evenly">
						<button className="mail-unread" onClick={() => onChangeMailStatus(mail, 'unread')}></button>
						<button className="move-to"></button>
					</div>
				</section>

				<section className="info-pagination flex">
					<div className="shown-mails">1-50 of 2,000</div>
					<button className="prev-mail"></button>
					<button className="next-mail"></button>
				</section>
			</section>

			<section className="details-header">
				<h2 className="subject">{subject}</h2>
				<button className={`important ${mail.isImportant ? 'marked' : ''}`} onClick={() => onChangeMailStatus(mail, 'important')}></button>
			</section>

			<section className="mail-info">
				<div className="img-container">
					<img
						className="profile-pic"
						src="../../assets/img/unknown-profile.png"
						alt=""
					/>
				</div>
				<table className="flex">
					<tbody className="mail-content">
						<tr>
							<td className="sender-address">
								<h3>{from}</h3>
							</td>
							<td className="sent-at">
								<div>{formatTimestamp(sentAt)}</div>
							</td>
							<td>
								<button className={`starred ${mail.isStarred ? 'marked' : ''}`} onClick={() => onChangeMailStatus(mail, 'starred')}></button>
							</td>
							<td>
								<button className="reply"></button>
							</td>
						</tr>
						<tr>
							<td>
								<h6>to {to === loggedinUser ? 'me' : to}</h6>
							</td>
						</tr>
						<tr className="mail-body">
							<td>{body}</td>
						</tr>
						<tr className="reply-actions">
							<td>
								<button className="reply" onClick={() => composeReply(mail)}>Reply</button>
							</td>
							<td>
								<button className="forward">Forward</button>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</article>
	)
}