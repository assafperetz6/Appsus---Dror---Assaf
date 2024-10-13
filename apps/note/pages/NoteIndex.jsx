import { Loader } from "../../../cmps/Loader.jsx"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams, Outlet } = ReactRouterDOM

export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    
    useEffect(() => {
        setFilterBy(noteService.getFilterFromSearchParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
    }, [filterBy])

    useEffect(() => {
        document.body.classList.add('dark-mode')
        const unsubscribe = eventBusService.on('save-edit' ,(note) => {
            noteService.save(note)
                .then(noteService.query)
                .then(setNotes)
        })    
        noteService.query(filterBy)
            .then(setNotes)
        return (() => {
            document.body.classList.remove('dark-mode')
            unsubscribe()
        })
    }, [])


    function onRemoveNote(noteId){
        const notesBackup = structuredClone(notes)
        setNotes(notes => notes.filter(note => note.id !== noteId))

        noteService.remove(noteId)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem removing note, ID:${noteId}`)
                setNotes(notesBackup)
            })
    }

    function onToggleTodo(noteId, idx){
        const notesBackup = structuredClone(notes)
        const noteToUpdate = notes.find(note => note.id === noteId)
        const todoToUpdate = noteToUpdate.info.todos[idx]
        todoToUpdate.doneAt = todoToUpdate.doneAt ? null : Date.now()
        setNotes(notes => [...notes])
        noteService.save(noteToUpdate)
         .catch(err => {
             console.log(err)
             showErrorMsg(`Problem editing note, ID:${noteId}`)
             setNotes(notesBackup)
         })    
    }

    function onTogglePinned(noteId){
        const noteToUpdate = notes.find(note => note.id === noteId)
        noteToUpdate.pinnedAt = noteToUpdate.pinnedAt ? null : Date.now()
        notes.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : (b.createdAt < a.createdAt) ? -1 : 0)
        notes.sort((a, b) => (a.pinnedAt < b.pinnedAt) ? 1 : (b.pinnedAt < a.pinnedAt) ? -1 : 0)
        setNotes([...notes])
        noteService.save(noteToUpdate)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem pinning note, ID:${noteId}`)
            })    
    }

    function onSetStyle(noteId, value){
        const notesBackup = structuredClone(notes)

        const noteToUpdate = notes.find(note => note.id === noteId)
        noteToUpdate.style ={...noteToUpdate.style, backgroundColor: value}
        setNotes(notes => [...notes])
        
        noteService.save(noteToUpdate)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem editing note, ID:${noteId}`)
                setNotes(notesBackup)
            })
    }

    function onDuplicateNote(noteId){
        const noteToDuplicate = structuredClone(notes.find(note => note.id === noteId))

        noteToDuplicate.id = ''
        noteToDuplicate.createdAt = Date.now()
        noteService.save(noteToDuplicate)
            .then(updatedNote => {
                setNotes(prevNotes => [updatedNote, ...prevNotes])
                showSuccessMsg('Note duplicated succesfully')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem duplicating note`)
            })
    }

    function onToggleLabel(noteId, label){
        const noteToUpdate = notes.find(note => note.id === noteId)
        const idx = noteToUpdate.labels.indexOf(label)
        if(idx === -1) noteToUpdate.labels.push(label)
        else noteToUpdate.labels.splice(idx, 1)
        setNotes(notes => [...notes])
        
        noteService.save(noteToUpdate)
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem editing note, ID:${noteId}`)
                setNotes(notesBackup)
            })
    }

    function saveNote(note){
        noteService.save(note)
            .then(note => {
                setNotes(prevNotes => [note, ...prevNotes])
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem adding note`)
            })
    }

    if(!notes) return <Loader />
    return (
        <section className="note-index">
            <NoteEdit saveNote={saveNote} />
            <NoteList 
                onToggleTodo={onToggleTodo} 
                onSetStyle={onSetStyle} 
                notes={notes} 
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onTogglePinned={onTogglePinned}
                onToggleLabel={onToggleLabel}
            />
            <Outlet />
        </section>
    )
}
