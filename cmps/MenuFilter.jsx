
export function MailMenuFilter({ Link, setMarkedFolder, path, unreadMailsCount }) {
  return (
    <li>
      <Link to={`/mail/${path}`}>
        <button
          className={`${path} ${setMarkedFolder(path)} menu-title`}
        >
          {path}
          {
            unreadMailsCount && <span className="mail-counter">{unreadMailsCount}</span>
          }
        </button>
      </Link>
    </li>
  )
}

export function NoteMenuFilter({ setSearchPrms, setMarkedFolder, path, unreadMailsCount }) {
  return (
    <li>
        <button
          className={`${path} ${setMarkedFolder(path)} menu-title`}
          onClick={() => setSearchPrms({ status: path })}
        >
          {path}
          {
            unreadMailsCount && <span className="mail-counter">{unreadMailsCount}</span>
          }
        </button>
    </li>
  )
}
