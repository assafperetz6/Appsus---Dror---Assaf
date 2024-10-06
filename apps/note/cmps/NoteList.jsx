import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    return (
        <ul className="note-list">
            {notes.map(note =>
                <NotePreview onRemoveNote={onRemoveNote} key={note.id} note={note} />
            )}
        </ul>
    )
}
