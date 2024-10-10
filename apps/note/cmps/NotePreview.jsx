

export function NotePreview({ note, onRemoveNote, onSetStyle, onToggleTodo, onDuplicateNote }){

    const { style, info } = note
    let fontSize = parseInt(style.fontSize)
    if (!fontSize) fontSize = 16

    return (
        <li style={style} className="note-preview">
            <section>
                <h2 className="note-title">{note.title}</h2>
                <DynamicNote note={note} info={info} onToggleTodo={onToggleTodo} />
            </section>
            <section className="actions">
                <button className="delete" onClick={() => onRemoveNote(note.id)} title="Delete note" ></button>
                <button className="palette" title="Change background color">
                    <input onChange={(ev) => onSetStyle(note.id, ev.target.value, 'backgroundColor')} type="color" />
                </button>
                <button onClick={() => onDuplicateNote(note.id)} className="duplicate" title="Duplicate note"></button>
            </section>
        </li>
    )
}

function DynamicNote(props){
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />    
        case 'NoteImg':
            return <NoteImg {...props} />    
        case 'NoteTodos':
            return <NoteTodos {...props} />    
    }
}

function NoteTxt({ info }){
    
    return (
            <p>{info.txt}</p>
    )
}

function NoteImg({ info }) {
    return (
        <section>
          <img src={info.url} alt="note-img" />
        </section>
    )
}

function NoteTodos({ note, info, onToggleTodo }){
    return (
        <ul className="todos-note">
            {info.todos.map((todo, idx) =>
                <section key={idx} className="todo">
                    <button className={todo.doneAt ? 'checked' : 'unchecked'} onClick={() => onToggleTodo(Date.now(), idx, note.id)}></button>
                    <li className={todo.doneAt ? 'checked' : 'unchecked'} onClick={() => onToggleTodo(Date.now(), idx, note.id)}>{todo.txt}</li>
                </section>
            )}
        </ul>
    )
}