

export function NotePreview({ note }){

    const { style, info } = note

    return (
        <li style={style} className="note-preview">
            <h2 className="note-title">{note.title}</h2>
            <p>{info.txt}</p>
        </li>
    )
}