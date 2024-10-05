import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    noteService.query()

    return <div>note app</div>
}
