import { NoteMenuFilter } from "../../../cmps/MenuFilter.jsx";
const { Link } = ReactRouterDOM

export function NoteMenu(props){
    return (
        <ul>
            <NoteMenuFilter {...props} Link={Link} path="notes" />
            <NoteMenuFilter {...props} Link={Link} path="text" />
            <NoteMenuFilter {...props} Link={Link} path="image" />
            <NoteMenuFilter {...props} Link={Link} path="todos" />
        </ul>
    )
}