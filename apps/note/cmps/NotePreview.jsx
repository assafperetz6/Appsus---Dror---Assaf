

export function NotePreview({ note, onRemoveNote, onSetColor }){

    const { style, info } = note

    return (
        <li style={style} className="note-preview">
            <h2 className={"note-title"}>{note.title}</h2>
            <p>{info.txt}</p>
            <section className="actions">
                <button className="delete" onClick={() => onRemoveNote(note.id)}></button>
                <button className="palette">
                    <input onChange={(ev) => onSetColor(note.id, ev.target.value)} type="color" />
                </button>
            </section>
        </li>
    )
}