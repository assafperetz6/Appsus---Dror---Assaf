import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React


export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    
    useEffect(() => {
        noteService.query()
            .then(setNotes)
    }, [])

    if(!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>
    )
}
