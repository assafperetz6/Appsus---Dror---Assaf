import { eventBusService } from "../../../services/event-bus.service.js"
import { NoteEdit } from "./NoteEdit.jsx"

const { useNavigate } = ReactRouterDOM
const { useEffect, useRef } = React

export function NoteEditModal(){

    const dialogRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        dialogRef.current.showModal()
        addEventListener('keydown', onEscapeKey)
        
        return (() => {
            removeEventListener('keydown', onEscapeKey)
        })
    }, [])

    function saveNote(note){
        eventBusService.emit('save-edit', note)
        navigate('/note')
    }

    function onEscapeKey(ev){
        if(ev.key === 'Escape') navigate('/note')
    }
    
    return (
        <dialog ref={dialogRef} className="note-edit-modal">
            <NoteEdit saveNote={saveNote} />
        </dialog>
    )
}