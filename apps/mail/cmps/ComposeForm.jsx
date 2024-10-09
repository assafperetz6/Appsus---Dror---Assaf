import { ComposeBody } from './ComposeBody.jsx'

export function ComposeForm({ onMinimizeCompose, isMinimized }) {

    return (
        <section className="compose-form-container">
            <h4 onClick={onMinimizeCompose}>New Message</h4>
            <section className="window-actions">
                <button className="minimize" onClick={onMinimizeCompose}></button>
                <button className="fullscreen"></button>
                <button className="close"></button>
            </section>
            {isMinimized && <ComposeBody/>}
        </section>
    )
}