export function FilterByLabel({ setMarkedFolder, onSelectLabel }) {
    return (
        <section className="label-container">
        <div className="flex space-between">
            <h3>Labels</h3>
            <button className="add-label" onClick={() => console.log('New label added')}></button>
        </div>

        <ul className="label-list clean-list">
        <li>
            <button className={`label ${setMarkedFolder('critical')}`} onClick={() => onSelectLabel('critical')}>Critical</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('family')}`} onClick={() => onSelectLabel('family')}>Family</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('work')}`} onClick={() => onSelectLabel('work')}>Work</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('friends')}`} onClick={() => onSelectLabel('friends')}>Friends</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('spam')}`} onClick={() => onSelectLabel('spam')}>Spam</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('memories')}`} onClick={() => onSelectLabel('memories')}>Memories</button>
        </li>
        <li>
            <button className={`label ${setMarkedFolder('romantic')}`} onClick={() => onSelectLabel('romantic')}>Romantic</button>
        </li>
        </ul>
    </section>
    )
}