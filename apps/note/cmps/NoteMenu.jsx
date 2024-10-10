import { MenuFilter } from "../../../cmps/MenuFilter.jsx";

export function NoteMenu(props){
    
    return (
        <ul>
            <MenuFilter {...props} path="notes" />
            <MenuFilter {...props} path="text" />
            <MenuFilter {...props} path="image" />
            <MenuFilter {...props} path="todos" />
        </ul>
    )
}