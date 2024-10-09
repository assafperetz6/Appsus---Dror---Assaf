import { NotePreview } from "./NotePreview.jsx";

export function NoteList(props) {

    return (
        <ul className="note-list">
            {props.notes.map(note =>
                <NotePreview {...props} key={note.id} note={note} />
            )}
        </ul>
    )
}
