import { showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM

export function NoteEdit({ saveNote }){

    const [note, setNote] = useState(noteService.getEmptyNote)
    const [selectedType, setSelectedType] = useState({
        type: 'NoteTxt',
        placeholder: 'Take a note...',
        infoKey: 'txt',
    })

    const [isOpen, setIsopen] = useState(false)
    const { noteId } = useParams()
    const textAreaRef = useRef()
    const inputRef = useRef()
    
    useEffect(() => {
        if(noteId){
            noteService.get(noteId)
                .then((note) => {
                    onSetType(note.type)
                    return note
                })
                .then(setNote)
                .then(() => setIsopen(true))
        } 

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
        if(!note.info[selectedType.infoKey] && !note.title) {
            showErrorMsg('Cant save empty note')
            return
        }
        note.type = selectedType.type
        if(note.type === 'NoteTodos'){
            const todos = note.info.todos.split(',')
            todos.forEach((todo, idx) => (todos[idx] = {txt: todo, doneAt: null} ))
            note.info.todos = todos
        }
        setIsopen(false)
        saveNote(note)
        setNote(noteService.getEmptyNote)
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

    function onSetType(type){
        switch (type) {
            case 'NoteTxt':
                setSelectedType({type, placeholder: 'Take a note...', infoKey: 'txt'})
                break    
            case 'NoteImg':
                setSelectedType({type, placeholder: 'Enter image url', infoKey:'url'})
                break   
            case 'NoteTodos':
                setSelectedType({type, placeholder: 'Enter a comma seperated list', infoKey:'todos'})
                break   
        }
        setIsopen(true)
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
    const isTypeChange = !isOpen && !note.title ? true : false
    return (
        <form onSubmit={onSaveNote} className="note-edit" >
            <section className="input-container">
            <input
                ref={inputRef}
                value={title}
                className="edit-input" 
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                autoComplete="off"
                onFocus={() => setIsopen(true)} 
                onBlur={onInputBlur}
                />
            {isTypeChange && 
                <section className="noteTypes">
                    <button type="button" onClick={() => onSetType('Notetxt')} className="text" title="Text" ></button>
                    <button type="button" onClick={() => onSetType('NoteImg')} className="image" title="Image" ></button>
                    <button type="button" onClick={() => onSetType('NoteTodos')} className="todos" title="To do list" ></button>
                </section>
            }
            </section>
            { isOpen && <textarea className="edit-input-text" 
                ref={textAreaRef}
                onChange={handleChange}
                value={info.text}
                name={`info.${selectedType.infoKey}`} 
                id="txt" 
                onKeyUp={resizeTextArea}
                placeholder={selectedType.placeholder}>
            </textarea>}
            <button>Save</button>
        </form>
    )
}