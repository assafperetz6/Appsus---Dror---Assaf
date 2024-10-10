

export function NotePreview({ note, onRemoveNote, onSetStyle, onToggleTodo }){

    const { style, info } = note
    let fontSize = parseInt(style.fontSize)
    if (!fontSize) fontSize = 16

    return (
        <li style={style} className="note-preview">
            <h2 className="note-title">{note.title}</h2>
            <DynamicNote note={note} info={info} onToggleTodo={onToggleTodo} />
            <section className="actions">
                <button className="delete" onClick={() => onRemoveNote(note.id)}></button>
                <button className="palette">
                    <input onChange={(ev) => onSetStyle(note.id, ev.target.value, 'backgroundColor')} type="color" />
                </button>
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
                    <input type="checkbox" checked={todo.doneAt} onChange={() => onToggleTodo(Date.now(), idx, note.id)} /> 
                    <li>{todo.txt}</li>
                </section>
            )}
        </ul>
    )
}