import { utilService } from "../../../services/util.service.js";


export const defaultNotes = [
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        pinnedAt: null,
        title: 'This is a text note',
        labels: ['Romantic'],
        info: {
            txt: 'This is the body of the note'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        pinnedAt: null,
        title: 'This is a text note',
        labels: [],
        info: {
            txt: 'This is the body of the note'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodos',
        pinnedAt: null,
        title: 'This is a todo list note',
        labels: [],
        info: {
            todos:[
                {txt: 'This has been done already', doneAt: Date.now()},
                {txt: 'This hasn\'t', doneAt: null}
            ]
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        pinnedAt: null,
        title: 'This is an image note',
        labels: [],
        info: {
            url: 'https://www.renemagritte.org/assets/img/paintings/the-treachery-of-images.jpg'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteVideo',
        pinnedAt: null,
        title: 'This is a video noot',
        labels: [],
        info: {
            url: 'https://www.youtube.com/watch?v=8cU3qrOikSU'
        },
    },
]