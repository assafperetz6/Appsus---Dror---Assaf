import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React


export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    
    useEffect(() => {
        noteService.query()
            .then(setNotes)
    }, [])

    function onRemoveNote(noteId){
        const notesBackup = [...notes]
        setNotes(notes => notes.filter(note => note.id !== noteId))

        noteService.remove(noteId + 5)
            .catch(err => {
                console.log(err)
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
