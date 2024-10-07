export function MailContextMenu({ cursorCoords, selectedMail, onRemoveMail, onLabelAs, onMarkAsRead, onMoveTo }) {

    return (
        <ul className="context-menu clean-list" style={cursorCoords}>
            <li onClick={() => onRemoveMail(selectedMail.id)}>Delete</li>
            <li onClick={() => console.log('Read')}>Mark as read</li>
            <li className="label-menu">Label as
                <ul className="clean-list second-list">
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'critical')}>Critical</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'family')}>Family</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'work')}>Work</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'friends')}>Friends</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'spam')}>Spam</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'memories')}>Memories</button>
                    </li>
                    <li>
                        <button onClick={() => onLabelAs(selectedMail, 'romantic')}>Romantic</button>
                    </li>
                </ul>
            </li>
            <li onClick={() => console.log('Moved!')}>Move to</li>
        </ul>
    )
}