

export function ColorPicker({ onSetStyle, noteId, pickedColor }){

    const lightModeColors = [
        '#ecb3a9',
        '#e3a47a',
        '#fdf8bc',
        '#e6f5d5',
        '#bedbd3',
        '#d8e3ec',
        '#b6cbdb',
        '#cfc0da',
        '#f2e3dd',
        '#e8e3d5',
        '#efeff1'
    ]

    const darkModeColors = [
        '#6a232f',
        '#5f301a',
        '#734d11',
        '#324c3c',
        '#31605d',
        '#3b6176',
        '#304154',
        '#43305a',
        '#633d4f',
        '#49443b',
        '#232427',
    ]

    const colors = document.body.classList.contains('dark-mode') ? [...darkModeColors] : [...lightModeColors]
    const noColorClass = !pickedColor ? 'picked' : ''

    return (
        <section className="color-picker">
            <button className={`no-color ${noColorClass}`} onClick={() => onSetStyle(noteId, '')}></button> 
            {colors.map((color, idx) => 
                <button className={color === pickedColor ? 'picked' : ''} onClick={() => onSetStyle(noteId, color)} key={idx} style={{backgroundColor: color}}></button>
            )}
        </section>
    )
}