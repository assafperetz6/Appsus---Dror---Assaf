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

            <section className="format-btns">
                <div className="flex button-border">
                    <button className="undo"></button>
                    <button className="redo"></button>
                </div>
                {/* <select className="font-select" name="font-select">
                    <option value="sans-serif">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="fixed-width">Fixed Width</option>
                </select> */}

                {/* <label htmlFor="font-size"><span className="font-size"></span></label>
                    <select name="font-size" id="font-size">
                        <option value="small">Small</option>
                        <option value="normal">Normal</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                    </select> */}
                <div className="flex button-border">
                    <button className="bold"></button>
                    <button className="italic"></button>
                    <button className="underline"></button>
                </div>
                {/* <input className="text-color" type="color" /> */}
                {/* <select name="text-align">
                    <option className="format-align-left" value="left"></option>
                    <option className="format-align-center" value="right"></option>
                    <option className="format-align-right" value="center"></option>
                </select> */}
                <div className="flex button-border">
                    <button className="numbered-list"></button>
                    <button className="bulleted-list"></button>
                </div>
                <div className="flex button-border">
                    <button className="indent-less"></button>
                    <button className="indent-more"></button>
                </div>
                {/* <select name="more">
                    <option value="left"><span className="align-left"></span></option>
                    <option value="right"><span className="align-center"></span></option>
                    <option value="center"><span className="align-right"></span></option>
                </select> */}
            </section>

            <section className="mail-actions">
                <div className="send-container flex align-center">
                    <button className="send">Send</button>
                    <button className="send-options"></button>
                </div>

                <div className="main-actions flex align-center">
                    <button className="toggle-format-btns"></button>
                    <button className="attach-file"></button>
                </div>
            </section>
        </section>
    )
}