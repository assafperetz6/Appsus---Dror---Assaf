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
    // {
    //     id: utilService.makeId(),
    //     createdAt: Date.now(),
    //     type: 'NoteTodo',
    //     isPinned: false,
    //     title: 'This is a todo list note',
    //     info: {
    //         todos:[
    //             {txt: 'This has been done already', doneAt: Date.now()},
    //             {txt: 'This hasn\'t', doneAt: null}
    //         ]
    //     },
    //     style: {
    //         backgroundColor: '#000',
    //         fontSize: '16px'
    //     },
    // },
    // {
    //     id: utilService.makeId(),
    //     createdAt: Date.now(),
    //     type: 'NoteImg',
    //     isPinned: false,
    //     title: 'This is an image note',
    //     info: {
    //         url: 'https://www.ucpress.edu/_next/image?url=https%3A%2F%2Fwebfiles.ucpress.edu%2Fcoverimage%2Fisbn13%2F9780520236943.jpg&w=640&q=90'
    //     },
    //     style: {
    //         backgroundColor: '#00d'
    //     },
    // },
]