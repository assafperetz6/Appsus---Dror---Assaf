import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { demoEmails } from './demo-data.js'

const loggedinUser = {
	mail: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
}

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
	loggedinUser,
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getFilterFromSearchParams,
	getInitUnreadCount,
	debounce,
}

function handleAdvancedFilter(filter, mails) {
	console.log(filter)
	
	for (const key in filter) {
		if (!filter[key]) continue
		if (key === 'label') continue
		
		const regExp = new RegExp(filter[key], 'i')
		if (key === 'txt') mails = mails.filter((mail) => {
			
			return regExp.test(mail.body)
		})
		else mails = mails.filter((mail) => regExp.test(mail[key]))
	}
	
	return mails
}

function query(filterBy = {}) {	
	return storageService.query(MAIL_KEY).then((mails) => {
		if (filterBy.isAdvanced) {
			delete filterBy.isAdvanced
			mails = handleAdvancedFilter(filterBy, mails)
		}
		else if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter((mail) =>
				regExp.test(mail.body) || regExp.test(mail.subject) || regExp.test(mail.from) || regExp.test(mail.to)
			)
		}
		
		return mails
	})
}

function get(mailId) {
	return storageService
		.get(MAIL_KEY, mailId)
		.then((mail) => _setNextPrevMailId(mail))
}

function remove(mailId) {
	// return Promise.reject('Oh No!')
	return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail(sender = loggedinUser.mail, subject = '') {
	return {
        createdAt: Date.now(),
        subject,
        body: '',
        isRead: true,
        isStarred: false,
        isImportant: false,
        labels: [],
        sentAt: null,
        removedAt: null,
        from: sender,
        to: null
    }
}

function getInitUnreadCount() {
	return query()
		.then(mails => mails.reduce((acc, mail) => {
			if (!mail.isRead) acc++
			return acc
		}, 0))
}

// function getDefaultFilter() {
// 	return filterBy = {
// 		status: 'inbox', // /sent/trash/draft
// 		txt: '',
// 		isRead: null,
// 		isStarred: null,
// 		lables: ['important', 'romantic'], // has any of the labels
// 	}
// }

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		mails = demoEmails
		utilService.saveToStorage(MAIL_KEY, mails)
	}
}

function _createMail(sender, subject = 250) {
	const mail = getEmptyMail(sender, subject)
	mail.id = utilService.makeId()
	return mail
}

function getFilterFromSearchParams(searchParams) {
	const isAdvanced = searchParams.get('isAdvanced') || false
	const compose = searchParams.get('compose') || ''
	const txt = searchParams.get('txt') || ''
	const from = searchParams.get('from') || ''
	const to = searchParams.get('to') || ''
	const subject = searchParams.get('subject') || ''
	const isRead = searchParams.get('isRead') || ''
	const isStarred = searchParams.get('isStarred') || ''
	const label = searchParams.get('label') || []

	return { isAdvanced, txt, from, to, subject, isRead, isStarred, label, compose }
}

function _setNextPrevMailId(mail) {
	return query().then((mails) => {
		const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
		const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
		const prevMail = mails[mailIdx - 1]
			? mails[mailIdx - 1]
			: mails[mails.length - 1]
		mail.nextMailId = nextMail.id
		mail.prevMailId = prevMail.id
		return mail
	})
}

function debounce(func, delay) {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			func(...args)
		}, delay)
	}
}
