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
            txt: 'And this is the body of the note.'
        },
        style: {},
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        pinnedAt: null,
        title: 'This is another text note',
        labels: [],
        info: {
            txt: 'And this one has a different background color! You can change it anytime.'
        },
        style: {
            backgroundColor: '#ecb3a9'
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
                {txt: 'This task has been done already', doneAt: Date.now()},
                {txt: 'This one hasn\'t', doneAt: null}
            ]
        },
        style: {
            backgroundColor: '#e3a47a'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        pinnedAt: null,
        title: 'This is an image note, (or is it?)',
        labels: [],
        info: {
            url: 'https://www.renemagritte.org/assets/img/paintings/the-treachery-of-images.jpg'
        },
        style: {
            backgroundColor: '#fdf8bc'
        },
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteVideo',
        pinnedAt: null,
        title: 'And this is a video noot',
        labels: [],
        info: {
            url: 'https://www.youtube.com/watch?v=8cU3qrOikSU'
        },
        style: {
            backgroundColor: '#e6f5d5'
        },
    },
]