import { Loader } from "../../../cmps/Loader.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    
    document.body.classList.add('dark-mode')

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
        noteService.query(filterBy)
            .then(setNotes)
        return (() => document.body.classList.remove('dark-mode'))
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

    function onToggleTodo(ts, idx, noteId, ){
        const notesBackup = structuredClone(notes)
        const todoToUpdate = notes.find(note => note.id === noteId).info.todos[idx]
        if(todoToUpdate.doneAt) todoToUpdate.doneAt = null
        else todoToUpdate.doneAt = ts
        setNotes(notes => [...notes])
    }

    function onSetStyle(noteId, value, property){
        const notesBackup = structuredClone(notes)

        const noteToUpdate = notes.find(note => note.id === noteId)
        noteToUpdate.style ={...noteToUpdate.style, [property]: value}
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
            />
        </section>
    )
}
