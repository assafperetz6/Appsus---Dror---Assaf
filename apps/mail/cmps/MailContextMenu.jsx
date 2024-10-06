export function MailContextMenu({ cursorCoords, selectedMail, onDeleteMail, onLabelAs, onMarkAsRead, onMoveTo }) {

    return (
        <ul className="context-menu clean-list" style={cursorCoords}>
            <li onClick={() => console.log('Deleted!', selectedMail.id)}>Delete</li>
            <li onClick={() => console.log('Read')}>Mark as read</li>
            <li className="label-menu">Label as
                <ul className="clean-list second-list">
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'Critical')}>Critical</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Family</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Work</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Friends</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Spam</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Memories</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs()}>Romantic</button>
                    </li>
                </ul>
            </li>
            <li onClick={() => console.log('Moved!')}>Move to</li>
        </ul>
    )
}