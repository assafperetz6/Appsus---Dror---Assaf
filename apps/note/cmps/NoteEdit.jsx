import { showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteEdit({ saveNote }){

    const [note, setNote] = useState(noteService.getEmptyNote)
    const [isOpen, setIsopen] = useState(false)
    const textAreaRef = useRef()
    const inputRef = useRef()
    
    useEffect(() => {
        addEventListener('keydown', onEscapeKey)
        
        return (() => {
            removeEventListener('keydown', onEscapeKey)
        })
    }, [])
    
    function onEscapeKey(ev){
        if(ev.key === 'Escape') setIsopen(false)
    }
    
    function onSaveNote(ev){
        ev.preventDefault()
        if(!note.info.txt && !note.title) {
            showErrorMsg('Cant save empty note')
            return
        }
        saveNote(note)
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
    
    function onInputBlur(ev){
        if (ev.relatedTarget === textAreaRef.current || ev.relatedTarget === inputRef.current) return
        setIsopen(false)
    }
        
    const  { title, info } = note
    return (
        <form onSubmit={onSaveNote} className="note-add" onFocus={() => setIsopen(true)} onBlur={onInputBlur}>
            <input
                ref={inputRef}
                value={title}
                className="add-input" 
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                autoComplete="off"
             />
            { isOpen && <textarea className="add-input-text" 
                ref={textAreaRef}
                onChange={handleChange}
                value={info.text}
                name="info.txt" 
                id="txt" 
                onKeyUp={resizeTextArea}
                placeholder="Take a note...">
            </textarea>}
            <button>Save</button>
        </form>
    )
}