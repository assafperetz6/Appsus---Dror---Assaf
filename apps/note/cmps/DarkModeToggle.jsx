

export function DarkModeToggle(){

    return (
        <section className="dark-mode-toggle">
            <button onClick={() => document.body.classList.toggle('dark-mode')}></button>
        </section>
    )
}