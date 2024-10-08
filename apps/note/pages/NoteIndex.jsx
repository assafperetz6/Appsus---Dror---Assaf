import { showErrorMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
    
    document.body.classList.add('dark-mode')

    const [notes, setNotes] = useState(null)
    
    useEffect(() => {
        noteService.query()
            .then(setNotes)
        return (() => document.body.classList.remove('dark-mode'))
    }, [])

    function onRemoveNote(noteId){
        const notesBackup = structuredClone(notes)
        setNotes(notes => notes.filter(note => note.id !== noteId))

        noteService.remove(noteId)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem removing note, ID:${noteId}`)
                setNotes(notesBackup)
            })
    }

    function saveNote(note){
        noteService.save(note)
            .then(note => {
                setNotes(prevNotes => [note, ...prevNotes])
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem adding note`)
            })
    }

    if(!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            <NoteEdit saveNote={saveNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
