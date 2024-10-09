

export function NotePreview({ note, onRemoveNote, onSetStyle }){

    const { style, info } = note
    const fontSize = parseInt(style.fontSize)

    return (
        <li style={style} className="note-preview">
            <h2 className={"note-title"}>{note.title}</h2>
            <p>{info.txt}</p>
            <section className="actions">
                <button className="delete" onClick={() => onRemoveNote(note.id)}></button>
                <button className="palette">
                    <input onChange={(ev) => onSetStyle(note.id, ev.target.value, 'backgroundColor')} type="color" />
                </button>
                <button onClick={() => onSetStyle(note.id, fontSize + 2 + 'px', 'fontSize')} className="font-size-up"></button>
                <button onClick={() => onSetStyle(note.id, fontSize - 2 + 'px', 'fontSize')} className="font-size-down"></button>
            </section>
        </li>
    )
}