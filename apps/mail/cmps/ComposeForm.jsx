import { Input } from '../../../cmps/Inputs.jsx'

export function ComposeForm() {
    return (
        <section className="compose-form-container">
            <h4>New Message</h4>
            <section className="window-actions">
                <button className="minimize"></button>
                <button className="fullscreen"></button>
                <button className="close"></button>
            </section>

            <form>
                <label htmlFor="recipient"></label>
                <input id="recipient" className="recipient" type="text" placeholder="Recipients" />

                <label htmlFor="subject"></label>
                <input id="subject" className="subject" type="text" placeholder="Subject" />

                <label htmlFor="mail-body"></label>
                <input id="mail-body" className="mail-body" type="text" />
            </form>

            <section className="text-edit-actions">
                <button>i</button>
                <button>i</button>
                <button>i</button>
            </section>

            <section className="mail-actions">
                <button className="send">Send</button>
                <button>Attach</button>
                <button>Something</button>
            </section>
        </section>
    )
}