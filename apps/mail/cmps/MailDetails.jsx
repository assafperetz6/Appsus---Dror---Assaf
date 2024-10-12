// import { mailService } from "../services/mail.service"

export function MailDetails() {
    return (
        <article className="details-container">
            <section className="actions-pagintation">
				<section className="details-actions">
					<button className="go-back"></button>

					<div className="flex space-evenly">
                        <button className='archive'></button>
                        <button className='report'></button>
                        <button className='trash'></button>
                    </div>
					<div className="flex space-evenly">
                        <button className='mail-unread'></button>
                        <button className='move-to'></button>
                    </div>
				</section>

				<section className="info-pagination flex">
					<div className="shown-mails">1-50 of 2,000</div>
					<button>
						<span className="material-symbols-outlined">chevron_left</span>
					</button>
					<button>
						<span className="material-symbols-outlined">chevron_right</span>
					</button>
				</section>
            </section>

            <section className="details-header">
                <h2 className="subject">PlaceHolder</h2>
                <button className="important"></button>
            </section>

            <section className="mail-info">
                <div className="img-container"><img className="profile-pic" src="../../assets/img/unknown-profile.png" alt="" /></div>
                <table className="flex">
                    <tbody className="mail-content">
                        <tr>
                            <td className="sender-address"><h3>placeholder@gmail.com</h3></td>
                            <td className="sent-at"><span>Oct 9, 2024, 4:52PM (3 days ago)</span></td>
                            <td><button className="starred"></button></td>
                            <td><button className="reply"></button></td>
                        </tr>
                        <tr><td><h6>to me</h6></td></tr>
                        <tr className="mail-body"><td>Actual Mail body</td></tr>
                        <tr className="reply-actions">
                            <td><button className="reply">Reply</button></td>
                            <td><button className="forward">Forward</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </article>
    )
}