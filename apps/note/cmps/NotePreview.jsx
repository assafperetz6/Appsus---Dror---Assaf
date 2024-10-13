const { useState } = React
const { Link } = ReactRouterDOM

import { ColorPicker } from "./ColorPicker.jsx"
import { LabelPicker } from "./LabelPicker.jsx"

export function NotePreview({ note, onRemoveNote, onSetStyle, onToggleTodo, onDuplicateNote, onTogglePinned, onToggleLabel }){

    const [openMenu, setOpenMenu] = useState(null)

    const { style, info } = note
    let fontSize = parseInt(style.fontSize)
    if (!fontSize) fontSize = 16

    function onSetOpenMenu(menu){
        setOpenMenu(() => menu === openMenu ? null : menu)
    }

    return (
        <li style={style} className="note-preview">
            <h2 className="note-title">{note.title}</h2>
            <DynamicNote note={note} info={info} onToggleTodo={onToggleTodo} />
            <section className="actions">
                <button className="delete" onClick={() => onRemoveNote(note.id)} title="Delete note" ></button>
                <button onClick={() => onSetOpenMenu('colors')} className="palette" title="Change background color"></button>
                {openMenu === 'colors' && <ColorPicker onSetStyle={onSetStyle} noteId={note.id} pickedColor={style.backgroundColor} />}
                <button onClick={() => onDuplicateNote(note.id)} className="duplicate" title="Duplicate note"></button>
                <Link to={`/note/edit/${note.id}`}><button className="edit"></button></Link>
                <button onClick={() => onSetOpenMenu('labels')} className="add-label" title="Change background color"></button>
                {openMenu === 'labels' && <LabelPicker onToggleLabel={onToggleLabel} noteId={note.id} pickedLabels={note.labels} />}
            </section>
            <button className={`pin-btn ${note.pinnedAt && 'pinned'}`} onClick={() => onTogglePinned(note.id)}></button>
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
        case 'NoteVideo':
            return <NoteVideo {...props} />    
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
                    <button className={todo.doneAt ? 'checked' : 'unchecked'} onClick={() => onToggleTodo(note.id, idx)}></button>
                    <li className={todo.doneAt ? 'checked' : 'unchecked'} onClick={() => onToggleTodo(note.id, idx)}>{todo.txt}</li>
                </section>
            )}
        </ul>
    )
}

function NoteVideo({ info }){

    const url = info.url.split('watch?v=').join('embed/')
    
    return (
        <iframe className="note-video" src={url} frameBorder="0"></iframe>
    )
}