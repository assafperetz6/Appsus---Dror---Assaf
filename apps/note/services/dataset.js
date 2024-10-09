import { utilService } from "../../../services/util.service.js";


export const defaultNotes = [
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        title: 'This is a text note',
        info: {
            txt: 'This is the body of the note'
        },
        style: {
            fontSize: '16px'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        title: 'This is a text note',
        info: {
            txt: 'This is the body of the note'
        },
        style: {
            fontSize: '16px'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        title: 'This is a todo list note',
        info: {
            todos:[
                {txt: 'This has been done already', doneAt: Date.now()},
                {txt: 'This hasn\'t', doneAt: null}
            ]
        },
        style: {
            fontSize: '18px'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        title: 'This is an image note',
        info: {
            url: 'https://www.renemagritte.org/assets/img/paintings/the-treachery-of-images.jpg'
        },
        style: {
            backgroundColor: '#835f4e'
        },
    },
]