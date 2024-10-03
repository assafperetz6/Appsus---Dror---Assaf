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
	debounce,
}

function query(filterBy = {}) {
	return storageService.query(MAIL_KEY).then((mails) => {
		if (filterBy.sender) {
			const regExp = new RegExp(filterBy.sender, 'i')
			mails = mails.filter((mail) => regExp.test(mail.sender))
		}
		if (filterBy.subject) {
			mails = mails.filter((mail) => mail.subject >= filterBy.subject)
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

function getEmptyMail(sender = '', subject = '') {
	return { sender, subject }
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
	const status = searchParams.get('status') || ''
	const txt = searchParams.get('txt') || ''
	const isRead = searchParams.get('isRead') || ''
	const isStarred = searchParams.get('isStarred') || ''
	const lables = searchParams.get('lables') || ''

	return {
		status: status,
		txt: txt,
		isRead: isRead,
		isStarred: isStarred,
		lables: ['important', 'romantic']
	}
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
