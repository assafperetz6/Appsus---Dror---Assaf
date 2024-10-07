export function MailMenu({ setMarkedFolder, setSearchPrms }) {
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
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button
            className={`starred ${setMarkedFolder("starred")}`}
            onClick={() => setSearchPrms({ status: "starred" })}
          >
            Starred
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button
            className={`snoozed ${setMarkedFolder("snoozed")}`}
            onClick={() => setSearchPrms({ status: "snoozed" })}
          >
            Snoozed
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button
            className={`important ${setMarkedFolder("important")}`}
            onClick={() => setSearchPrms({ status: "important" })}
          >
            Important
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button
            className={`sent ${setMarkedFolder("sent")}`}
            onClick={() => setSearchPrms({ status: "sent" })}
          >
            Sent
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button
            className={`drafts ${setMarkedFolder("drafts")}`}
            onClick={() => setSearchPrms({ status: "drafts" })}
          >
            Drafts
            <span className="mail-counter">23</span>
          </button>
        </li>
        <li>
          <button className="categories">
            Categories
            <span>23</span>
          </button>
        </li>
        <li>
          <button className="see-more">
            More
            <span>23</span>
          </button>
        </li>
      </ul>
    </React.Fragment>
  )
}
