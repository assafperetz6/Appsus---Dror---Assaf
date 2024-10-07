import { showErrorMsg } from "../../../services/event-bus.service.js"
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
        const notesBackup = [...notes]
        setNotes(notes => notes.filter(note => note.id !== noteId))

        noteService.remove(noteId)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem removing note, ID:${noteId}`)
                setNotes(notesBackup)
            })
    }

    if(!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
