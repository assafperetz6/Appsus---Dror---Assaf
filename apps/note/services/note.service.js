import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { defaultNotes } from './dataset.js'



const NOTE_KEY = 'note'
_createNotes()

export const noteService = {
	query,
	get,
	remove,
	save,
	getEmptyNote,
	getFilterFromSearchParams,
	debounce,
}

function query(filterBy = {}) {
	return storageService.query(NOTE_KEY).then((notes) => {
		if(filterBy.status){
			notes = notes.filter(note => note.type === _getTypeFromStatus(filterBy.status))
		}
        notes.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : (b.createdAt < a.createdAt) ? -1 : 0)
        notes.sort((a, b) => (a.pinnedAt < b.pinnedAt) ? 1 : (b.pinnedAt < a.pinnedAt) ? -1 : 0)
		return notes
	})
}

function get(noteId) {
	return storageService.get(NOTE_KEY, noteId)
		// .then((note) => _setNextPrevNoteId(note))
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
	if (note.id) {
		return storageService.put(NOTE_KEY, note)
	} else {
		return storageService.post(NOTE_KEY, note)
	}
}

function getEmptyNote() {
	return { 
			createdAt: Date.now(),
			title: '', 
			info: {}, 
			style: {},
			pinnedAt: false,
			type: 'NoteTxt',
		}
}

function _createNotes() {
	let notes = utilService.loadFromStorage(NOTE_KEY)
	if (!notes || !notes.length) {
		notes = defaultNotes
		utilService.saveToStorage(NOTE_KEY, notes)
	}
}

function getFilterFromSearchParams(searchParams) {
	const status = searchParams.get('status') || ''
	if(status === 'notes') return {}

	return {
		status,
	}
}

function _setNextPrevNoteId(note) {
	return query().then((notes) => {
		const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
		const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
		const prevNote = notes[noteIdx - 1]
			? notes[noteIdx - 1]
			: notes[notes.length - 1]
		note.nextNoteId = nextNote.id
		note.prevNoteId = prevNote.id
		return note
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

function _getTypeFromStatus(status){
	switch (status) {
		case 'text':
			return 'NoteTxt'			
		case 'image':
			return 'NoteImg'			
		case 'todos':
			return 'NoteTodos'			
		}
}