import { NoteMenuFilter } from "../../../cmps/MenuFilter.jsx";

export function NoteMenu(props){
    return (
        <ul>
            <NoteMenuFilter {...props} path="notes" />
            <NoteMenuFilter {...props} path="text" />
            <NoteMenuFilter {...props} path="image" />
            <NoteMenuFilter {...props} path="todos" />
        </ul>
    )
}