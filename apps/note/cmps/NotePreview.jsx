

export function NotePreview({ note, onRemoveNote }){

    const { style, info } = note
    const iconClass = 'material-symbols-outlined'

    return (
        <li style={style} className="note-preview">
            <h2 className={"note-title"}>{note.title}</h2>
            <p>{info.txt}</p>
            <button onClick={() => onRemoveNote(note.id)}><span className={iconClass}>delete</span></button>
        </li>
    )
}