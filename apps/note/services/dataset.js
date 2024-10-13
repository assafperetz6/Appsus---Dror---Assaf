import { utilService } from "../../../services/util.service.js";


export const defaultNotes = [
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        pinnedAt: null,
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
        pinnedAt: null,
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
        pinnedAt: null,
        title: 'This is a todo list note',
        info: {
            todos:[
                {txt: 'This has been done already', doneAt: Date.now()},
                {txt: 'This hasn\'t', doneAt: null}
            ]
        },
        style: {
            fontSize: '16px'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        pinnedAt: null,
        title: 'This is an image note',
        info: {
            url: 'https://www.renemagritte.org/assets/img/paintings/the-treachery-of-images.jpg'
        },
        style: {
            fontSize: '16px'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteVideo',
        pinnedAt: null,
        title: 'This is a video noot',
        info: {
            url: 'https://www.youtube.com/watch?v=8cU3qrOikSU'
        },
        style: {
            fontSize: '16px'
        },
    },
]