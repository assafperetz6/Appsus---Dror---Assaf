const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { ComposeForm } from './ComposeForm.jsx'

export function MailMenu({ setMarkedFolder, setSearchPrms }) {
  const [newMail, setNewMail] = useState(null)
  const [mailData, setMailData] = useState({})
  const [isMinimized, setIsMinimized] = useState(null)
  
  useEffect(() => {
    getMailData()
  }, [])

  function onComposeMail() {

  }

  function onMinimizeCompose() {
		setIsMinimized(!isMinimized)
	}

  function getMailData() {
    return mailService.query().then((mails) =>
        mails.reduce((acc, mail) => {
            if (!mail.isRead) acc.unread++
            if (mail.isStarred) acc.starred++
            if (mail.isImportant) acc.important++
            return acc
        }, { unread: 0, starred: 0, important: 0 })
    ).then(setMailData)
  }
  
  return (
    <React.Fragment>
      <button className="compose">Compose</button>

      <ul className="filter-folders clean-list">
        <li>
          <button
            className={`inbox ${setMarkedFolder("inbox")}`}
            onClick={() => setSearchPrms({ status: "inbox" })}
          >
            Inbox
            <span className="mail-counter">{mailData.unread}</span>
          </button>
        </li>
        <li>
          <button
            className={`starred ${setMarkedFolder("starred")}`}
            onClick={() => setSearchPrms({ status: "starred" })}
          >
            Starred
            <span className="mail-counter"></span>
          </button>
        </li>
        <li>
          <button
            className={`snoozed ${setMarkedFolder("snoozed")}`}
            onClick={() => setSearchPrms({ status: "snoozed" })}
          >
            Snoozed
            <span className="mail-counter"></span>
          </button>
        </li>
        <li>
          <button
            className={`important ${setMarkedFolder("important")}`}
            onClick={() => setSearchPrms({ status: "important" })}
          >
            Important
            <span className="mail-counter"></span>
          </button>
        </li>
        <li>
          <button
            className={`sent ${setMarkedFolder("sent")}`}
            onClick={() => setSearchPrms({ status: "sent" })}
          >
            Sent
            <span className="mail-counter"></span>
          </button>
        </li>
        <li>
          <button
            className={`drafts ${setMarkedFolder("drafts")}`}
            onClick={() => setSearchPrms({ status: "drafts" })}
          >
            Drafts
            <span className="mail-counter"></span>
          </button>
        </li>
        <li>
          <button
            className={`trash ${setMarkedFolder("trash")}`}
            onClick={() => setSearchPrms({ status: "trash" })}
            >
            trash
            <span></span>
          </button>
        </li>
        <li>
          <button className="see-more">
            More
            <span></span>
          </button>
        </li>
      </ul>
    <ComposeForm onMinimizeCompose={onMinimizeCompose} isMinimized={isMinimized}/>
    </React.Fragment>
  )
}
