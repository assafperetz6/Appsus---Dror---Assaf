

export function LabelPicker({ onToggleLabel, noteId, pickedLabels }){

    const labels = [
        'Critical',
        'Family',
        'Work',
        'Friends',
        'Spam',
        'Memories',
        'Romantic',
    ]

    return (
        <section className="label-picker">
            {labels.map((label, idx) => 
                <section key={idx}>
                    <span className={`label ${pickedLabels.includes(label) ? 'picked' : ''}`}></span>
                    <button onClick={() => onToggleLabel(noteId, label)} className={`${pickedLabels.includes(label) ? 'picked' : ''}`}>{label}</button>
                </section>
            )}
        </section>
    )
}