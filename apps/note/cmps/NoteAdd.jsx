import { showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

const { useState } = React
const { useLocation } = ReactRouterDOM

export function NoteAdd({ onAddNote }){

    const [note, setNote] = useState(noteService.getEmptyNote)
    const loc = useLocation()

    function onSaveNote(ev){
        ev.preventDefault()
        if(!note.info.txt && !note.title) {
            showErrorMsg('Cant save empty note')
            return
        }
        onAddNote(note)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        if(field.startsWith('info')) {
            handleInfoChange(field, value)
            return
        }
        setNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function handleInfoChange(field, value){
        field = field.split('.')[1]
        const info = {...note.info, [field]: value}
        setNote(prevNote => ({ ...prevNote, info }))
    }

    function resizeTextArea({ target }){
        target.style.height = "1px";
        target.style.height = (target.scrollHeight)+"px"
    }
    const  { title, info } = note

    return (
        <form onSubmit={onSaveNote} className="note-add">
            <input
                value={title}
                className="add-input" 
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                autoComplete="off"
             />
            <textarea className="add-input-text" 
                onChange={handleChange}
                value={info.text}
                name="info.txt" 
                id="txt" 
                onKeyUp={resizeTextArea}
                placeholder="Take a note...">
            </textarea>
            <button>Close</button>
        </form>
    )
}